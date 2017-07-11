const server = (dir, host = '10.0.1.4', port = '8081') => {
  let directory = document.getElementById('chooseDir');

  onload = () => {
    directory.onchange = e => {
      closeServerSocket();
      // NEED TO KNOW HOW TO SUPPLY DIRECTORY: THROUGH CHROME SELECT OR IS IT POSSIBLY TO SUPPLY PATH
      var files = e.target.files;

      for (var i = 0; i < files.length; i++) {
        //remove the first first directory
        var path = files[i].webkitRelativePath;
        if (path && path.indexOf("/") >= 0) {
          filesMap[path.substr(path.indexOf("/"))] = files[i];
        } else {
          filesMap["/" + files[i].fileName] = files[i];
        }
      }
      console.log(filesMap);
    }
  }

  let tcpServer = chrome.sockets.tcpServer;
  let tcpSocket = chrome.sockets.tcp;

  let serverSocketId = null;
  let filesMap = {};

  const stringToUint8Array = string => {
    const buffer = new ArrayBuffer(string.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < string.length; i++) {
      view[i] = string.charCodeAt(i);
    }
    return view;
  }

  var arrayBufferToString = function(buffer) {
    var str = '';
    var uArrayVal = new Uint8Array(buffer);
    for (var s = 0; s < uArrayVal.length; s++) {
      str += String.fromCharCode(uArrayVal[s]);
    }
    return str;
  }

  var logToScreen = function(log) {
    logger.textContent += log + "\n";
    logger.scrollTop = logger.scrollHeight;
  }

  var destroySocketById = function(socketId) {
    tcpSocket.disconnect(socketId, function() {
      tcpSocket.close(socketId);
    });
  }

  var closeServerSocket = function() {
    if (serverSocketId) {
      tcpServer.close(serverSocketId, function() {
        if (chrome.runtime.lastError) {
          console.warn("chrome.sockets.tcpServer.close:", chrome.runtime.lastError);
        }
      });
    }

    tcpServer.onAccept.removeListener(onAccept);
    tcpSocket.onReceive.removeListener(onReceive);
  }

  var sendReplyToSocket = function(socketId, buffer, keepAlive) {
    // verify that socket is still connected before trying to send data
    tcpSocket.getInfo(socketId, function(socketInfo) {
      if (!socketInfo.connected) {
        destroySocketById(socketId);
        return;
      }

      tcpSocket.setKeepAlive(socketId, keepAlive, 1, function() {
        if (!chrome.runtime.lastError) {
          tcpSocket.send(socketId, buffer, function(writeInfo) {
            console.log("WRITE", writeInfo);

            if (!keepAlive || chrome.runtime.lastError) {
              destroySocketById(socketId);
            }
          });
        }
        else {
          console.warn("chrome.sockets.tcp.setKeepAlive:", chrome.runtime.lastError);
          destroySocketById(socketId);
        }
      });
    });
  }

  var getResponseHeader = function(file, errorCode, keepAlive) {
    var httpStatus = "HTTP/1.0 200 OK";
    var contentType = "text/plain";
    var contentLength = 0;

    if (!file || errorCode) {
      httpStatus = "HTTP/1.0 " + (errorCode || 404) + " Not Found";
    }
    else {
      contentType = file.type || contentType;
      contentLength = file.size;
    }

    var lines = [
      httpStatus,
      "Content-length: " + contentLength,
      "Content-type:" + contentType
    ];

    if (keepAlive) {
      lines.push("Connection: keep-alive");
    }

    return stringToUint8Array(lines.join("\n") + "\n\n");
  }

  var getErrorHeader = function(errorCode, keepAlive) {
    return getResponseHeader(null, errorCode, keepAlive);
  }

  var getSuccessHeader = function(file, keepAlive) {
    return getResponseHeader(file, null, keepAlive);
  }

  var writeErrorResponse = function(socketId, errorCode, keepAlive) {
    console.info("writeErrorResponse:: begin... ");

    var header = getErrorHeader(errorCode, keepAlive);
    console.info("writeErrorResponse:: Done setting header...");
    var outputBuffer = new ArrayBuffer(header.byteLength);
    var view = new Uint8Array(outputBuffer);
    view.set(header, 0);
    console.info("writeErrorResponse:: Done setting view...");

    sendReplyToSocket(socketId, outputBuffer, keepAlive);

    console.info("writeErrorResponse::filereader:: end onload...");
    console.info("writeErrorResponse:: end...");
  }

  var write200Response = function(socketId, file, keepAlive) {
    var header = getSuccessHeader(file, keepAlive);
    var outputBuffer = new ArrayBuffer(header.byteLength + file.size);
    var view = new Uint8Array(outputBuffer);
    view.set(header, 0);

    var fileReader = new FileReader();
    fileReader.onload = function(e) {
      view.set(new Uint8Array(e.target.result), header.byteLength);
      sendReplyToSocket(socketId, outputBuffer, keepAlive);
    }

    fileReader.readAsArrayBuffer(file);
  }

  var onAccept = function(acceptInfo) {
    tcpSocket.setPaused(acceptInfo.clientSocketId, false);

    if (acceptInfo.socketId != serverSocketId)
      return;

    console.log("ACCEPT", acceptInfo);
  }

  var onReceive = function(receiveInfo) {
    console.log("READ", receiveInfo);
    var socketId = receiveInfo.socketId;

    // Parse the request.
    var data = arrayBufferToString(receiveInfo.data);
    // we can only deal with GET requests
    if (data.indexOf("GET ") !== 0) {
      // close socket and exit handler
      destroySocketById(socketId);
      return;
    }

    var keepAlive = false;
    if (data.indexOf("Connection: keep-alive") != -1) {
      keepAlive = true;
    }

    var uriEnd = data.indexOf(" ", 4);
    if (uriEnd < 0) { /* throw a wobbler */ return; }
    var uri = data.substring(4, uriEnd);
    // strip query string
    var q = uri.indexOf("?");
    if (q != -1) {
      uri = uri.substring(0, q);
    }
    var file = filesMap[uri];
    if (!!file == false) {
      console.warn("File does not exist..." + uri);
      writeErrorResponse(socketId, 404, keepAlive);
      return;
    }
    logToScreen("GET 200 " + uri);
    write200Response(socketId, file, keepAlive);

  }

  // directory.onchange = e => {
  //   closeServerSocket();

  //   // NEED TO KNOW HOW TO SUPPLY DIRECTORY: THROUGH CHROME SELECT OR IS IT POSSIBLY TO SUPPLY PATH
  //   var files = e.target.files;

  //   for (var i = 0; i < files.length; i++) {
  //     //remove the first first directory
  //     var path = files[i].webkitRelativePath;
  //     if (path && path.indexOf("/") >= 0) {
  //       filesMap[path.substr(path.indexOf("/"))] = files[i];
  //     } else {
  //       filesMap["/" + files[i].fileName] = files[i];
  //     }
  //   }
  //   console.log(filesMap);
  // }

  const start = () => {
    tcpServer.create({}, socketInfo => {
      serverSocketId = socketInfo.socketId;
      console.log(serverSocketId);
      tcpServer.listen(serverSocketId, host, parseInt(port, 10), 50, (result) => {
        console.log("LISTENING:", result);

        tcpServer.onAccept.addListener(onAccept);
        tcpSocket.onReceive.addListener(onReceive);
      });
    });
  }

  const stop = () => {
    closeServerSocket();
  }

  chrome.system.network.getNetworkInterfaces(interfaces => {
    for (var i in interfaces) {
    	console.log(interfaces[i]);
      // var interface = interfaces[i];
      // var opt = document.createElement("option");
      // opt.value = interface.address;
      // opt.innerText = interface.name + " - " + interface.address;
      // hosts.appendChild(opt);
    }
  });

	start();
}

server();
import React from 'react';
import { PropTypes } from 'prop-types';
import Button from './Button';

const Alert = ({type, msg, action, handler}) => {
	const button = action ?
		<Button  
			className="alert-button"
			label={action}
			// dataDismiss="alert"
			handler={handler}
		/> : null;
	return (
		<div
			className={"table-alert alert alert-" + type}
			role="alert"
		>
			{msg}
			{button}
		</div>
	);
}

Alert.propTypes = {
	type: PropTypes.string,
	msg: PropTypes.string,
	action: PropTypes.string,
	handler: PropTypes.func
}

export default Alert;
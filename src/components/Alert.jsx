import React, { Comonent } from 'react';

class Alert extends Component {
	shouldComponentUpdate(nextProps) {
		return false;
	}

	render() {
		const props = this.props;

		return (
			<div className="collapse" id="collapseExample">
			  <div className="well">
			    <span className="warning"></span>
			  </div>
			</div>
		);
	}
}

export default Alert;
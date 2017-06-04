import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Button extends Component {
	render() {
		let icon = this.props.icon !== '' ? <span className={'glyphicon glyphicon-' + this.props.icon}></span> : '';
		let label = this.props.label !== '' && this.props.icon == '' ? <label>{this.props.label}</label> : '';
		
		return(
			<button
				type={this.props.type}
				id={this.props.id}
				className={this.props.className}
				disabled={this.props.disabled}
				onClick={this.props.handler}
				data-toggle={this.props.dataToggle}
			>
				{icon}
				{label}
			</button>
		);
	}
}

Button.propTypes = {
	type: PropTypes.string.isRequired,
	label: PropTypes.string,
	id: PropTypes.string,
	className: PropTypes.string,
	icon: PropTypes.string,
	disabled: PropTypes.string,
	handler: PropTypes.func.isRequired,
	dataToggle: PropTypes.string
}

Button.defaultProps = {
	type: 'button',
	className: 'btn btn-default ',
	label: '',
	icon: ''
}

export default Button;
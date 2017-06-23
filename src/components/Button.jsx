import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class Button extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.icon !== nextProps.icon || this.props.disabled !== nextProps.disabled || this.props.className !== nextProps.className;
	}

	render() {
		const props = this.props;
		let icon = props.icon !== '' ? <span className={'glyphicon glyphicon-' + props.icon}></span> : '';
		let label = props.label !== '' && props.icon == '' ? <label>{props.label}</label> : '';
		
		return(
			<button
				type={props.type}
				id={props.id}
				className={props.className}
				disabled={props.disabled}
				onClick={props.handler}
				data-toggle={props.dataToggle}
				data-target={props.dataTarget}
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
	disabled: PropTypes.bool,
	handler: PropTypes.func.isRequired,
	dataToggle: PropTypes.string,
	dataTarget: PropTypes.string
}

Button.defaultProps = {
	type: 'button',
	className: 'btn btn-default ',
	disabled: false,
	label: '',
	icon: ''
}

export default Button;
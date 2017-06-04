import React from 'react';
import { PropTypes } from 'prop-types';

const MenuItem = props => (
	<li className={props.status}>
		<a 
			className={props.className} 
			href={props.href}
			onClick={props.handler}
		>
			{props.title}
		</a>
	</li>
);

MenuItem.propTypes = {
	className: PropTypes.string,
	status: PropTypes.string,
	handler: PropTypes.func,
	href: PropTypes.string,
	title: PropTypes.string.isRequired
}

MenuItem.defaultProps = {
	className: 'dropdown-item ',
	status: '',
	href: '#'
}

export default MenuItem;
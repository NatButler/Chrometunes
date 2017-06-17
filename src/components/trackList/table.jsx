import React, { Component } from 'react';
import { connect } from 'react-redux';
import THead from './tHead';
import TBody from './tBody';
import TFoot from './tFoot';

class Table extends Component {
	shouldComponentUpdate(nextProps) {
		return this.props.tableHds !== nextProps.tableHds;
	}

	render() {
		console.log('Table.');
		return (
			<div className="col-md-9 table-wrap">
				<THead tableHds={this.props.tableHds} />
				<TBody />
				<TFoot />
			</div>
		);		
	}
}

const mapStateToProps = state => ({
	tableHds: state.app.tableHds
});

export default connect(mapStateToProps)(Table);
import React from 'react';
import { getGenre, libFilter } from '../library';

const { Component } = React;


class Header extends Component {
	constructor({store}) {
		super();
		this.store = store;
		this.timer;
	}

	render() {
		return (
			<nav className="navbar navbar-default">
				<div className="container">
	                <input
	                	ref={node => {
	                		this.input = node;
	                	}}
	                	type="text"
	                	name="q"
	                	id="q"
	                	spellCheck="false"
	                	autoComplete="off"
	                	autoFocus="true"
	                	onKeyUp={() => {
	                		if (!this.input.value.length) {
	                			this.store.dispatch({
	            					type: 'FILTER_LIB',
									results: []
	        					});
	                		}
	                		else if (this.input.value.length >= 3) {
	                			this.search(this.input.value);
	                		}
	                	}}
	                />
					<button
						onClick={() => {
			              	this.store.dispatch({
			                    type: 'SKIP_TRACK'
			                });
		            	}}>
						<span className="glyphicon glyphicon-step-forward"></span>
					</button>
					<button
				        className="toggle" 
	                	data-func="pmode"
	                	onClick={() => {
	                    	this.store.dispatch({
	                    		type: 'SET_PLAYMODE'
	                   		});
	                	}}>
						<span className="glyphicon glyphicon-repeat"></span>
					</button>
				</div>
			</nav>
		);
	}

	search(q) {
		clearTimeout( this.timer );

		this.timer = (q.length >= 3) && setTimeout( () => {
			this.store.dispatch({
	            type: 'FILTER_LIB',
				results: libFilter(q)
	        });
		}, 400);
	}
}

export default Header
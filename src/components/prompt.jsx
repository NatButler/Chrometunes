import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Button from './Button';

const Prompt = (props, { store }) => {
	const state = store.getState();
	let prompt;
	let inputVal;

	return (
		<div 
			className="prompt"
			ref={node => {
				prompt = node;
			}}
		>
			<h2>{props.prompt}</h2>
			<input
				ref={node => {
					inputVal = node;
				}}
				type="text"
				name="promptInput"
				id="promptInput"
				spellCheck="false"
				autoComplete="off"
				autoFocus="true"
      />
      <Button
				className="done"
				icon="ok-circle"
				handler={ () => {
					store.dispatch(  );
				}}
			/>
      <Button
				className="cancel"
				icon="remove-circle"
				handler={ () => {
					store.dispatch(  );
				}}
			/>
		</div>
	);
}

Prompt.contectTypes = {
	store: PropTypes.object
}

export default Prompt;


import React from 'react';
import BlotterForm from '../blotter-form';

const EditBlotter = (props) => {
	const {param_url} = props;
	console.log("Add Second Loop: "+ param_url);
	return (
		<div>
			
		<BlotterForm param={[param_url]} mode="EDIT"/>
		</div>
	)
}

export default EditBlotter


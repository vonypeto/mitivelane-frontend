import React from 'react';
import ResidentForm from '../resident-form';

const AddResident = (props) => {
	const {param_url} = props;
	console.log("Add Second Loop: "+ param_url);
	return (
		<div>
			
		<ResidentForm param={[param_url]} mode="ADD"/>
		</div>
	)
}

export default AddResident


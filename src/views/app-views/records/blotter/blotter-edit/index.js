import React from 'react';
import BlotterForm from '../blotter-form';

const EditBlotter = (props) => {
	const { param_url } = props;
	return (
		<div>
			<BlotterForm param={[param_url]} mode="EDIT" />
		</div>
	)
}

export default EditBlotter


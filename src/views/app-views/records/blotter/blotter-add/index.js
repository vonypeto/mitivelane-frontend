import React from 'react';
import BlotterForm from '../blotter-form';

const AddBlotter = (props) => {
	const { param_url } = props;
	return (
		<div>
			<BlotterForm param={[param_url]} mode="ADD" />
		</div>
	)
}

export default AddBlotter


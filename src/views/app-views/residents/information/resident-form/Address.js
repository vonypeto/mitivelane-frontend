import React from 'react'
import { Input, Row, Col, Card, Form, Select } from 'antd';

const { Option } = Select;

const rules = {

	address_1: [
		{
			required: true,
			message: 'Please enter your address 1',
		}
	],
	address_2: [
		{
			required: true,
			message: 'Please enter your address 2',
		}
	],
	address_2: [
		{
			required: true,
			message: 'Please enter your address 2',
		}
	],

}
const area = ['PUROK 1', 'PUROK 2']

const AddressField = (props) => {
	const {purokList} = props
	return (
		<Row>
			<Col xs={24} sm={24} md={17}>
				<Card title="Address">
					<Row gutter={16}>
						<Col xs={24} sm={24} md={24}>

							<Row gutter={16}>
								<Col xs={24} sm={24} md={24}>
									<Form.Item name="address_1" label="Address 1" rules={rules.address_1}>
										<Input placeholder="Address 1" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item name="address_2" label="Address 2" rules={rules.address_2}>
										<Input placeholder="Address 2" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item name="area" label="Area/Purok" >
										<Select className="w-100" placeholder="Area/Purok">
											{
												purokList.map(elm => (
													<Option key={elm.name} value={elm.name}>{elm.name}</Option>
												))
											}
										</Select>
									</Form.Item>

								</Col>
							</Row>

						</Col>
					</Row>
				</Card>
			</Col>
			<Col xs={24} sm={24} md={17}>
				<Card title="Parents/Spouse">
					<Row gutter={16}>
						<Col xs={24} sm={24} md={24}>

							<Row gutter={16}>
								<Col xs={24} sm={24} md={12}>
									<Form.Item name="father" label="Father" rules={rules.lastname}>
										<Input placeholder="Last Name" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item name="mother" label="Mother" rules={rules.firstname}>
										<Input placeholder="First Name" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item name="spouse" label="Spouse" rules={rules.middlename}>
										<Input placeholder="Spouse" />
									</Form.Item>
								</Col>


							</Row>

						</Col>
					</Row>
				</Card>
				<Card title="Contact Number">
					<Row gutter={16}>
						<Col xs={24} sm={24} md={24}>

							<Row gutter={16} xs={24} sm={24} md={24} xl={24} >
								<Col xs={24} sm={24} md={12}>
									<Form.Item name="telephone" label="Telephone">
										<Input placeholder="Telephone" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item name="mobile_number" label="Mobile Phone" >
										<Input placeholder="Mobile Phone" />
									</Form.Item>
								</Col>

							</Row>

						</Col>
					</Row>
				</Card>
			</Col>
		</Row>
	)
}

export default AddressField

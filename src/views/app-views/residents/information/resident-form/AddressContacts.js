import React from 'react'
import { Input, Row, Col, Card, Form, Select, InputNumber} from 'antd';
import { address_contacts } from "./AddResidentRules";

const { Option } = Select;

const area = ['PUROK 1', 'PUROK 2']

const AddressField = (props) => {
	const { purokList } = props

	const numberFilter = (e) => {
		if (!/[0-9]/.test(e.key)) {
		  e.preventDefault();
		}
	  }

	return (
		<Row>
			<Col xs={24} sm={24} md={17}>
				<Card title="Address">
					<Row gutter={16}>
						<Col xs={24} sm={24} md={24}>

							<Row gutter={16}>
								<Col xs={24} sm={24} md={24}>
									<Form.Item name="address_1" label="Address 1"
										rules={address_contacts.address_1}
									>
										<Input placeholder="Address 1" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item name="address_2" label="Address 2"
										rules={address_contacts.address_2}
									>
										<Input placeholder="Address 2" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item name="area" label="Area/Purok"
										rules={address_contacts.purok}
									>
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
									<Form.Item name="father" label="Father" rules={address_contacts.father}>
										<Input placeholder="Last Name" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item name="mother" label="Mother" rules={address_contacts.mother}>
										<Input placeholder="First Name" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={24}>
									<Form.Item name="spouse" label="Spouse" rules={address_contacts.spouse}>
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
									<Form.Item name="telephone" label="Telephone" rules={address_contacts.telephone}>
										<Input placeholder="Telephone" />
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item name="mobile_number" label="Mobile Number" rules={address_contacts.mobile_number}>
										<InputNumber
											min={1}
											className="w-100"
											onKeyPress={(e) => { numberFilter(e) }}
											placeholder="Mobile Number"
										/>
									</Form.Item>
								</Col>
								<Col xs={24} sm={24} md={12}>
									<Form.Item name="email" label="Email Address" rules={address_contacts.email_address}>
										<Input placeholder="Email Address" />
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

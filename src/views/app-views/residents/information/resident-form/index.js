import React, { useState, useEffect } from 'react'
import PageHeaderAlt from 'components/layout-components/PageHeaderAlt'
import { Tabs, Form, Button, message } from 'antd';
import Flex from 'components/shared-components/Flex'
import MainForm from './MainForm'
import MainFormView from './MainFormView'
import { useHistory } from "react-router-dom";
import Address from './Address'
import BlotterRecords from './BlotterRecords'
import SocialWelfare from './SocialWelfare'
import Account from './Account'
import moment from 'moment';
import { useParams } from "react-router-dom";
import QueueAnim from 'rc-queue-anim';
import axios from 'axios'
import { useAuth } from "contexts/AuthContext";

const { TabPane } = Tabs;

const getBase64 = (img, callback) => {
	const reader = new FileReader();
	reader.addEventListener('load', () => callback(reader.result));
	reader.readAsDataURL(img);
}

const ADD = 'ADD'
const EDIT = 'EDIT'
const VIEW = 'VIEW'

const MainFormList = props => {
	const { generateToken } = useAuth();

	const { id } = useParams();
	const barangay_id = localStorage.getItem("auth_barangay_list")
	let history = useHistory();
	const { mode = ADD, param } = props
	const [residentList, setResidentList] = useState([]);
	const [residentData, setResidentData] = useState([]);
	const [residentFilter, setResidentFilter] = useState([])
	const [form] = Form.useForm();
	const [uploadedImg, setImage] = useState('')
	const [uploadLoading, setUploadLoading] = useState(false)
	const [submitLoading, setSubmitLoading] = useState(false)

	useEffect(() => {
		if (mode === EDIT || mode === VIEW) {
			(async () => {
				const response = await axios.post("/api/resident/getAll", {barangay_id}, generateToken()[1])
				const ResidentListData = response.data

				const residentID = id
				setResidentFilter(residentID)
				const residentData = ResidentListData.filter(resident => resident.resident_id === residentID)

				const resident = residentData[0]
				setResidentData(residentData[0])

				form.setFieldsValue({
					lastname: resident.lastname,
					firstname: resident.firstname,
					middlename: resident.middlename,
					alias: resident.alias,
					height: resident.height,
					birthday: new moment(resident.birthday),
					occupation: resident.occupation,
					voter_status: resident.voter_status,
					religion: resident.religion,
					weight: resident.weight,
					age: resident.age,
					civil_status: resident.civil_status,
					citizenship: resident.citizenship,
					birth_of_place: resident.birth_of_place,
					address_1: resident.address_1,
					address_2: resident.address_2,
					area: resident.area,
					father: resident.father,
					mother: resident.mother,
					spouse: resident.spouse,
					telephone: resident.telephone,
					mobile_number: resident.mobile_number,
					pag_ibig: resident.pag_ibig,
					philhealth: resident.philhealth,
					sss: resident.sss,
					tin: resident.tin,
				});
				setImage(resident.image)
			})()


		}
	}, [form, mode, param, props]);

	const handleUploadChange = info => {
		if (info.file.status === 'uploading') {
			setUploadLoading(true)
			return;
		}
		if (info.file.status === 'done') {
			getBase64(info.file.originFileObj, imageUrl => {
				setImage(imageUrl)
				setUploadLoading(true)
			});
		}
	};

	const onFinishAdd = async (values) => {
		await axios.post("/api/resident/add", {values, barangay_id}, generateToken()[1])
		.then ((res) => {
			console.log(res.data)
		})
	}

	const onFinishUpdate = async (values) => {
		await axios.post("/api/resident/update", {values, barangay_id, resident_id: id}, generateToken()[1])
		.then ((res) => {
			console.log(res.data)
		})
	}

	const onFinish = (values) => {
		console.log("values from form", values)
		setSubmitLoading(true)
		form.validateFields().then(values => {
			setTimeout(() => {
				setSubmitLoading(false)
				if (mode === ADD) {
					//RESIDENT INSERT ADD
					message.success(`Added ${values.firstname} to Resident list`);
					onFinishAdd(values);
				}
				if (mode === EDIT) {
					//RESIDENT INSERT EDIT
					onFinishUpdate(values);
					message.success(`Resident saved`);
				}
			}, 1500);
		}).catch(info => {
			setSubmitLoading(false)
			console.log('info', info)
			message.error('Please enter all required field ');
		});
	};

	return (
		<>
			<Form
				layout="vertical"
				form={form}
				name="advanced_search"
				className="ant-advanced-search-foarm"
				onFinish={onFinish}
				initialValues={{
					heightUnit: 'cm',
					widthUnit: 'cm',
					weightUnit: 'kg'
				}}
			>
				<PageHeaderAlt className="border-bottom" overlap>

					<div className="container">
						<Flex className="py-2" mobileFlex={false} justifyContent="between" alignItems="center">
							<h2 className="mb-3">{mode === ADD ? 'Add New Resident' : mode === EDIT ? `Edit Resident` : "View Resident"} </h2>
							<div className="mb-3">
								<Button onClick={history.goBack} className="mr-2">{mode === VIEW ? 'Back' : 'Discard'}</Button>
								{mode === VIEW ? null : <Button type="primary" htmlType="submit" loading={submitLoading} >
									{mode === 'ADD' ? 'Add' : `Save`}

								</Button>}

							</div>
						</Flex>
					</div>
				</PageHeaderAlt>

				{(mode === ADD || mode === EDIT) ?

					<div className="container">
						<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>

							<TabPane tab="Resident Details" key="1">
								<QueueAnim delay={300}
									type={['right', 'left']}
									ease={['easeOutQuart', 'easeInOutQuart']}>
									<div className="demo1">
										<MainForm
											uploadedImg={uploadedImg}
											uploadLoading={uploadLoading}
											handleUploadChange={handleUploadChange}
										/>
									</div>
								</QueueAnim>
							</TabPane>
							<TabPane tab="Address" key="2">
								<Address data={{ resident: "pogi" }} />
							</TabPane>
							<TabPane tab="Social Welfare Service" key="3">
								<SocialWelfare />
							</TabPane>

							{mode === 'ADD' ?

								'Add New Resident' :

								<TabPane tab="Blotter Records" key="4">
									<BlotterRecords barangay_id={param} resident_id={residentFilter} />
								</TabPane>


							}

							<TabPane tab="Account Information" key="5">
								<Account />
							</TabPane>

						</Tabs>
					</div>

					: mode === "VIEW" ?

						<div className="container">
							<Tabs defaultActiveKey="1" style={{ marginTop: 30 }}>
								<TabPane tab="Resident Details" key="1">
									<MainFormView
										residentData={residentData}
									/>
								</TabPane>

								<TabPane tab="Blotter Records" key="2">
									<BlotterRecords barangay_id={param} resident_id={residentFilter} />
								</TabPane>


								<TabPane tab="Documents" key="3">
									TBA
								</TabPane>

							</Tabs>
						</div>

						: "No Page Found"}
			</Form>
		</>
	)
}

export default MainFormList

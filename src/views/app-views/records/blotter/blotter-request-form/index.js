import React, {useState, useEffect} from 'react'
import {
	Card,
	Form,
	Input,
	Button,
	message
} from "antd";

import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const index = () => {
	const { currentBarangay, generateToken } = useAuth();
	const authToken = localStorage.getItem("auth_token");
	const [residentlists, setResidentlist] = useState([]);
	const [form] = Form.useForm();
	
	useEffect(() => {
		getResidents(currentBarangay)
		
	}, [])
	
	const getResidents = (currentBarangay) => {
    axios
      .post(
        "/api/resident/getAll",
        { barangay_id: currentBarangay },
        generateToken()[1]
      )
      .then((response) => {
        console.log("Residents ", response.data);
        setResidentlist(response.data);
      })
      .catch(() => {
        message.error("Could not fetch the data in the server!");
      });
  };
	
	const requestBlotter = (values) => {
		axios
          .post("/api/blotter_request/request-blotter", values, generateToken()[1])
          .then((response) => {
            message.destroy();
			console.log(response.data)
            if (response.data == "Success") {
              return message.success("Create Request Blotter");
            } else {
              return message.error("Error, please try again.");
            }
          })
          .catch((error) => {
            console.log(error);
            message.destroy();
            message.error("The action can't be completed, please try again.");
          });
		
	}
	
	const onFinish = () => {
		form
			.validateFields()
			.then((values) => {
				values.barangay_id = currentBarangay
				values.reporters = [values.reporters_id]
				values.uuid = authToken
				values.status = "Pending"
				values.settlement_status = "Unscheduled"
				requestBlotter(values)

			})
			.catch((info) => {
				message.error("Please enter all required field ");
			});

	}
	return (
		<Card title="This is Test for Blotter Request... This Functionality must be in Client Side">
		{residentlists.map((values, index) => 
		<h4 key={index}>{values.resident_id} {values.firstname} {values.lastname}</h4>)}
			<Form form={form}>
			<Form.Item
					name="reporters_id"
					labelCol={{ span: 24 }}
					rules={[{ required: true }]}
				>
					<Input placeholder="Resident ID" />
				</Form.Item>
				
				<Form.Item
					name="blotter_id"
					labelCol={{ span: 24 }}
					rules={[{ required: true }]}
				>
					<Input placeholder="Blotter Request ID" />
				</Form.Item>

				<Button
					type="primary"
					onClick={() => onFinish()}
					htmlType="submit"
				>
					Request Blotter

				</Button>
			</Form>

		</Card>
	)
}

export default index


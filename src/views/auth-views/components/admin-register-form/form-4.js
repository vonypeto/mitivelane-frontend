import React, { Component } from 'react'

//Hooks
import { Card, Table, Tabs, Button, message } from "antd";
import { AiOutlineLeft } from "react-icons/ai"

const { TabPane } = Tabs;

function callback(key) {
    console.log(key);
}

//Table Column 
const columns1 = [
    {
        title: 'Field',
        dataIndex: 'field',
    },
    {
        title: 'Input',
        dataIndex: 'input',
    },
];

//Table input
const data1 = [
    {
        field: 'First Name',
        input: 'Giann Carlo'
    },
    {
        field: 'Last Name',
        input: 'Mediavillo'
    },
    {
        field: 'Middle Name',
        input: 'Cruz'
    },
    {
        field: 'Birthday',
        input: '08-12-00'
    },
    {
        field: 'Gender',
        input: 'Male'
    },
    {
        field: 'Civil Status',
        input: 'Single'
    },
    {
        field: 'Municipality',
        input: 'Baras'
    },
    {
        field: 'Province',
        input: 'Rizal'
    },
    {
        field: 'Country',
        input: 'PH'
    },
    {
        field: 'Mobile Number',
        input: '09123456789'
    },
    {
        field: 'Telephone Number',
        input: '101-0101-0101'
    },
    {
        field: 'Email',
        input: 'mediavillo@gmail.com'
    },
    {
        field: 'Address',
        input: '164 P Rizal St.'
    },
    {
        field: 'Joining Baragay',
        input: 'No'
    },
    {
        field: 'Registering Baragay',
        input: 'Yes'
    },
];

const data2 = [
    {
        field: 'Official Name',
        input: 'San Jose'
    },
    {
        field: 'Barangay',
        input: 'Brgy San Jose'
    },
    {
        field: 'Municipality',
        input: 'Baras'
    },
    {
        field: 'Province',
        input: 'Rizal'
    },
    {
        field: 'Country',
        input: 'PH'
    },
    {
        field: 'Barangay Address',
        input: '123 Bonifacio St.'
    },

];

export default class AdminRegisterForm4 extends Component {
    render() {
        return (
            <div>
                <Card className="sign-up-card">
                    <div style={{ textAlign: "center", margin: "auto 15%" }}>
                        <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>Confirmation</h1>
                        <p>This is the last step, take a look at the data you've provided before regestering your account officially. You can always update your data anytime.</p>
                    </div>
                    <Tabs defaultActiveKey="1" size={'large'} onChange={callback}>
                        <TabPane tab="Your Info" key="1">
                            <Table columns={columns1} dataSource={data1} />
                        </TabPane>
                        <TabPane tab="Barangay" key="2">
                            <Table columns={columns1} dataSource={data2} />
                        </TabPane>
                    </Tabs>
                </Card>

                {/* Action buttons */}
                <Button style={{ margin: '0 8px' }} onClick={() => this.props.prev()}>
                    <AiOutlineLeft style={{ paddingTop: "4px" }} /> Previous
                </Button>

                <Button  type="primary" style={{ float: "right" }} onClick={() => message.success('Processing complete!')}>
                    Done
                </Button>
            </div>
        )
    }
}

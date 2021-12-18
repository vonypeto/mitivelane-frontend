import React from 'react'
import "./index.css"

import UserInfoForm from '../../components/barangay-register-form/UserInfoForm'
import BarangayInfoForm from 'views/auth-views/components/barangay-register-form/BarangayInfoForm'

import { Row, Col, Card, Form, Button, message } from 'antd'


const BarangayRegister = () => {
    return (

        <div className=" w-100">
            <Row align="middle" justify="center" className="barangay-register-container">
                <Col>
                    <Form layout="vertical">
                        <Card className='barangay-register-card'>
                            <div style={{ textAlign: "center", margin: "auto 15%" }}>
                                <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>Personal Info</h1>
                                <p>We need your personal data to help others identify you and can be used to make filling up forms in the future faster.</p>
                            </div>

                            <UserInfoForm />
                        </Card>

                        <Card className='barangay-register-card'>
                            <div style={{ textAlign: "center", margin: "auto 15%" }}>
                                <h1 style={{ fontWeight: "bolder", fontFamily: "Roboto" }}>Register Barangay</h1>
                                <p>Enter the data accordingly to your barangay. You can always update your barnagay's data anytime.</p>
                            </div>

                            <BarangayInfoForm />
                        </Card>

                        <Button htmlType='submit' type="primary" style={{ float: "right" }} >
                            Submit
                        </Button>
                    </Form>
                </Col>

            </Row>

            <p style={{ textAlign: "center", paddingBottom: "20px" }}>By clicking "Submit" you agree with the <a>Terms & Condition</a> and <a>Privacy Terms</a></p>

        </div >
    )
}

export default BarangayRegister

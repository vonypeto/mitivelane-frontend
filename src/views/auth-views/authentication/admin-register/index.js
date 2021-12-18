import React, { useState } from 'react';

//CSS
import './index.css';

//Components
import AdminRegisterForm from 'views/auth-views/components/admin-register/AdminRegister';

//Hooks
import { Row, Col, Steps, Button, message } from 'antd';
import { AiOutlineLeft } from "react-icons/ai"

const { Step } = Steps;

const steps = [
    {
        title: 'First',
    },
    {
        title: 'Second',
    },
    {
        title: 'Third',
    },
    {
        title: 'Last',
    },
];

class adminSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        }
    }

    next = () => {
        this.setState({ current: this.state.current + 1 });
    };

    prev = () => {
        this.setState({ current: this.state.current - 1 });
    };

    render() {

        return (
            <div className=" w-100">
                <Row align="middle" justify="center" className="register-container">
                    <Col>
                        <Steps className="steps-action-container" current={this.state.current} >
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>

                        < AdminRegisterForm current={this.state.current} next={this.next} prev={this.prev} stepsLength={steps.length}/>

                    </Col>

                </Row>
                <p style={{textAlign: "center", margin: "20px auto"}}>By clicking "next" and "done" you agree with the <a>Terms & Condition</a> and <a>Privacy Terms</a></p>

            </div >
        )
    }

}


export default adminSignUp

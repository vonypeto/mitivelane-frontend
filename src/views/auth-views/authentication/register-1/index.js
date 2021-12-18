import React from 'react'
import RegisterForm from '../../components/RegisterForm'
import { Card, Row, Col,Space } from "antd";
import { useSelector } from 'react-redux'

const backgroundStyle = {
	backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundRepeat: 'repeat',
	backgroundSize: 'container'
}

const RegisterOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div className="h-100" style={{overflow: "scroll"}}>
			<div className="container d-flex flex-column justify-content-center h-100">
				<Row justify="center">
					<Col xs={24} sm={24} md={20} lg={15} xl={10}  xxl={10}>
						<Card
							cover={
								<img
									alt="example"
									src="https://www.naccho.org/uploads/blog/_600x600_fit_center-center_90_none/Stock-COVID.jpg"

									style={{ height: "200px",  }}

								/>
							}
							>

							<div>
								<Row justify="center">
									<Space direction='vertical'>
										<h1 style={{ fontFamily: "Roboto", fontWeight: "bolder"}}>Register</h1>
										<p>Fill up the information that you will use to login to your account.</p>
									</Space>
									<Col xs={24} sm={24} md={20} lg={20}>
										<RegisterForm {...props} />
									</Col>
								</Row>
							</div>

							<Row justify="center">
								<Col>
									<a href="/auth/login">You already have an account? Proceed to Login.</a>
								</Col>
							</Row>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default RegisterOne

import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Card, Row, Col, Space} from "antd";
import { useSelector } from 'react-redux';

const backgroundStyle = {
	backgroundImage: 'url(/img/others/img-17.jpg)',
	backgroundSize: 'cover'
}

const LoginOne = props => {
	const theme = useSelector(state => state.theme.currentTheme)
	return (
		<div className="h-100" style={backgroundStyle}>
			<Row className="container h-100" justify='center' align="middle" >
				<Col xs={20} sm={20} md={20} lg={15} xl={10}  xxl={8}>
					<Card

					>
						<div>
							<Row justify="center">
								<Space direction="vertical">
									<h1 style={{ fontFamily: "Roboto", fontWeight: "bolder" }}>Login Now</h1>
									<p>Get connected to your preferred barangay with us.</p>
								</Space>
								<Col xs={24} sm={24} md={20} lg={20}>
									<LoginForm {...props} />
								</Col>
							</Row>
						</div>

						<Row justify="center" style={{ marginTop: "20px" }}>
							<Col>
								<a href="/auth/register-1">Don't have an account yet? Sign up now.</a>
							</Col>
						</Row>
					</Card>
				</Col>
			</Row>

		</div>
	)
}

export default LoginOne

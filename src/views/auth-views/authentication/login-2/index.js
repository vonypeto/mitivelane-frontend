import React from 'react'
import LoginForm from '../../components/LoginForm'
import { Row, Col } from "antd";
import { useSelector } from 'react-redux';

const backgroundURL = '/img/others/img-17.jpg'
const backgroundStyle = {
	backgroundImage: `url(${backgroundURL})`,
	backgroundRepeat: 'no-repeat',
	backgroundSize: 'cover'
}

const LoginTwo = props => {
	const theme = useSelector(state => state.theme.currentTheme)

	return (
		<div className={`h-100 ${theme === 'light' ? 'bg-white' : ''}`}>
			<Row justify="center" className="align-items-stretch h-100">
				<Col xs={20} sm={20} md={24} lg={16}>
					<div className="container d-flex flex-column justify-content-center h-100">
						<Row justify="center">
							<Col xs={24} sm={24} md={20} lg={12} xl={8}>
								<h1>Sign In</h1>
								<p>Don't have an account yet? <a href="/auth/register-2">Sign Up</a></p>
								<div className="mt-4">
									<LoginForm {...props}/>
								</div>
							</Col>
						</Row>
					</div>
				</Col>
				<Col xs={0} sm={0} md={0} lg={8}>
					<div className="d-flex flex-column justify-content-between h-100 px-4" style={backgroundStyle}>
						<div className="text-right">
						<h1 style={{color: "white", fontFamily: "Calibri", fontWeight: "bolder", paddingTop: "7px"}}>MiBarangay</h1>
						</div>
						<Row justify="center">
							<Col xs={0} sm={0} md={0} lg={20}>
								<img className="img-fluid mb-5" src="/img/others/login-img.png" alt=""/>
								<h1 className="text-white">Welcome to MiBarangay</h1>
								<p className="text-white">We provide platform to help you connect to your barangay at the comfort of your home.With fast and efficient data reporting.</p>
							</Col>
						</Row>
						<div className="d-flex justify-content-end pb-4">
							<div>
								<a className="text-white" href="/#" onClick={e => e.preventDefault()}>Term & Conditions</a>
								<span className="mx-2 text-white"> | </span>
								<a className="text-white" href="/#" onClick={e => e.preventDefault()}>Privacy & Policy</a>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default LoginTwo

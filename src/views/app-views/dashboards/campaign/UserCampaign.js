import React from "react";
import { Row, Col, Button, Card, List} from 'antd';
import Flex from 'components/shared-components/Flex'
import StatisticWidget from 'components/shared-components/StatisticWidget';
import { 
	CloudDownloadOutlined, 
	ArrowUpOutlined,
	ArrowDownOutlined,
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  YoutubeFilled,
  DribbbleSquareFilled,
} from '@ant-design/icons';
import ChartWidget from 'components/shared-components/ChartWidget';
import ApexChart from "react-apexcharts";
import { apexSparklineChartDefultOption, COLORS } from 'constants/ChartConstant';
import {
    VisitorChartData, 
  socialMediaReferralData,
	weeklyRevenueData, 
} from './CampaignDashboardData'
import utils from 'utils'
import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";

const WeeklyRevenue = () => {
	const { direction } = useSelector(state => state.theme)
	return (<Card>
		<Row gutter={16}>
			<Col xs={24} sm={24} md={24} lg={8}>
				<Flex className="h-100" flexDirection="column" justifyContent="between">
					<div>
						<h4 className="mb-0">Campaign Analytics</h4>
						<span className="text-muted">6 - 25 Nov, 2021</span>
					</div>
					<div className="mb-4">
						<h1 className="font-weight-bold">$27,188.00</h1>
						<p className="text-success">
							<span >
								<ArrowUpOutlined />
								<span> 17% </span>
							</span>
							<span>growth from last week</span>
						</p>
						<p>Total pledges donation for every campaigns based from the date range given above.</p>
					</div>
				</Flex>
			</Col>
			<Col xs={24} sm={24} md={24} lg={16}>
				<div className="mb-3 text-right">
					<Button icon={<CloudDownloadOutlined/>}>Download Report</Button>
				</div>
				<ChartWidget 
					card={false}
					series={weeklyRevenueData.series} 
					xAxis={weeklyRevenueData.categories} 
					title="Unique Visitors"
					height={250}
					type="bar"
					customOptions={{colors: COLORS}}
					direction={direction}
				/>
			</Col>
		</Row>
	</Card>)
}

const DisplayDataSet = () => (
	<Row gutter={16}>
		<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <StatisticWidget title="Pledges" value="$256" status={8.3} subtitle="Compare to last year (2020)"></StatisticWidget>
            <StatisticWidget title="Bounce Rate" value="5.24%" status={9.3} subtitle="Single-page website sessions that campaigns generated."></StatisticWidget>
		</Col>
		<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}>
            <StatisticWidget title="Sessions" value="4416" status={11.8} subtitle="Total number of website sessions that generated."></StatisticWidget>
            <StatisticWidget title="Total Campaign" value="891" status={4.4} subtitle="Number of campaigns created all over the year."></StatisticWidget>
		</Col>
	</Row>
)

const socialMediaReferralIcon = [
  <FacebookFilled style={{color: '#1774eb'}} />,
  <TwitterSquareFilled style={{color: '#1c9deb'}}/>,
  <YoutubeFilled style={{color: '#f00'}}/>,
  <LinkedinFilled style={{color: '#0077b4'}} />,
  <DribbbleSquareFilled  style={{color: '#e44a85'}} />
]

const SocialMediaReferral = () => {
  return ( 
    <Card title="Social media referrals">
    <List
      itemLayout="horizontal"
      dataSource={socialMediaReferralData}
      renderItem={(item, index) => (
        <List.Item>
          <div className="d-flex align-items-center justify-content-between w-100">
            <div className="d-flex align-items-center">
              <span className="font-size-xxl">{socialMediaReferralIcon[index]}</span>
              <div className="ml-3">
                <h4 className="font-weight-bold mb-0">{item.title}</h4>
                <span className="text-muted">Total: <span className="font-weight-bold">{item.amount}</span></span>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <ApexChart 
                options={{...apexSparklineChartDefultOption, ...{colors: [utils.getSignNum(item.percentage, COLORS[1], COLORS[2])]}}} 
                series={item.data} 
                height={25} 
                width={50}
              />
              <span className="ml-3 font-weight-bold">{item.percentage}%</span>
              <span className={`ml-1 ${utils.getSignNum(item.percentage, 'text-success', 'text-danger')}`}>
                {utils.getSignNum(item.percentage, <ArrowUpOutlined />, <ArrowDownOutlined />)}
              </span>
            </div>
          </div>
        </List.Item>
        )}
      />
    </Card>
  );

}


const UserCampaign = () => {
    const history = useHistory()
    const { direction } = useSelector((state) => state.theme);

    return (
		<>
            <Row gutter={16}>
                <div className="container">
                    <Flex
                    className="py-2"
                    mobileFlex={false}
                    justifyContent="between"
                    alignItems="center"
                    >
                    <h2>Overview</h2>
                    <div className="mb-3">
                        <Button onClick={history.goBack} type="primary" className="mr-2">Back</Button>
                        <Button onClick={history.goBack} type="primary" className="mr-2">Approve</Button>
                        <Button onClick={history.goBack} type="primary" danger>Decline</Button>
                    </div>
                    </Flex>
                </div>
            </Row>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={16} xl={15} xxl={14}>
					<WeeklyRevenue />
				</Col>
				<Col xs={24} sm={24} md={24} lg={8} xl={9} xxl={10}>
					<DisplayDataSet />
				</Col>
			</Row>
            <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={24}>
                
				</Col>
			</Row>
			<Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16} >
                    <ChartWidget
                    title="Visitors"
                    series={VisitorChartData.series}
                    xAxis={VisitorChartData.categories}
                    height={"400px"}
                    direction={direction}
                />
				</Col>
				<Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
					<SocialMediaReferral/>
				</Col>
			</Row>
            <Row gutter={16}>
				<Col xs={24} sm={24} md={24} lg={16} xl={16} xxl={16} >
                    <Card>
                        <img
                                width="100%"
                                alt="logo"
                                src="/img/others/img-18.png"
                                style={{borderRadius: "1rem 1rem"}}
                        />
                    </Card>
				</Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={8}>
                    <Card title="Description">
                        <p style={{fontSize: "1.1rem"}}>The Philippines is one of the world’s largest archipelago nations. It is situated in Southeast Asia in the Western Pacific Ocean. Its islands are classified into three main geographical areas – Luzon, Visayas, and Mindanao. Because of its archipelagic nature, Philippines is a culturally diverse country. The Philippines is one of the world’s largest archipelago nations. It is situated in Southeast Asia in the Western Pacific Ocean. Its islands are classified into three main geographical areas – Luzon, Visayas, and Mindanao. Because of its archipelagic nature, Philippines is a culturally diverse country. With its topography consisting of mountainous terrains, dense forests, plains, and coastal areas.</p>
                    </Card>
				</Col>
			</Row>
		</>
	);
};

export default UserCampaign;
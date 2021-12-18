import React from "react";
import { Card, Table, Tag, Menu} from 'antd';
import Flex from 'components/shared-components/Flex'
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { 
	name
} from './CampaignDashboardData'
import moment from 'moment'; 
import { DATE_FORMAT_DD_MM_YYYY } from 'constants/DateConstant'
import utils from 'utils'
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { Link } from "react-router-dom";
import { 
	EyeOutlined
} from '@ant-design/icons';


const getShippingStatus = status => {
	if(status === 'Approved') {
		return 'cyan'
	}
	if(status === 'Pending') {
		return 'blue'
	}
  if(status === 'Rejected') {
		return 'volcano'
	}
	return ''
}

const tableColumns = [
    {
          title: 'Suggestor',
          dataIndex: 'name',
          render: (_, record) => (
              <Flex>
                  <AvatarStatus size={30} src={record.image} name={record.name}/>
              </Flex>
          ),
          sorter: (a, b) => utils.antdTableSorter(a, b, 'name')
      },
      {
          title: 'Campaign Name',
          dataIndex: 'campaignName',
          render: (_, record) => (
              <Flex>
                  <AvatarStatus size={30} src={record.logo} name={record.campaignName}/>
              </Flex>
          )
      },
      {
          title: 'Date',
          dataIndex: 'date',
          render: (_, record) => (
              <span>{moment.unix(record.date).format(DATE_FORMAT_DD_MM_YYYY)}</span>
          )
      },
      {
          title: 'Status',
          dataIndex: 'orderStatus',
          render: (_, record) => (
              <><Tag color={getShippingStatus(record.orderStatus)}>{record.orderStatus}</Tag></>
          )
      },
      {
          title: 'Category',
          dataIndex: 'category',
          render: (_, record) => (
              <span className="font-weight-semibold">
          {record.category}
              </span>
          )
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (_, record) => (
            <EllipsisDropdown 
		menu={
			<Menu>
				<Menu.Item key="0">
					<Link to={`campaign/${record.id}`}>
						<EyeOutlined />
						<span className="ml-2">View</span>
					</Link>
				</Menu.Item>
			</Menu>
		}
	/>
        )
    }

  ]
  
const LatestCampaignSuggestion = () => (
      <Card title="Campaigns Suggestion">
          <Table
              pagination={true}
              columns={tableColumns} 
              dataSource={name} 
              rowKey='id'
          />
      </Card>
  )

const Campaigns = () => {
    return (
        <>
            <LatestCampaignSuggestion></LatestCampaignSuggestion>
        </>
    )
}

export default Campaigns

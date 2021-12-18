import  {React, useState} from "react";
import {  Col , Card, Avatar, Dropdown, Table, Menu, Tag } from 'antd';
import Flex from 'components/shared-components/Flex'

import { 
    FileExcelOutlined, 
    PrinterOutlined, 
    EllipsisOutlined, 
    ReloadOutlined ,
    EyeOutlined,
    DeleteOutlined
   
} from '@ant-design/icons';
import utils from 'utils';

import EllipsisDropdown from 'components/shared-components/EllipsisDropdown';


	
const viewDetails = row => {
}

const deleteRow = row => {
   
}

const dropdownMenu = row => (
    <Menu>
        <Menu.Item onClick={() => viewDetails(row)}>
            <Flex alignItems="center">
                <EyeOutlined />
                <span className="ml-2">Connect</span>
            </Flex>
        </Menu.Item>
        <Menu.Item onClick={() => deleteRow(row)}>
            <Flex alignItems="center">
                <DeleteOutlined />
                <span className="ml-2">Disconnect</span>
            </Flex>
        </Menu.Item>
    </Menu>
);

const AccountData = [
    {
        id: '#5331',
        resident_id: 1,
        applicant: 'Clayton Bates',
        date: '8 May 2020',
        classification: 'Rape',
        status: 'Connected',
        avatarColor: '#04d182'
    },
    {
        id: '#5332',
        resident_id: 2,

        applicant: 'Gabriel Frazier',
        date: '6 May 2020',
        classification: 'Baho Gian',
        status: 'Disconnected',
        avatarColor: '#fa8c16'
    },
    {
        id: '#5333',
        resident_id: 4,

        applicant: 'Debra Hamilton',
        date: '1 May 2020',
        classification: 'Attack',
        status: 'Connected',
        avatarColor: '#1890ff'
    },
    {
        id: '#5334',
        resident_id: 6,

        applicant: 'Stacey Ward',
        date: '28 April 2020',
        classification: 'Molested',
        status: 'Connected',
        avatarColor: '#ffc542'
    },
    {
        id: '#5335',
        applicant: 'Troy Alexander',
        resident_id: 3,
        date: '28 April 2020',
        classification: 'test',
        status: 'Disconnected',
        avatarColor: '#ff6b72'
    },
];



const AccountList = (
    <Menu>
      <Menu.Item key="0">
        <span>
          <div className="d-flex align-items-center">
            <ReloadOutlined />
            <span className="ml-2">Refresh</span>
          </div>
        </span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>
          <div className="d-flex align-items-center">
            <PrinterOutlined />
            <span className="ml-2">Print</span>
          </div>
        </span>
      </Menu.Item>
      <Menu.Item key="12">
        <span>
          <div className="d-flex align-items-center">
            <FileExcelOutlined />
            <span className="ml-2">Export</span>
          </div>
        </span>
      </Menu.Item>
    </Menu>
  );

const cardDropdown = (menu) => (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <a href="/#" className="text-gray font-size-lg" onClick={e => e.preventDefault()}>
        <EllipsisOutlined />
      </a>
    </Dropdown>
  )

  const tableColumns = [
    {
      title: 'Applicant',
      dataIndex: 'applicant',
      key: 'applicant',
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <Avatar size={30} className="font-size-sm" style={{backgroundColor: record.avatarColor}}>
            {utils.getNameInitial(text)}
          </Avatar>
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
  
  
    {
      title: () => <div className="text-right">Status</div>,
      key: 'status',
      render: (_, record) => (
        <div className="text-right">
          <Tag className="mr-0" color={record.status === 'Connected' ? 'cyan' : record.status === 'Disconnected' ? 'volcano' : 'volcano'}>{record.status}</Tag>
        </div>
      ),
    },
    {
        title: () => <div className="text-right">Action</div>,
        dataIndex: 'actions',
        render: (_, elm) => (
            <div className="text-right">
                <EllipsisDropdown menu={dropdownMenu(elm)}/>
            </div>
        )
    }
  ];
  //RESIDENT SELECT ROW FROM RADIO BUTTON GLOBALIZATION TBA
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

      selectedRows.map((number) =>
        console.log(number.applicant)
    );
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
const AccountField = () => {
   
    const [accountData] = useState(AccountData)

	return (
        <Col xs={24} sm={24} md={24} lg={24}>
        <Card title="Connect Account" extra={cardDropdown(AccountList)}>		
         
          
            <Table 
              className="no-border-last" 
              columns={tableColumns} 
              dataSource={accountData} 
              rowKey='id' 
              rowSelection={{
                type: "radio",
                ...rowSelection,
              }}
              pagination="true"            />
			
		
		</Card>
        </Col>

	)
}

export default AccountField

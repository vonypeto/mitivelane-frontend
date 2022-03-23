import React from 'react'
import { Card, Table, Badge, Button, Menu, message } from 'antd'
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import Flex from "components/shared-components/Flex";
import { Link } from 'react-router-dom';

import {
    EyeOutlined,
    EllipsisOutlined,
    DeleteOutlined,
    SearchOutlined,
    PlusCircleOutlined,
    FileExcelOutlined,
    PrinterOutlined,
    EditOutlined,
    ReloadOutlined,
} from "@ant-design/icons";

import {
    ResidentTableColumns,
    ResidentTableData,
    HouseholdTableData,
} from "./ResidentAyudaData"

const AyudaTable = (props) => {
    const { barangay_id } = props
    const HouseholdTableColumns = [
        {
            title: "Household Number",
            dataIndex: "household_number",
            key: "household_number",
        },
        {
            title: "Household Name",
            dataIndex: "househole_name",
            key: "househole_name",
        },
        {
            title: "Purok",
            dataIndex: "purok",
            key: "purok",
        },
        {
            title: "House Status",
            dataIndex: "house_status",
            key: "house_status",
        },
        {
            title: "Family Planning",
            dataIndex: "family_planning",
            key: "family_planning",
        },
        {
            title: "Ayuda",
            dataIndex: "ayuda",
            key: "ayuda",
        },
        {
            title: "Water Source",
            dataIndex: "water_source",
            key: "water_source",
        },
        {
            title: "Toilet Type",
            dataIndex: "toilet_type",
            key: "toilet_type",
        },
        {
            title: "Waste Management",
            dataIndex: "waste_management",
            key: "waste_management",
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, elm) => (
                <div className="text-right">
                    <EllipsisDropdown menu={dropdownMenu(elm)} />
                </div>
            ),
        }
    ];

    const deleteHousehold = (row) => {
        message.success(`Deleting household id ${row.household_id}`)
    }

    const dropdownMenu = (row) => (
        <Menu>
            <Menu.Item key={1}>
                <Flex alignItems="center">
                    <EditOutlined />
                    <Link style={{ color: "black" }} to={`/app/${barangay_id}/residents/household/${row.household_id}/edit`}>
                        <span className="ml-2">Manage Household</span>
                    </Link>
                </Flex>
            </Menu.Item>
            <Menu.Item key={2} onClick={() => {deleteHousehold(row)}}>
                <Flex alignItems="center">
                    <DeleteOutlined />
                    <span className="ml-2" style={{color: "black"}}>Delete Household</span>
                </Flex>
            </Menu.Item>
        </Menu>
    );

    const expandedRowRender = (household_member_id) => {

        const data = [];
        ResidentTableData.map((resident_data) => {
            let isResidentValid = household_member_id.includes(resident_data.id)
            if (isResidentValid === true) {
                data.push(resident_data)
            }
        })

        return <Table columns={ResidentTableColumns} dataSource={data} pagination={false} rowKey="id" />;
    };

    return (
        <Card
            title="Residents"
            extra={
                <Link to={`/app/${barangay_id}/residents/household/add`}>
                    <Button type='primary'>
                        Add Household
                    </Button>
                </Link>
            }
        >
            <Table
                className="no-border-last"
                columns={HouseholdTableColumns}
                dataSource={HouseholdTableData}
                scroll={{ x: "max-content" }}
                expandable={{
                    expandedRowRender: data => (
                        expandedRowRender(data.household_member_id)
                    ),
                    rowExpandable: data => data.househole_name !== "Not Expandable"
                }}
                rowKey="household_id"
                pagination="true"
                bordered
            />
        </Card>
    )
}

export default AyudaTable
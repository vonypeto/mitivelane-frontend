import { React, useEffect, useState, } from 'react'
import { Card, Table, Badge, Button, Menu, message } from 'antd'
import { useAuth } from "contexts/AuthContext";
import axios from 'axios';
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
    //Import 
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const { generateToken, currentBarangay } = useAuth();

    //Initialize
    const { barangay_id } = props

    //Table
    const HouseholdTableColumns = [
        {
            title: "Household Number",
            dataIndex: "house_number",
            key: "house_number",
        },
        {
            title: "Household Name",
            dataIndex: "name",
            key: "name",
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

    //State
    const [householdList, sethouseholdList] = useState([])

    //useEffect
    useEffect(() => {
        getAllHousehold()
    }, [])

    //Axios
    const getAllHousehold = async () => {
        const households = await axios.post(
            "/api/household/getAll",
            { barangay_id: barangay_id },
            generateToken()[1],
            { cancelToken }
        )

        sethouseholdList(households.data)
    }
    
    const popHousehold = async (household_id) => {
        const households = await axios.post(
            "/api/household/delete",
            {household_id, barangay_id: barangay_id },
            generateToken()[1],
            { cancelToken }
        )
    }


    //Functions
    const deleteHousehold = (row) => {
        const household_id = row.household_id
        var currentHouseholdList = [...householdList]
        var objIndex = currentHouseholdList.findIndex((obj => obj.household_id == household_id));
        currentHouseholdList.splice(objIndex, 1); 
        sethouseholdList(currentHouseholdList)
        message.success(`Deleting household id ${row.household_id}`)

        popHousehold(row.household_id)
        
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
            <Menu.Item key={2} onClick={() => { deleteHousehold(row) }}>
                <Flex alignItems="center">
                    <DeleteOutlined />
                    <span className="ml-2" style={{ color: "black" }}>Delete Household</span>
                </Flex>
            </Menu.Item>
        </Menu>
    );

    const expandedRowRender = (household_members) => {
        console.log(household_members)
        household_members.map((member) => {
            member.name = `${member.first_name} ${member.last_name}`
        })

        return <Table columns={ResidentTableColumns} dataSource={household_members} pagination={false}  rowKey="_id" />;
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
                dataSource={householdList}
                scroll={{ x: "max-content" }}
                expandable={{
                    expandedRowRender: data => (
                        expandedRowRender(data.household_members)
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
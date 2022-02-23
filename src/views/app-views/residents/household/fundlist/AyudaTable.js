import React from 'react'
import { Card, Table, Badge } from 'antd'

import {
    ResidentTableColumns,
    ResidentTableData,
    HouseholdTableColumns,
    HouseholdTableData,
} from "./ResidentAyudaData"

const AyudaTable = () => {
    const expandedRowRender = (household_member_id) => {

        const data = [];
        ResidentTableData.map((resident_data) => {
            let isResidentValid = household_member_id.includes(resident_data.id)
            if (isResidentValid === true) {
                data.push(resident_data)
            }
        })

        return <Table columns={ResidentTableColumns} dataSource={data} pagination={false} rowKey="id"/>;
    };

    return (
        <Card
            title="Residents"
        >
            <Table
                className="no-border-last"
                columns={HouseholdTableColumns}
                dataSource={HouseholdTableData}
                expandable={{
                    expandedRowRender: data => (
                        expandedRowRender(data.household_member_id)
                    ),
                    rowExpandable: data => data.househole_name !== "Not Expandable"
                }}
                rowKey="household_id"
                pagination="true"
                bordered
                expandRowByClick
            />
        </Card>
    )
}

export default AyudaTable
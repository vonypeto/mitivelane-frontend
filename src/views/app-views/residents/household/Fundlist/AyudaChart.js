import React from 'react'

import { Tabs, Form, Card, Button, Row, Col, Badge, message } from "antd";
import Chart from "react-apexcharts";

import {
    AyudaChartData
} from "./ResidentAyudaData"

const AyudaChart = () => {
    return (
        <Card>
            <h4>Supply Distribution</h4>
            <Chart
                options={AyudaChartData.options}
                series={AyudaChartData.series}
                height={300}
                type="bar"
            />
        </Card>
    )
}

export default AyudaChart

import { React, useState, useEffect} from 'react'

import { Tabs, Form, Card, Button, Row, Col, Badge, message } from "antd";
import Chart from "react-apexcharts";

import { AyudaChartData } from "./ResidentAyudaData"

const SupplyChart = (props) => {
    const { givenSupplyInventory, receivedSupplyInventory } = props;
    const [seriesState, setSeriesState] = useState([])

    var chartOptions = AyudaChartData.options

    useEffect(() => {
        console.log("givenSupplyInventory", givenSupplyInventory)
        console.log("receivedSupplyInventory", receivedSupplyInventory)
        setSeriesState(
            [
                {
                    name: "Supply Distributed",
                    data: givenSupplyInventory
                },
                {
                    name: "Supply Stock",
                    data: receivedSupplyInventory
                },
            ]
        )
    }, [givenSupplyInventory, receivedSupplyInventory])


    return (
        <Card>
            <h4>Supply Distribution</h4>
            <Chart
                options={chartOptions}
                series={seriesState}
                height={300}
                type="bar"
            />
        </Card>
    )
}

export default SupplyChart

import React from 'react'

import { Row, Col, Badge, } from "antd";
import Flex from "components/shared-components/Flex";
import DonutChartWidget from "components/shared-components/DonutChartWidget";

import {
    resident_ayuda_amount,
    resident_ayuda_name,
    resident_ayuda_color,
    resident_ayudas
} from './ResidentAyudaData'

const AyudaDonut = () => {
    return (
        <DonutChartWidget
            series={resident_ayuda_amount}
            labels={resident_ayuda_name}
            title="Supply Distribution"
            customOptions={{ colors: resident_ayuda_color }}
            bodyClass="mb-2 mt-3"
            extra={
                <Row justify="center">
                    <Col xs={20} sm={20} md={20} lg={24}>
                        <div className="mx-auto mt-4" style={{ maxWidth: 200 }}>
                            {resident_ayudas.map((resident_ayuda) => (
                                <Flex
                                    alignItems="center"
                                    justifyContent="between"
                                    className="mb-3"
                                    key={resident_ayuda.name}
                                >
                                    <div>
                                        <Badge color={resident_ayuda.color} />
                                        <span className="text-gray-light">{resident_ayuda.name}</span>
                                    </div>
                                    <span className="font-weight-bold text-dark">{resident_ayuda.amount}</span>
                                </Flex>
                            ))}
                        </div>
                    </Col>
                </Row>
            }
        />
    )
}

export default AyudaDonut

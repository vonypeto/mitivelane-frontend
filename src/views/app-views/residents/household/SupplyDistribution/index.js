import React from 'react'
import { Row, Col } from 'antd'
import SupplyChart from './SupplyChart'
import SupplyDonut from './SupplyDonut'


const SupplyDistribution = (props) => {
  const { barangay_id } = props
  console.log(barangay_id)
  return (
    <div>
      SupplyDistribution: {barangay_id}

      <Row gutter={20} style={{ overflow: "hidden" }} className="mt-3">
        <Col xs={24} sm={24} md={24} lg={24} xl={18} className="w-100">
          <SupplyChart />
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={6} className="w-100">
          <SupplyDonut />
        </Col>
      </Row>
    </div>
  )
}

export default SupplyDistribution
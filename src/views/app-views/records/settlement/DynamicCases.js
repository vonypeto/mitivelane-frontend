import { React, useState, useEffect } from 'react'
import { Row, Col, Table, Card, message } from 'antd'
import BlotterListData from "assets/data/blotter.data.json"
import BlotterTable from "./TableBlotterData"

import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const DynamicCases = (props) => {
  const {
    generateToken
  } = useAuth();

  const [blotterlist, setBlotterList] = useState([]);
  const [blotterlistData, setBlotterlistData] = useState([])
  const [blotterlistLoading, setBlotterListLoading] = useState(true);

  const { barangay_id, caseType } = props
  const [testText, setTestText] = useState("[arent");
  const selectTestText = (event) => {
    return (setTestText(event))
  }

  useEffect(() => {
    getBlotters(barangay_id)
  }, [])

  const getBlotters = (barangayId) => {
    axios.get("/api/blotter/get-blotters/" + barangayId, generateToken()[1]).then((response) => {
      console.log(response.data)
      setBlotterList(response.data)
      setBlotterlistData(response.data)
      setBlotterListLoading(false)
    }).catch(() => {
      message.error("Could not fetch the data in the server!")
    });
  }


  const blotterData = blotterlist.filter(data => data.barangay_id == barangay_id && data.settlement_status == caseType)
  return (
    <div>

      <Row>
        <Col xs={24} lg={24} sm={24}>
          {/* {testText} */}

          <BlotterTable testout={selectTestText.bind(this)} barangay_id={barangay_id} blotterData={blotterData} blotterlistLoading={blotterlistLoading} />

        </Col>


      </Row>

    </div>
  )
}

export default DynamicCases

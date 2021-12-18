import {React, useState} from 'react'
import {Row, Col ,Table , Card} from 'antd'
import BlotterListData from "assets/data/blotter.data.json"
import BlotterTable from "./TableBlotterData"

const DynamicCases = (props) => {
    const {barangay_id ,caseType} = props
    const blotterData = BlotterListData.filter(data => data.barangay_id == barangay_id && data.status == caseType)
    const [testText,setTestText] = useState("[arent");
    const selectTestText = (event) => {
       return (setTestText(event))
      }
    console.log(blotterData)
    return (
        <div>
            
            <Row>
            <Col xs={24} lg={24} sm={24}> 
                {/* {testText} */}
           
            <BlotterTable blotterData={blotterData} barangay_id={barangay_id} testout={selectTestText.bind(this)} />
        
            </Col>


            </Row>
           
        </div>
    )
}

export default DynamicCases

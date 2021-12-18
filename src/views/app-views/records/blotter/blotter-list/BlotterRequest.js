import React from "react";
import { Avatar, Tag, Row, Col, Drawer, Divider } from "antd";

import utils from "utils";
import VictimRequest from "assets/data/victim-request.data.json";
import SubjectRequest from "assets/data/subjected-request.data.json";
import RespondentRequest from "assets/data/respondent-request.data.json";

const BlotterRequest = (props) => {
  const { data, visible, close } = props;
  const victim = VictimRequest.filter(
    (victimdata) =>
      victimdata.blotter_id === data?.blotter_id &&
      victimdata.barangay_id === data?.barangay_id
  );
  const subject = SubjectRequest.filter(
    (subjectdata) =>
      subjectdata.blotter_id === data?.blotter_id &&
      subjectdata.barangay_id === data?.barangay_id
  );
  const respondent = RespondentRequest.filter(
    (respondentdata) =>
      respondentdata.blotter_id === data?.blotter_id &&
      respondentdata.barangay_id === data?.barangay_id
  );

  let countercolor = 0;
  let initial = data?.reporter === undefined ? "NULL" : data?.reporter;
  console.log(victim);
  const colortag = ["blue", "geekblue", "lime", "green"];
  const colortag2 = ["volcano", "orange", "gold", "lime"];

  return (
    <Drawer
      width={500}
      placement="right"
      onClose={close}
      closable={false}
      visible={visible}
    >
      <div className="mt-3 text-center">
        <Avatar
          size={80}
          className="font-size-sm"
          style={{ backgroundColor: "#" + data?.avatarColor }}
        >
          <div className="font-size-lg">{utils.getNameInitial(initial)}</div>
        </Avatar>
        <h3 className="mt-2 mb-0">{data?.reporter}</h3>
        <span className="text-muted">656 Tantiongco St Morong Rizal</span>
      </div>
      <div className="pt-1 text-center">
        <Tag className="mr-0 font-size-md" color="cyan">
          {data?.status}
        </Tag>
      </div>

      <Row>
        <Col xs={24} sm={24} md={24}>
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Subject:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 font-weight-bold">
                  {data?.classification}
                </span>
              </Col>
            </Row>

            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Subjected Persons:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                {subject.map((item, key) => {
                  return (
                    <div key={key} gutter={16} className="m-1">
                      <Tag
                        className="mr-0 font-size-sm"
                        color={colortag2[(countercolor += 1) % 4]}
                      >
                        {item.subjectname}
                      </Tag>
                    </div>
                  );
                })}
              </Col>
            </Row>

            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Victims:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                {victim.map((item, key) => {
                  return (
                    <div key={key} gutter={16} className="m-1">
                      <Tag
                        className="mr-0 font-size-sm"
                        color={colortag[(countercolor += 1) % 4]}
                      >
                        {item.victimname}
                      </Tag>
                    </div>
                  );
                })}
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Respondent:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                {respondent.map((item, key) => {
                  return (
                    <div key={key} gutter={16} className="m-1">
                      <Tag
                        className="mr-0 font-size-sm"
                        color={colortag[(countercolor += 1) % 4]}
                      >
                        {item.respondentname}
                      </Tag>
                    </div>
                  );
                })}
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Date Filed Report:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 font-weight-bold">
                  {data?.daterecorded}
                </span>
              </Col>
            </Row>

            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Time Occured:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 font-weight-bold">
                  {data?.incidenttime}
                </span>
              </Col>
            </Row>

            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Date Occured:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 font-weight-bold">asdad</span>
              </Col>
            </Row>

            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Location:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 font-weight-bold">
                  {data?.incidentlocation}
                </span>
              </Col>
            </Row>

            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Description:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <div className="text-right">
                  <span className="ml-5 font-weight-bold">
                    {data?.description}
                  </span>
                </div>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top ">
              <Col xs={12} sm={12} md={9} className="text-left">
                <span className=" font-weight-bold text-muted-resident">
                  Attaches file:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <div className="text-right">
                  <span className="ml-5 font-weight-bold">evidence.mp4</span>
                </div>
              </Col>
            </Row>
          </Col>
        </Col>
      </Row>
    </Drawer>
  );
};

export default BlotterRequest;

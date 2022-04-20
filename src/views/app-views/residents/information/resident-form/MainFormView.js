import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import { Icon } from "components/util-components/Icon";
import utils from "utils";

import {
  MailOutlined,
  UserOutlined,
  HeartOutlined,
  HistoryOutlined,
  AndroidOutlined,
  PhoneOutlined,
  SkinOutlined,
  StarOutlined,
  VerticalAlignTopOutlined,
  UserSwitchOutlined,
  BankOutlined,
  KeyOutlined,
  ManOutlined,
  CarryOutOutlined,
  ProfileOutlined,
  IdcardOutlined,
  WomanOutlined,
  HomeOutlined,
  ContactsOutlined,
  HomeFilled,
  AuditOutlined,
  ContainerOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";

const MainFormView = (props) => {
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={7}>
        <Card title="Profile" className="text-left">
          <div className="pt-1 mb-2 text-center">
            <div>
              <Avatar
                size="large"
                icon={utils.getNameInitial(props.residentData.firstname + " " + props.residentData.lastname)}
                style={{
                  width: "140px",
                  height: " 140px",
                  lineHeight: "140px",
                  fontSize: "70px",
                  backgroundColor: props.residentData.avatarColor
                }}
              />
            </div>
            <div>
              <h2>
                {props.residentData.firstname} {props.residentData.middlename}{" "}
                {props.residentData.lastname}
              </h2>
            </div>
          </div>
  
          <div
            className="d-flex align-items-center "
            style={{ fontSize: "15px " }}
          >
            <Col xs={24} sm={24} md={24} className="w-100">
              <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
                <Col xs={12} sm={12} md={9} className="text-left">
                  <Icon
                    type={SkinOutlined}
                    className="mr-3 text-dark font-size-md"
                  />
                  <span className=" font-weight-bold text-muted-resident">
                    Alias:
                  </span>
                </Col>
                <Col xs={12} sm={12} md={15} className="text-right">
                  <span className="ml-5 text-detail-resident font-weight-bold">
                    {props.residentData.alias}
                  </span>
                </Col>
              </Row>
              <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
                <Col xs={12} sm={12} md={9} className="text-left">
                  <Icon
                    type={UserSwitchOutlined}
                    className="mr-3 text-dark font-size-md"
                  />
                  <span className=" font-weight-bold text-muted-resident">
                    Civil Status:
                  </span>
                </Col>
                <Col xs={12} sm={12} md={15} className="text-right">
                  <span className="ml-5 text-detail-resident font-weight-bold">
                    {props.residentData.civil_status}
                  </span>
                </Col>
              </Row>
              <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
                <Col xs={12} sm={12} md={9} className="text-left">
                  <Icon
                    type={HistoryOutlined}
                    className="mr-3 text-dark font-size-md"
                  />
                  <span className=" font-weight-bold text-muted-resident">
                    Age:
                  </span>
                </Col>
                <Col xs={12} sm={12} md={15} className="text-right">
                  <span className="ml-5 text-detail-resident font-weight-bold">
                    <bold>{props.residentData.age}</bold>
                  </span>
                </Col>
              </Row>
              <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
                <Col xs={12} sm={12} md={9} className="text-left">
                  <Icon
                    type={StarOutlined}
                    className="mr-3 text-dark font-size-md"
                  />
                  <span className=" font-weight-bold text-muted-resident">
                    Birthday:
                  </span>
                </Col>
                <Col xs={12} sm={12} md={15} className="text-right">
                  <span className="ml-5 text-detail-resident font-weight-bold">
                  {new Date(props.residentData.birthday).toDateString().split(' ').slice(1).join(' ')}
                  </span>
                </Col>
              </Row>
              <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
                <Col xs={12} sm={12} md={9} className="text-left">
                  <Icon
                    type={BankOutlined}
                    className="mr-3 text-dark font-size-md"
                  />
                  <span className=" font-weight-bold text-muted-resident">
                    Birth Place:
                  </span>
                </Col>
                <Col xs={12} sm={12} md={15} className="text-right">
                  <span className="ml-5 text-detail-resident font-weight-bold">
                    {props.residentData.birth_of_place}
                  </span>
                </Col>
              </Row>
              <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
                <Col xs={12} sm={12} md={9} className="text-left">
                  <Icon
                    type={VerticalAlignBottomOutlined}
                    className="mr-3 text-dark font-size-md"
                  />
                  <span className=" font-weight-bold text-muted-resident">
                    Weight:
                  </span>
                </Col>
                <Col xs={12} sm={12} md={15} className="text-right">
                  <span className="ml-5 text-detail-resident font-weight-bold">
                    {props.residentData.weight} kg
                  </span>
                </Col>
              </Row>
              <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
                <Col xs={12} sm={12} md={9} className="text-left">
                  <Icon
                    type={VerticalAlignTopOutlined}
                    className="mr-3 text-dark font-size-md"
                  />
                  <span className=" font-weight-bold text-muted-resident">
                    Height:
                  </span>
                </Col>
                <Col xs={12} sm={12} md={15} className="text-right">
                  <span className="ml-5 text-detail-resident font-weight-bold">
                    {props.residentData.height} cm
                  </span>
                </Col>
              </Row>
            </Col>
  
            {console.log(props.residentData)}
          </div>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={17}>
        <Card title="Resident Details">
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={MailOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Email:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.email}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={PhoneOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Phone:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.telephone}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={AndroidOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Mobile:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.mobile_number}
                </span>
              </Col>
            </Row>
          </Col>
        </Card>
  
        <Card title="Additional Details">
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={ContainerOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  CitizenShip:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.citizenship}
                </span>
              </Col>
            </Row>
  
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={HeartOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Spouse:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.spouse}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={CarryOutOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Voter Status:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.voter_status}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={ManOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Father:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.father}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={WomanOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Mother:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.mother}
                </span>
              </Col>
            </Row>
          </Col>
        </Card>
  
        <Card title="Addresses">
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={HomeOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Address 1:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.address_1}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon type={HomeFilled} className="mr-3 text-dark font-size-md" />
                <span className=" font-weight-bold text-muted-resident">
                  Address 2:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.address_2}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={AuditOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  Area/Purok:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.area}
                </span>
              </Col>
            </Row>
          </Col>
        </Card>
  
        <Card title="Social Welfare Service">
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={KeyOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">SSS</span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.sss}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={IdcardOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">TIN</span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.tin}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={ProfileOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  PAG-IBIG:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.pag_ibig}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={ContactsOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">
                  PHILHEALTH:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {props.residentData.philhealth}
                </span>
              </Col>
            </Row>
          </Col>
        </Card>
      </Col>
    </Row>
  );
}

export default MainFormView;

import React from "react";
import { Row, Col, Card, Avatar, Skeleton } from "antd";
import { Icon } from "components/util-components/Icon";
import utils from "utils";
import CustomAvatar from "components/shared-components/Avatar";

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
  ExperimentOutlined,
} from "@ant-design/icons";
import { computeAge } from "helper/Formula";

const MainFormView = (props) => {
  const {loading, residentData} = props
  const displayText = (data) => {
    return (data ? data : "None")
  }

  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={7}>
        <Card title="Profile" className="text-left" >
          <Skeleton loading={loading} avatar active={{size: "large"}}>
            <div className="pt-1 mb-2 text-center">
              <CustomAvatar
                size={100}
                color={residentData.avatarColor}
                icon={utils.getNameInitial(residentData.firstname + " " + residentData.lastname)}
                image={residentData.profile?.fileUrl}
              />
              <div>
                <h2>
                {displayText(`${residentData.firstname} ${residentData.middlename}
                  ${residentData.lastname}`)}
                </h2>
              </div>
            </div>

            <div
              className="d-flex align-items-center "
              style={{ fontSize: "15px " }}
            >
              <Col xs={24} sm={24} md={24} className="w-100">
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={SkinOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Alias:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      {displayText(residentData.alias)}
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={UserSwitchOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Civil Status:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      {displayText(residentData.civil_status)}
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={HistoryOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Age:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      <b>{displayText(computeAge(residentData.birthday))}</b>
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={UserOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Gender:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      <b>{displayText(residentData.gender)}</b>
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={ExperimentOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Blood Type:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      <b>{displayText(residentData.blood_type)}</b>
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={StarOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Birthday:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      {displayText(new Date(residentData.birthday).toDateString().split(' ').slice(1).join(' '))}
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={BankOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Birth Place:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      {displayText(residentData.birth_of_place)}
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={VerticalAlignBottomOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Weight:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      {displayText(residentData.weight)} kg
                    </span>
                  </Col>
                </Row>
                <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
                  <Col xs={12} sm={12} md={9} className="text-left">
                    <Icon
                      type={VerticalAlignTopOutlined}
                      className="mr-3 text-dark font-size-md"
                    />
                    <span className=" font-weight-bold text-muted-resident">
                      Height:
                    </span>
                  </Col>
                  <Col xs={12} sm={12} md={12} className="text-right">
                    <span className="ml-5 text-detail-resident font-weight-bold">
                      {displayText(residentData.height)} cm
                    </span>
                  </Col>
                </Row>
              </Col>

            </div>

          </Skeleton>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={17}>
        <Card title="Resident Details" loading={loading}>
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.email)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.telephone)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle" >
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
                  {displayText(residentData.mobile_number)}
                </span>
              </Col>
            </Row>
          </Col>
        </Card>

        <Card title="Additional Details" loading={loading}>
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.citizenship)}
                </span>
              </Col>
            </Row>

            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.spouse)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.voter_status)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.father)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.mother)}
                </span>
              </Col>
            </Row>
          </Col>
        </Card>

        <Card title="Addresses" loading={loading}>
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.address_1)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon type={HomeFilled} className="mr-3 text-dark font-size-md" />
                <span className=" font-weight-bold text-muted-resident">
                  Address 2:
                </span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {displayText(residentData.address_2)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.area)}
                </span>
              </Col>
            </Row>
          </Col>
        </Card>

        <Card title="Social Welfare Service" loading={loading}>
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={KeyOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">SSS</span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {displayText(residentData.sss)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
              <Col xs={12} sm={12} md={9} className="text-left">
                <Icon
                  type={IdcardOutlined}
                  className="mr-3 text-dark font-size-md"
                />
                <span className=" font-weight-bold text-muted-resident">TIN</span>
              </Col>
              <Col xs={12} sm={12} md={15} className="text-right">
                <span className="ml-5 text-detail-resident font-weight-bold">
                  {displayText(residentData.tin)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.pag_ibig)}
                </span>
              </Col>
            </Row>
            <Row className="pt-3 mt-2 mb-2 bt-1 border-top" align="middle">
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
                  {displayText(residentData.philhealth)}
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

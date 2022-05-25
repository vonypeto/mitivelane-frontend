import { React, useState } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import Flex from "components/shared-components/Flex";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  Input,
  Avatar,
  Divider,
  Table,
  Tooltip,
  Tag,
  Popconfirm,
  message,
  Skeleton,
  Steps,
  Select,
} from "antd";
import {
  UserOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import MemberSample from "assets/data/member-sample.data.json";
import utils from "utils";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
const { Option } = Select;

const { Step } = Steps;

const ManageMember = (props) => {
  const { currentOrganization, generateToken, currentUser } = useAuth();
  
  const [editOrganization, setEditOrganization] = useState(false);
  const [memberRequest, setMemberRequest] = useState([])
  const [addMember, setAddMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectEmail, setSelectEmail] = useState([]);
  const [newMember, setNewMember] = useState([])
  const [sending, setSending] = useState(false)

  const getUnique = (arr, index) => {
    const unique = arr
      .map((e) => e[index])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e) => arr[e])
      .map((e) => arr[e]);

    return unique;
  };

  const tableMember = [
    {
      title: "Member Name",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => utils.antdTableSorter(a, b, "lastname"),
      render: (text, member) => (
        <div className="d-flex align-items-center">
          <Avatar
            size={40}
            className="font-size-sm"
            style={{ backgroundColor: member.avatarColor }}
          >
            {utils.getNameInitial(text)}
          </Avatar>
          <span className="ml-2">{member.email}</span>
        </div>
      ),
    },

    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
      render: (_, elm) => (
        <>
          <div
            key={elm}
            className="text-center avatar-status d-flex align-items-center"
          >
            <div className="ml-2">
              {
                (elm.role == "Administrator") ? (
                  <>
                    <div>
                      <div className="avatar-status-name">{elm.role}</div>
                    </div>
                    <div className="text-muted avatar-status-subtitle">
                      Administrator can perform any Action
                    </div></>

                )
                  : (
                    <>
                      <div>
                        <div className="avatar-status-name">{elm.role}</div>
                      </div>
                      <div className="text-muted avatar-status-subtitle">
                        Editor is limited to perform Action
                      </div></>
                  )}

            </div>
          </div>
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
      render: (_, elm) => (
        <>
          <div key={elm} className="text-center align-items-center">
            <Tag
              color={
                elm.status === "Active"
                  ? "cyan"
                  : elm.status === "Pending"
                    ? "orange"
                    : elm.status === "Inactive"
                      ? "volcano"
                      : null
              }
            >
              {elm.status}
            </Tag>
          </div>
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "member_id",

      render: (_, elm) => (
        <div className="text-right">
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EditOutlined />}
                onClick={() => {
                  // showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip
            // title={
            //   selectedRowsBlotterRequest.length > 0
            //     ? `Delete (${selectedRowsBlotterRequest.length})`
            //     : "Delete"
            // }
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  // BlotterRequestDeleteRow(elm);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        </div>
      ),
    },
  ];

  const roleMember = (event) => {
    var tempNewMember = newMember
    var tempRole = event.split(",");

    if (parseInt(tempRole[1]) == 1) {
      tempNewMember[tempRole[0]].role = "Administrator"
    } else {
      tempNewMember[tempRole[0]].role = "Editor"
    }

    setNewMember(tempNewMember)
  };

  const roleTable = [
    {
      title: "Member Name",
      dataIndex: "email",
      key: "email",
      render: (text, member) => (
        <div className="d-flex align-items-center">
          <Avatar
            size={40}
            className="font-size-sm"
            style={{ backgroundColor: member.avatarColor }}
          >
            {utils.getNameInitial(text)}
          </Avatar>
          <span className="ml-2">{member.email}</span>
        </div>
      ),
    },

    {
      title: "Role",
      dataIndex: "role",
	  key: "role",
      render: (_, elm) => (
        <>
          <div key={elm} className="text-center align-items-center">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              onChange={roleMember}
              defaultValue={elm.role}
              id="roleid"
            >
              <Option value={elm.member_id + ",1"}>Administrator</Option>
              <Option value={elm.member_id + ",2"}>Editor</Option>
            </Select>
            ,
          </div>
        </>
      ),
    },
  ];

  const finishedTabled = [
    {
      title: "Member Name",
      dataIndex: "email",
      key: "email",
      render: (text, member) => (
        <div className="text-center d-flex align-items-center">
          <Avatar
            size={40}
            className="font-size-sm"
            style={{ backgroundColor: member.avatarColor }}
          >
            {utils.getNameInitial(text)}
          </Avatar>
          <span className="ml-2">{member.email}</span>
        </div>
      ),
    },

    {
      title: "Role",
      dataIndex: "role_id",
      key: "role_id",
      render: (_, elm) => (
        <>
          <div key={elm} className="text-center align-items-center">
            {elm.role}
          </div>
        </>
      ),
    },
  ];

  const onChangeMember = (value) => {
    setSelectEmail(value)
  };

  const steps = [
    {
      title: "First",
      content: (
        <>
          <div className="mt-3 mb-4">
            <h3>Send invitation to new members</h3>
            <span className="text-muted">
              New member will receive invitation via mail and accept the link to
              be a member.
            </span>
          </div>

          <Col className="mb-3 form-input-mb" xs={24} sm={24} md={13}>
            <Select
              defaultValue={selectEmail}
              onChange={onChangeMember}
              tokenSeparators={[","]}
              mode="tags"
              className="mt-2 w-100"
            >
              {selectEmail.map((elm) => (
                <Option key={elm} value={elm}>
                  {elm}
                </Option>
              ))}
            </Select>

            <span className=" text-muted">
              you can have multiple email separated by coma (,) after the email.
            </span>
          </Col>
        </>
      ),
    },
    {
      title: "Second",
      content: (
        <>
          <div>
            <div className="mt-3 mb-4">
              <h3>Member roles</h3>
              <span className="text-muted">
                Manage the limitation or role of the member that will be
                invited
              </span>
            </div>
            <div className="mb-2 table-responsive ">
              <Table
                dataSource={newMember}
                columns={roleTable}
                rowKey="member_id"
                scroll={{ x: "max-content" }}
                pagination={false}
                showHeader={false}
              />
            </div>
          </div>
          {/* {selectStage2.map((elm, i) => {
            return <div key={i}>{elm.email}</div>;
          })} */}
        </>
      ),
    },
    {
      title: "Last",
      content: (
        <>
          <div>
            <div className="mt-3 mb-4">
              <h3>Finalized</h3>
              <span className="text-muted">
                Send Invitation to their respective email
              </span>
            </div>
            <div className="mb-2 table-responsive ">
              <Table
                dataSource={newMember}
                columns={finishedTabled}
                rowKey="member_id"
                scroll={{ x: "max-content" }}
                pagination={false}
                showHeader={false}
				loading={sending}
              />
            </div>
          </div>
          {/* {selectStage2.map((elm, i) => {
            return <div key={i}>{elm.email}</div>;
          })} */}
        </>
      ),
    },
  ];

  const next = () => {
    if (current == 0 && selectEmail.length != 0) {
      setCurrent(current + 1);

      var finalData = []

      selectEmail.map((value, i) => {
        let colortag = [
          "#0085c3",
          "#7ab800",
          "#f2af00",
          "#dc5034",
          "#ce1126",
          "#0085c3",
          "#FF1493",
          "#AA47BC",
        ];
        const randomNum = Math.floor(Math.random() * colortag.length);
        const avatarColor = colortag[randomNum];

        finalData.push(
          {
            member_id: i,
            avatarColor: avatarColor,
            email: value,
            role: "Editor",
            status: "Pending"
          })
      })

      setNewMember(finalData)
    } else if (current == 0 && selectEmail.length == 0) {
      message.error("Email!")
    }

    if (current == 1) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const done = () => {
	setSending(true)
	  
    console.log(newMember)
    setMemberRequest(newMember)
	
	const values = {
		new_member: newMember,
		organization_id: currentOrganization,
		current_user_name: currentUser.displayName
	}
	
	axios
    .post("/api/organization_setting/add-member", values, generateToken()[1])
    .then((response) => {
    if (response.data == "Success") {
		setSending(false)
		setAddMember(!addMember)
		setSelectEmail([]);
		setNewMember([])
		setCurrent(0)
		return message.success("Processing complete!")
    } else {
		return message.error("Error, please try again.");
    }
    })
    .catch((error) => {
    console.log(error);
    message.destroy();
    message.error("The action can't be completed, please try again.");
    });
  }

  const onClickMember = () => {
    setAddMember(!addMember)
    setSelectEmail([]);
    setNewMember([])
    setCurrent(0)

    // setTimeout(() => {
    // setAddMember(!addMember);
    // setLoading(!loading);
    // setTimeout(() => {
    // setLoading(false);
    // }, 1000);
    // }, 500);
  };
  
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Manage Member</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage the members role and Add a new team member to your
            team, allowing them to collaborate with you.
          </p>
        </div>
      </Col>
      <Col xs={24} sm={24} md={15} className="ant-body-pt">
        <Card
          title="Member Details"
          extra={
            <Button onClick={() => onClickMember()}>
              {" "}
              {addMember ? "Cancel" : "Add Member"}
            </Button>
          }
        >
          <Col xs={24} sm={24} md={24} className="w-100">
            <Row className="pt-2 border-top ">
              <Col xs={24} sm={24} md={24} className="pt-2 text-left ">
                <Skeleton active loading={loading}>
                  {addMember ? (
                    <>
                      <Steps current={current}>
                        {steps.map((item) => (
                          <Step key={item.title} title={item.title} />
                        ))}
                      </Steps>
                      <div className="steps-content">
                        {steps[current].content}
                      </div>
                      <div className="steps-action">
                        {current < steps.length - 1 && (
                          <Button type="primary" onClick={() => next()}>
                            Next
                          </Button>
                        )}
                        {current === steps.length - 1 && (
                          <Button
                            type="primary"
                            onClick={() =>
                              done()
                            }
                          >
                            Done
                          </Button>
                        )}
                        {current > 0 && (
                          <Button
                            style={{ margin: "0 8px" }}
                            onClick={() => prev()}
                          >
                            Previous
                          </Button>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="table-responsive">
                      <Table
                        dataSource={memberRequest}
                        columns={tableMember}
                        rowKey="member_id"
                        scroll={{ x: "max-content" }}
                        pagination={false}
                        showHeader={false}
                      />
                    </div>
                  )}
                </Skeleton>
              </Col>
            </Row>
          </Col>
        </Card>
      </Col>
    </>
  );
};

export default ManageMember;

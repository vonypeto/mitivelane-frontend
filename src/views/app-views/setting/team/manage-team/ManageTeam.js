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
const { Option } = Select;
const ManageMember = (props) => {
  console.log(props);
  const [editBarangay, setEditBarangay] = useState(false);
  const [addMember, setAddMember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectEmail, setSelectEmail] = useState([]);
  const [selectStage2, setSelectStage2] = useState([]);
  const [selectStage3, setSelectStage3] = useState([]);
  const [roleSelect, setRoleSelect] = useState([]);
  const [firstPush, setFirstPush] = useState(true);

  const { Step } = Steps;
  let emailPick = [];
  let tmpRole = [];
  let listRole = [];
  let rolePick = [];
  let setDataEmail = [];
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
      dataIndex: "member_name",
      key: "member_name",
      sorter: (a, b) => utils.antdTableSorter(a, b, "lastname"),
      render: (text, member) => (
        <div className="d-flex align-items-center">
          <Avatar
            size={40}
            className="font-size-sm"
            style={{ backgroundColor: "#" + member.avatarColor }}
          >
            {utils.getNameInitial(text)}
          </Avatar>
          <span className="ml-2">{member.email}</span>
        </div>
      ),
    },

    {
      title: "Permission",
      dataIndex: "permission",
      key: "permission",
      sorter: (a, b) => utils.antdTableSorter(a, b, "firstname"),
      render: (_, elm) => (
        <>
          <div
            key={elm}
            className="text-center avatar-status d-flex align-items-center"
          >
            <div className="ml-2">
              <div>
                <div className="avatar-status-name">{elm.permission}</div>
              </div>
              <div className="text-muted avatar-status-subtitle">
                Administrator can perform any Action{" "}
              </div>
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
          {console.log("actio9n" + elm.blotter_id)}
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
    console.log(event);

    tmpRole = event.split(",");
    rolePick.push({ member_id: tmpRole[0], role_id: tmpRole[1] });
    rolePick = getUnique(rolePick, "member_id");
    // listRole.push(tmpRole[1]);
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
            style={{ backgroundColor: "#" + member.avatarColor }}
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

      render: (_, elm) => (
        <>
          <div key={elm} className="text-center align-items-center">
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Search to Select"
              optionFilterProp="children"
              onChange={roleMember}
              defaultValue={roleSelect[elm.member_id]}
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
            style={{ backgroundColor: "#" + member.avatarColor }}
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

      render: (_, elm) => (
        <>
          <div key={elm} className="text-center align-items-center">
            {elm.role_id === 1 ? "Administrator" : "Editor"}
          </div>
        </>
      ),
    },
  ];
  const onChangeMember = (value) => {
    console.log(`selected ${value}`);
    emailPick = value;
    // console.log(selectEmail)
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
                Manage the limitation or permission of the member that will be
                invited
              </span>
            </div>
            <div className="mb-2 table-responsive ">
              <Table
                dataSource={selectStage2}
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
                dataSource={selectStage3}
                columns={finishedTabled}
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
  ];

  const next = () => {
    // sendEmail = emailPick.toString().split(',');
    // selectEmail = [].concat.apply([], selectEmail);
    // setSelectEmail(selectEmail)
    // console.log(listRole);
    // console.log(emailPick);
    if (rolePick.length || listRole.length) {
      let roleTmpSelect = roleSelect;
      let tmpArrayRole = selectStage3;
      console.log(tmpArrayRole);
      rolePick.map((elm, i) => {
        if (firstPush) {
          roleTmpSelect.push(elm.member_id + "," + elm.role_id);

          tmpArrayRole.push({
            member_id: elm.member_id,
            email: selectStage2[i].email,
            role_id: elm.role_id,
          });
        } else {
          try {
            for (let x = 0; x <= roleTmpSelect.length - 1; x++) {
              if (selectStage3[x].member_id === elm.member_id) {
                tmpArrayRole[x].role_id = elm.role_id;
                roleTmpSelect[x] = elm.member_id + "," + elm.role_id;
                console.log(tmpArrayRole[x].role_id);
              }
            }

            // console.log(elm.role_id + ":" + tmpArrayRole[i].role_id);
            console.log("RUN ");
            console.log("selectTmpRole", tmpArrayRole);
            console.log("roleTmpSelect", roleTmpSelect);
            console.log("_______________-");
          } catch (e) {
            console.error(e);
          }
          console.log(selectStage3.length + ":" + (elm.member_id + 1));

          if (selectStage3.length < elm.member_id + 1) {
            roleTmpSelect.push(elm.member_id + "," + elm.role_id);

            tmpArrayRole.push({
              member_id: elm.member_id,
              email: selectStage2[i].email,
              role_id: elm.role_id,
            });
          }
        }
        return null;
      });
      rolePick = [];

      if (firstPush) {
        setFirstPush(!firstPush);
      }
      let tmp = [].concat.apply([], tmpArrayRole);
      console.group(tmp);
      setRoleSelect(roleTmpSelect);
      setSelectStage3(tmp);
      roleTmpSelect = [];
      tmpArrayRole = [];
    }
    if (emailPick.length) {
      emailPick.map((elm, i) => {
        return setDataEmail.push({ member_id: i, email: elm });
      });

      let tmp = [].concat.apply([], setDataEmail);
      setSelectStage2(tmp);
      setSelectEmail(emailPick);
      console.log(tmp[0].member_id);
      setDataEmail = [];
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onClickMember = () => {
    // setAddMember(!addMember)

    setTimeout(() => {
      setAddMember(!addMember);
      setLoading(!loading);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, 500);
    setSelectStage2([]);
    setSelectStage3([]);
    setSelectEmail([]);
    setRoleSelect([]);
  };
  return (
    <>
      <Col xs={24} sm={24} md={8}>
        <div className="pl-1">
          <h3>Manage Member</h3>
          <p className="mt-1 text-sm text-gray-600">
            Manage the members permission and Add a new team member to your
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
                              message.success("Processing complete!")
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
                        dataSource={MemberSample}
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

import { React, useEffect, useState, useRef, createRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Table,
  Menu,
  Button,
  Modal,
  Space,
  message,
} from "antd";

import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import axios from "axios";
import moment from "moment";
import utils from "utils";
import { useAuth } from "contexts/AuthContext";
import { handleTableChange, handleAddPage, handleDeletePages, searchBar, searchBarDate, searchIcon  } from "helper/pagination";

import { CreateSession } from "helper/session";

import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import NewAreaForm from "./NewAreaForm";

const PurokArea = (props) => {
  //Initialize
  const { organization_id } = props;

  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentOrganization , currentUser} = useAuth();

  const apiOptions = {
    axios,
    generateToken,
    cancelToken
  }

  const purokColumn = [
    {
      title: "Purok",
      dataIndex: "name",
      key: "name",
      width: "50%",
      filterDropdown: searchBar,
      filterIcon: searchIcon,
      sorter: (a, b) => utils.antdTableSorter(a, b, "name")
    },
    {
      title: "Date added",
      dataIndex: "createdAt",
      key: "createdAt",
      filterDropdown: searchBarDate,
      filterIcon: searchIcon,
      sorter: (a, b) => utils.antdTableSorter(a, b, "createdAt"),
      render: (_, data) => (
        <div className="d-flex align-items-center">
          <span className="ml-2">
            {new Date(data.createdAt)
              .toDateString()
              .split(" ")
              .slice(1)
              .join(" ")}
          </span>
        </div>
      ),

    },
    {
      title: "Actions",
      dataIndex: "actions",
      width: "20px",
      render: (_, elm) => (
        <div className="text-right">
          <EllipsisDropdown menu={dropdownMenu(elm)} />
        </div>
      ),
    },
  ];

  //Ref
  const NewAreaFormRef = createRef();

  //State
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [purokList, setPurokList] = useState([]);
  const [purokInitialVal, setPurokInitialVal] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  //Pagination State
  const [tableScreen, setTableScreen] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const defaultPageSize = 4
  const [pageSize, setPageSize] = useState(defaultPageSize)

  //Checkbox State
  const [selectedArray, setSelectedArray] = useState([])

  //UseEffect

  useEffect(() => {
    getAreasPage();
    console.log("currentUser", currentUser.displayName)
    CreateSession("Giann", "visited purok page", "create", "purok", organization_id, apiOptions)
  }, [currentPage, pageSize, tableScreen])

  //Axios

  //AxiosTable
  const getAreasPage = async () => {
    try {
      setLoading(true)
      await axios.post(
        "/api/purok/getPage",
        { organization_id: organization_id, page: currentPage, tableScreen, pageSize },
        generateToken()[1],
        { cancelToken }
      )
        .then((result) => {
          var data = result.data
          setTotal(data.total)
          setPurokList(data.list)
        })

    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }

    setLoading(false)
  };

  //Axios CRUD
  const addNewArea = async (newArea) => {
    try {
      const request = await axios.post(
        "/api/purok/add",
        { newArea, organization_id: organization_id },
        generateToken()[1],
        { cancelToken }
      );

      const data = request.data;
      await handleAddPage(total, setTotal, getAreasPage)
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  const deleteArea = async () => {
    try {
      console.log("selectedArray", selectedArray)
      const request = await axios.post(
        "/api/purok/delete",
        { organization_id: organization_id, selectedArray },
        generateToken()[1],
        { cancelToken }
      );
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  const updateArea = async (newAreaData) => {
    try {
      const request = await axios.post(
        "/api/purok/update",
        { organization_id: organization_id, newAreaData },
        generateToken()[1],
        { cancelToken }
      );
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  //Popup
  const handlePopUp = () => {
    setPurokInitialVal({ action: "added" });
    setShowAreaModal(true);
  };

  // Modal Function
  const handleOk = () => {
    NewAreaFormRef.current.submit();
  };

  const handleCancel = () => {
    setShowAreaModal(false);
    setPurokInitialVal({});
  };

  //Components
  const dropdownMenu = (row) => (
    <Menu>
      <Menu.Item
        key={1}
        onClick={() => {
          editPurok(row);
        }}
      >
        <EditOutlined />
        <span className="ml-2">Edit</span>
      </Menu.Item>
      <Menu.Item
        key={2}
        onClick={() => {
          deletePurok(row);
        }}
      >
        <DeleteOutlined />
        <span className="ml-2" style={{ color: "black" }}>
          Delete {selectedArray.length > 1 && `(${selectedArray.length})`}
        </span>
      </Menu.Item>
    </Menu>
  );

  //Component for checkbox
  const tableRowSelection = {
    selectedArray,
    onChange: (selectedRowKeys, selectedRows) => {
      onSelectChange(selectedRowKeys, selectedRows);
    },
  };

  //OnChange checkbox
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    if (selectedRows.length > 0) {
      let tempSelectedRows = [];

      selectedRows.map((row) => {
        tempSelectedRows.push(row.purok_id);
      });

      console.log(tempSelectedRows);
      setSelectedArray(tempSelectedRows);
    }
  };

  //Function
  const editPurok = (row) => {
    setLoading(true)
    setPurokInitialVal({
      name: row.name,
      action: "edited",
      purok_id: row.purok_id,
    });
    setShowAreaModal(true);
    setLoading(false)
  };

  const deletePurok = (row) => {
    setSubmitting(true)
    const currentpurokList = [...purokList];

    if (selectedArray.length == 0) {
      setSelectedArray(row.purok_id)

      var objIndex = currentpurokList.findIndex(
        (obj) => obj.purok_id == row.purok_id
      );
      currentpurokList.splice(objIndex, 1);
    }

    if (selectedArray.length > 0) {
      var objIndex

      selectedArray.forEach(id => {
        objIndex = currentpurokList.findIndex(
          (obj) => obj.purok_id == id
        );
        currentpurokList.splice(objIndex, 1);
      })
    }

    deleteArea()
    setPurokList(currentpurokList);
    handleDeletePages(selectedArray, total, setTotal, pageSize, currentPage, setCurrentPage, purokList, getAreasPage)
    message.success("Success, area has been deleted");
    setSubmitting(false)
  };

  //Onchange
  const handlePageSizeChange = (size) => {
    //set state list to []
    setPageSize(size)
  }

  const handlePageChange = async (page) => {
    if (page != null) {
      console.log("page", page)
      setCurrentPage(page);
    }
  }

  // Form Function
  const onFinishAddArea = (value) => {
    value.createdAt = Date.now();

    if (value.action == "added") {
      addNewArea(value);
    }

    if (value.action == "edited") {
      updateArea(value);

      const currentpurokList = [...purokList];
      var objIndex = currentpurokList.findIndex(
        (obj) => obj.purok_id == value.purok_id
      );
      currentpurokList[objIndex] = value;
      setPurokList(currentpurokList);
      message.success("Area data has been updated.");
    }

    setShowAreaModal(false);
  };

  return (
    <div>
      <Card>
        <Row justify="space-between">
          <Col>
            <h1>Purok/Area</h1>
          </Col>

          <Col>
            <Button type="primary" onClick={() => handlePopUp()}>
              Add Area
            </Button>
          </Col>
        </Row>

        <Table
          columns={purokColumn}
          dataSource={purokList}
          rowKey={"purok_id"}
          rowSelection={tableRowSelection}
          scroll={{ x: "max-content" }}
          loading={loading}
          pagination={{
            current: currentPage,
            total: total,
            pageSize: pageSize,
            showSizeChanger: true,
            defaultPageSize: defaultPageSize,
            pageSizeOptions: [defaultPageSize, 10, 20, 50, 100],
            onShowSizeChange: (current, size) => {
              handlePageSizeChange(size)
            },
            onChange: (page) => handlePageChange(page)
          }}
          onChange={(pagination, filters, sorter) => handleTableChange(sorter, filters, setPurokList, setTableScreen)}
        >

        </Table>
      </Card>

      <Modal
        title="New Area Information"
        visible={showAreaModal}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={"Submit"}
        destroyOnClose={true}
      >
        <Form
          name="new_area_form"
          onFinish={onFinishAddArea}
          ref={NewAreaFormRef}
          initialValues={purokInitialVal}
        >
          <NewAreaForm />
        </Form>
      </Modal>
    </div >
  );
};

export default PurokArea;
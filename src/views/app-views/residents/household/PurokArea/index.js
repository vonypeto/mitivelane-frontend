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
import { useAuth } from "contexts/AuthContext";

import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

import NewAreaForm from "./NewAreaForm";
import RowSelectionCustom from "views/app-views/components/data-display/table/RowSelectionCustom";

const PurokArea = (props) => {
  //Initialize
  const { organization_id } = props;

  //Import
  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const history = useHistory();
  const { generateToken, currentOrganization } = useAuth();

  const purokColumn = [
    {
      title: "Purok",
      dataIndex: "name",
      key: "name",
      width: "50%",
    },
    {
      title: "Date added",
      dataIndex: "createdAt",
      key: "createdAt",
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
      sorter: (a, b) => moment(a.createdAt).unix() - moment(b.createdAt).unix()
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

  //Pagination State
  const [tableScreen, setTableScreen] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [pageSize, setPageSize] = useState(4)

  //UseEffect
  useEffect(() => {
    getTotal();
    getAreasPage();
  }, []);

  useEffect(() => {
    getAreasPage();
  }, [currentPage, pageSize, tableScreen])

  //Initial Function
  const getTotalPage = (val) => {
    var total = val;
    var page = 1;
    while (total > pageSize) {
      total -= pageSize;
      page++;
    }
    return page;
  };

  //Axios
  const addNewArea = async (newArea) => {
    try {
      const request = await axios.post(
        "/api/purok/add",
        { newArea, organization_id: organization_id },
        generateToken()[1],
        { cancelToken }
      );

      const data = request.data;
      var newTotal = total + 1;
      setTotal(newTotal);

      if (purokList.length < pageSize) {
        setPurokList([...purokList, data]);
      }

      if (purokList.length == pageSize) {
        setCurrentPage(getTotalPage(newTotal));
      }

    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

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
          setPurokList(data)
          setLoading(false)
        })

    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  };

  const getTotal = async () => {
    try {
      await axios.get(
        `/api/purok/getTotal/${organization_id}`,
        generateToken()[1],
        { cancelToken }
      )
        .then((result) => {
          setTotal(result.data)
        })
    } catch (error) {
      console.log(error);
      message.error("Error in database connection!!");
    }
  }

  const deleteArea = async (area_id) => {
    try {
      const request = await axios.post(
        "/api/purok/delete",
        { organization_id: organization_id, area_id },
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
          Delete
        </span>
      </Menu.Item>
    </Menu>
  );

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
    setLoading(false)
    deleteArea(row.purok_id);

    const currentpurokList = [...purokList];
    var objIndex = currentpurokList.findIndex(
      (obj) => obj.purok_id == row.purok_id
    );
    currentpurokList.splice(objIndex, 1);
    setPurokList(currentpurokList);

    var newTotal = total - 1
    setTotal(newTotal);

    if (purokList.length == 1 && total > 1) {
      setCurrentPage(currentPage - 1);
    }

    message.success("Success, area has been deleted");
    setLoading(false)
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

  const handleTableChange = (pagination, filters, sorter) => {
    console.log("sorter", sorter)
    var sorter = {
      field: sorter.field,
      order: sorter.order
    }

    if (sorter.order != null) {
      setPurokList([])
      setTableScreen({ sorter })
    }

    if (sorter.order == null) {
      setTableScreen({})
    }

  }

  // Form Function
  const onFinishAddArea = (value) => {
    value.createdAt = Date.now();

    if (value.action == "added") {
      addNewArea(value);
      message.success("New Area has been added.");
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
          scroll={{ x: "max-content" }}
          loading={loading}
          pagination={{
            current: currentPage,
            total: total,
            pageSize: pageSize,
            showSizeChanger: true,
            defaultPageSize: pageSize,
            pageSizeOptions: [pageSize, 10, 20, 50, 100],
            onShowSizeChange: (current, size) => {
              handlePageSizeChange(size)
            },
            onChange: (page) => handlePageChange(page)
          }}
          onChange={handleTableChange}
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

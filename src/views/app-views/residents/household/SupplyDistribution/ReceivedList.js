import { React, useState, useEffect, createRef } from 'react'

//Hooks
import { Row, Col, Table, Card, Button, DatePicker, Modal, Drawer, Form, Menu, message } from 'antd'
import SupplyChart from './SupplyChart'
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import moment from 'moment'
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { useAuth } from "contexts/AuthContext";

//Icons
import {
    FaBoxes,
} from "react-icons/fa";

import {
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";

//Components
import SupplyReceivedForm from './SupplyReceivedForm';


const ReceievedList = (props) => {
    const { barangay_id, currentSupply, setCurrentSupply } = props

    //Import
    const source = axios.CancelToken.source();
    const cancelToken = source.token;
    const history = useHistory();
    const { generateToken, currentBarangay } = useAuth();

    //State
    const [pageSize, setPageSize] = useState(4)
    const [tableScreen, setTableScreen] = useState({})
    const [isReceivedModalVisible, setisReceivedModalVisible] = useState(false);
    const [isReceivedDrawerVisible, setisReceivedDrawerVisible] = useState(false);
    const [supplyReceivedList, setSupplyReceivedList] = useState([]);
    const [supplyReceivedInitialVal, setSupplyReceivedInitialVal] = useState({})
    const [receivedSelectedRowKeys, setReceivedSelectedRowKeys] = useState(0)
    const [receivedSupplyCurrentPage, setReceivedSupplyCurrentPage] = useState(1)
    const [receivedSupplyTotal, setReceivedSupplyTotal] = useState(0)
    const [formAction, setFormAction] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [receiveTableLoading, setReceivedTableLoading] = useState(false)

    //Ref
    const SupplyReceivedFormRef = createRef()

    //UseEffect
    useEffect(() => {
        getAllSupplies()
    }, [])

    useEffect(() => {
        getPage()
    }, [receivedSupplyCurrentPage, pageSize, tableScreen])

    useEffect(() => {
        console.log("supplyReceivedList", supplyReceivedList)
    }, [supplyReceivedList])

    //Axios
    const getAllSupplies = async () => {
        try {
            await axios.post(
                '/api/supply/receive/getAll',
                { barangay_id, pageSize },
                generateToken()[1],
                { cancelToken }
            ).then((res) => {
                var SupplyReceived = res.data.SupplyReceived
                SupplyReceived.map((data) => {
                    data.date = moment(new Date(data.date))
                })

                var suppliesReceivedCount = res.data.suppliesReceivedCount
                setReceivedSupplyTotal(suppliesReceivedCount)
                setSupplyReceivedList(SupplyReceived)
            })

        } catch (error) {
            console.log(error)
            message.error("Error in database connection!!")
        }
    }

    const getPage = async () => {
        setReceivedTableLoading(true)
        console.log("loading page:", receivedSupplyCurrentPage)
            await axios.post(
                `/api/supply/receive/getPage/${barangay_id}/${receivedSupplyCurrentPage}/${pageSize}`,
                { tableScreen },
                generateToken()[1],
                { cancelToken }
            )
            .then((res) => {
                var data = res.data
                setSupplyReceivedList(data)
                setReceivedTableLoading(false)
            })
    }

    const addSupplyReceived = async (newSupplyReceived) => {
        try {
            const new_supply_amount = currentSupply + newSupplyReceived.amount
            setCurrentSupply(new_supply_amount)

            await axios.post(
                '/api/supply/receive/add',
                { newSupplyReceived, barangay_id: barangay_id, new_supply_amount },
                generateToken()[1],
                { cancelToken }
            )
            .then((res) => {
                const data = res.data

                newSupplyReceived.supply_receive_id = data.supply_receive_id
                var newTotal = (receivedSupplyTotal + 1)
                setReceivedSupplyTotal(newTotal)

                if (supplyReceivedList.length < pageSize) {
                    setSupplyReceivedList([...supplyReceivedList, newSupplyReceived])
                }

                if (supplyReceivedList.length == pageSize) {
                    setReceivedSupplyCurrentPage(getTotalPage(newTotal))
                }

                message.success(" New Supply Received data has been added.")
            })


        } catch (error) {
            console.log(error);
            message.error("Error in database connection!!")
        }
    }

    const getTotalPage = (val) => {
        var total = val
        var page = 1
        while (total > pageSize) {
            total -= pageSize
            page++
        }
        console.log("val", val)
        console.log("page", page)
        return (page)
    }

    const updateSupplyReceived = async (values) => {
        try {
            const currentSupplyReceivedList = [...supplyReceivedList]
            var objIndex = currentSupplyReceivedList.findIndex((obj => obj.supply_receive_id == values.supply_receive_id));

            var stock_supply = currentSupply - currentSupplyReceivedList[objIndex].amount
            var new_receive_supply = values.amount
            const new_supply_amount = stock_supply + new_receive_supply
            setCurrentSupply(new_supply_amount)

            const request = await axios.post(
                '/api/supply/receive/update',
                { newSupplyReceived: values, barangay_id, new_supply_amount },
                generateToken()[1],
                { cancelToken }
            );

            currentSupplyReceivedList[objIndex] = values
            setSupplyReceivedList(currentSupplyReceivedList)
            message.success("Supply Received Table data has been updated.")

        } catch (error) {
            console.log(error)
            message.error("Error in database connection!!")
        }
    }

    const popSupplyReceived = async (supplyReceivedIDs) => {
        try {
            const currentSupplyReceivedList = [...supplyReceivedList]
            var objIndex = currentSupplyReceivedList.findIndex((obj => obj.supply_receive_id == supplyReceivedIDs));
            var remove_supply = currentSupplyReceivedList[objIndex].amount
            var new_supply_amount = currentSupply - remove_supply
            currentSupplyReceivedList.splice(objIndex, 1);

            await axios.post(
                '/api/supply/receive/delete',
                { supplyReceivedIDs, barangay_id, new_supply_amount },
                generateToken()[1],
                { cancelToken }
            )
            .then(() => {
                setCurrentSupply(new_supply_amount)
                setReceivedSupplyTotal(receivedSupplyTotal - 1)
                setSupplyReceivedList(currentSupplyReceivedList)
    
                if (supplyReceivedList.length == 1 && receivedSupplyTotal > 1) {
                    setGivenSupplyCurrentPage(receivedSupplyCurrentPage - 1)
                    // handleGivenPageChange()
                }

                message.success("Success, data has been deleted")
            })

        } catch (error) {
            console.log(error)
            message.error("Error in database connection!!")
        }
    }

    const deleteSuppliesReceived = () => {
        popSuppliesReceived(receivedSelectedRowKeys)
    }

    const popSuppliesReceived = async (supplyReceivedIDs) => {
        try {

            const currentSupplyReceivedList = [...supplyReceivedList]
            const length = currentSupplyReceivedList.length
            var deleteLength = supplyReceivedIDs.length
            var remove_supply = 0

            receivedSelectedRowKeys.map((row) => {
                var objIndex = currentSupplyReceivedList.findIndex((obj => obj.supply_receive_id == row));
                remove_supply += currentSupplyReceivedList[objIndex].amount
                currentSupplyReceivedList.splice(objIndex, 1);
            })

            var new_supply_amount = currentSupply - remove_supply

            await axios.post(
                '/api/supply/receive/delete',
                { supplyReceivedIDs, barangay_id, new_supply_amount },
                generateToken()[1],
                { cancelToken }
            )
            .then(() => {
                setCurrentSupply(new_supply_amount)
                setSupplyReceivedList(currentSupplyReceivedList)
                console.log("receivedSupplyTotal", receivedSupplyTotal)
                var newTotal = receivedSupplyTotal - deleteLength
                setReceivedSupplyTotal(newTotal)
                setReceivedSelectedRowKeys(0)

                if (length == deleteLength && receivedSupplyTotal > 1) {
                    var newPage = receivedSupplyCurrentPage
    
                    if (newPage == 1) {
                        getPage()
                    }

                    if (newPage > 1) {
                        setReceivedSupplyCurrentPage(newPage - 1)
                    }
                    
                }
    
                message.success("Success, data has been deleted")
            })


        } catch (error) {
            console.log(error)
            message.error("Error in database connection!!")
        }
    }

    //Table
    const SupplyReceivedColumns = [
        {
            title: "Source",
            dataIndex: "source",
            key: "source",
        },
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
            sorter: (a, b) => a.amount - b.amount,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            render: (_, data) => (
                <div className="d-flex align-items-center">
                    <span className="ml-2">
                        {new Date(data.date).toDateString().split(' ').slice(1).join(' ')}
                    </span>
                </div>
            ),
            sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix()
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, elm) => (
                <div className="text-right">
                    <EllipsisDropdown menu={dropdownMenuSupplyReceived(elm)} />
                </div>
            ),
        }
    ];

    //Modal
    const showReceiveModal = () => {
        setisReceivedModalVisible(true);
    };

    const handleReceiveModalOk = () => {
        SupplyReceivedFormRef.current.submit()
        // insert your code here...
    };

    const handleReceiveModalCancel = () => {
        setisReceivedModalVisible(false);
        setSupplyReceivedInitialVal({})
    };

    //Drawer
    const showReceiveDrawer = () => {
        setisReceivedDrawerVisible(true);
    }

    const onReceiveDrawerClose = () => {
        setisReceivedDrawerVisible(false);
        setSupplyReceivedInitialVal({})
    }

    const ReceiveDrawerFooter = () => {
        return (
            <Button
                type='primary'
                style={{ float: 'right' }}
                onClick={() => { handleReceiveModalOk() }}
            >
                Submit
            </Button>
        )
    };

    //Function for handling drawer and modal
    const handleReceivePopUp = (action) => {
        setFormAction(action)

        const screenWidth = window.innerWidth

        if (screenWidth > 480) {
            showReceiveModal()
        }

        if (screenWidth <= 480) {
            showReceiveDrawer()
        }
    }

    //Function for updateting and deleting Supply Receieved
    const editSupplyReceived = (row) => {
        setSupplyReceivedInitialVal({ 'source': row.source, 'amount': row.amount, 'date': row.date, supply_receive_id: row.supply_receive_id })
        handleReceivePopUp("edited")
    }

    const deleteSupplyReceived = (row) => {
        popSupplyReceived([row.supply_receive_id])
    }

    const dropdownMenuSupplyReceived = (row) => (
        <Menu>
            <Menu.Item key={1} onClick={() => { editSupplyReceived(row) }}>
                <EditOutlined />
                <span className="ml-2">Edit</span>
            </Menu.Item>
            <Menu.Item key={2} onClick={() => { deleteSupplyReceived(row) }}>
                <DeleteOutlined />
                <span className="ml-2" style={{ color: "black" }}>Delete</span>
            </Menu.Item>
            {receivedSelectedRowKeys.length > 0 &&
                <Menu.Item key={3} onClick={() => { deleteSuppliesReceived() }}>
                    <DeleteOutlined />
                    <span className="ml-2" style={{ color: "black" }}>Delete {`(${receivedSelectedRowKeys.length})`}</span>
                </Menu.Item>
            }
        </Menu>
    );

    //OnChange
    const onSelectReceivedSupplyChange = (selectedRowKeys, selectedRows) => {
        if (selectedRows.length > 0) {
            let supplyReceiveIDs = []

            selectedRows.map((row) => {
                supplyReceiveIDs.push(row.supply_receive_id)
            })

            console.log(supplyReceiveIDs);
            setReceivedSelectedRowKeys(supplyReceiveIDs)
            message.success(`Selected receive row ${selectedRows.length}`)

        }
    }

    const handleTableChange = (pagination, filters, sorter) => {
        var sorter = {
            field: sorter.field,
            order: sorter.order
        }

        if (sorter.order != null) {
            setTableScreen({sorter})
        }

        if (sorter.order == null) {
            setTableScreen({})
        }

    }

    const handleReceivedPageChange = async (page) => {

        if (page != null) {
            setReceivedSupplyCurrentPage(page)
        }
    }

    const handlePageSizeChange = (size) => {
        setSupplyReceivedList([])
        setPageSize(size)
    }

    //OnFinish
    const onFinishSupplyReceivedForm = (values) => {
        console.log(values);

        if (formAction == "added") {
            addSupplyReceived(values)
        }

        if (formAction == "edited") {
            updateSupplyReceived(values)
        }

        setisReceivedModalVisible(false)
        setisReceivedDrawerVisible(false)
        setSupplyReceivedInitialVal({})
    }

    const SupplyReceivedRowSelection = {
        receivedSelectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => { onSelectReceivedSupplyChange(selectedRowKeys, selectedRows) },
    };

    return (
        <>
            <Card>
                <Row justify='space-between'>
                    <Col>
                        <h1>Received Supply</h1>
                    </Col>

                    <Col>
                        <Button
                            type='primary'
                            onClick={() => handleReceivePopUp("added")}
                        >
                            <p style={{ color: "white" }}>Add Stock</p>
                        </Button>
                    </Col>
                </Row>

                <Table
                    columns={SupplyReceivedColumns}
                    dataSource={supplyReceivedList}
                    scroll={{ x: "max-content" }}
                    rowKey="supply_receive_id"
                    rowSelection={SupplyReceivedRowSelection}
                    pagination={{
                        total: receivedSupplyTotal,
                        pageSize: pageSize,
                        current: receivedSupplyCurrentPage,
                        showSizeChanger: true,
                        pageSizeOptions: [4, 10, 20, 50, 100],
                        onShowSizeChange: (current, size) => {
                            handlePageSizeChange(size)
                        },
                        onChange: (page) => handleReceivedPageChange(page)
                    }}

                    onChange={handleTableChange}
                    loading={receiveTableLoading}
                    bordered
                />
            </Card>

            <Modal title='Supply Received Information' visible={isReceivedModalVisible} onOk={handleReceiveModalOk}
                onCancel={handleReceiveModalCancel} okText={'Submit'} destroyOnClose={true}>

                {isReceivedModalVisible &&
                    <Form
                        name='supply_Received_form'
                        onFinish={onFinishSupplyReceivedForm}
                        ref={SupplyReceivedFormRef}
                        initialValues={supplyReceivedInitialVal}
                    >
                        <SupplyReceivedForm />
                    </Form>
                }

            </Modal>

            <Drawer title='Supply Received Information' placement='right' onClose={onReceiveDrawerClose}
                visible={isReceivedDrawerVisible} width={'100%'} height={'100%'} footer={ReceiveDrawerFooter()}>
                {isReceivedDrawerVisible &&
                    <Form
                        name='supply_received_form'
                        onFinish={onFinishSupplyReceivedForm}
                        ref={SupplyReceivedFormRef}
                        initialValues={supplyReceivedInitialVal}
                    >
                        <SupplyReceivedForm />
                    </Form>
                }
            </Drawer>
        </>
    )
}

export default ReceievedList


import React from 'react'
import { Button, Modal, Space, message } from 'antd'
import { ExclamationCircleOutlined, InfoCircleOutlined, CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import { success } from 'concurrently/src/defaults';

const { confirm } = Modal;

const ConfirmButton = (props) => {
  const { modalContent, modalTitle, text, handleOk, type, style, className, loading } = props
  const modalType = type.toLowerCase()

  const modalIconPicker = () => {
    if (modalType == "info") {
      return (<InfoCircleOutlined style={{color: "#047ad4"}} />)
    }

    if (modalType == "warning") {
      return (<ExclamationCircleOutlined />)
    }

    if (modalType == "success") {
      return (<CheckCircleOutlined style={{color: "green"}} />)
    }

    if (modalType == "error") {
      return (<CloseCircleOutlined style={{color: "red"}} />)
    }
  }

  const handleConfirmModal = () => {
    var showCancel = modalType != "warning"

    confirm({
      title: modalTitle,
      icon: modalIconPicker(),
      content: modalContent,
      cancelButtonProps: {hidden: showCancel},
      onOk() {
        handleOk()
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }

  return (
    <Button loading={loading} className={className} style={style} onClick={() => handleConfirmModal()}>{text}</Button>
  )
}

ConfirmButton.defaultProps = {
  modalTitle: "Do you want to continue your action??"
};

export default ConfirmButton
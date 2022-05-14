import React, { useState, useEffect, useRef, useContext } from "react";
import { Avatar, Divider, Input, Form, Button, Menu, message } from "antd";
import utils from "utils";
import {
  FileOutlined,
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined,
  AudioMutedOutlined,
  UserOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Scrollbars } from "react-custom-scrollbars";
import Flex from "components/shared-components/Flex";
import EllipsisDropdown from "components/shared-components/EllipsisDropdown";
import { AUTH_TOKEN } from "redux/constants/Auth";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

import { isValidURL } from "components/util-components/URL";
import Picker from "emoji-picker-react";

import { SocketContext } from "contexts/SocketContext";
import { ChatContext } from "contexts/ChatContext";

const Conversation = ({ match }) => {
  const socket = useContext(SocketContext);
  const { chatData, setChatData } = useContext(ChatContext);

  const { currentOrganization, generateToken } = useAuth();
  const authToken = localStorage.getItem(AUTH_TOKEN);
  const formRef = useRef(null);
  const chatBodyRef = useRef(null);

  const [info, setInfo] = useState({});
  const [msgList, setMsgList] = useState([]);

  const [avatar, setAvatar] = useState(null);

  const { _id } = match.params;

  useEffect(() => {
    // console.log("Conversation")
    getConversation(getConversationId());
  }, [chatData]);

  useEffect(() => {
    // console.log("Scroll")
    scrollToBottom();
  }, [msgList, chatData]);

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setShowPicker(false);
    const currentMsg = formRef.current.getFieldValue().newMsg;
    const newMsg = currentMsg + emojiObject.emoji;
    formRef.current.setFieldsValue({ newMsg: newMsg });
  };

  const goToLink = (url) => {
    window.open(url, "_blank");
  };

  const sendMessage = (conversationId, newMsgData) => {
    const newData = chatData.filter((elm) => elm._id === conversationId);
    const receiver_uuid = newData[0].receiver_uuid;

    newData[0].messages.push(newMsgData);

    var currentData = chatData.filter((elm) => elm._id !== conversationId);

    var finalValue = newData.concat(currentData);

    setChatData(finalValue);

    var values = {
      sender_uuid: authToken,
      content: newMsgData.content,
      conversation_id: conversationId,
    };

    socket.emit("chat:send-message", conversationId, receiver_uuid, newMsgData);

    // axios
    // .post("/api/chat/send-message", values, generateToken()[1])
    // .then((response) => {
    // if (response.data == "Success") {
    // // Do nothing for now
    // } else {
    // return message.error("Error, please try again.");
    // }
    // })
    // .catch((error) => {
    // console.log(error);
    // message.destroy();
    // message.error("The action can't be completed, please try again.");
    // });
  };

  const deleteChat = (currentId) => {
    console.log("delete");
  };

  const getConversationId = () => {
    const { _id } = match.params;
    return _id;
  };

  const getConversation = (currentId) => {
    if (chatData.length != 0) {
      const data = chatData.filter((elm) => elm._id === currentId);
      setInfo(data[0]);
      setMsgList(data[0].messages);
      setAvatar(data[0].my_avatar);
    }
  };

  const getMsgType = (obj) => {
    switch (obj.msgType) {
      case "text":
        return <span>{obj.content}</span>;
      case "link":
        return (
          <Flex alignItems="center" className="msg-file">
            <span
              className="ml-2 font-weight-semibold text-link pointer"
              onClick={() => goToLink(obj.content)}
            >
              <u>{obj.content}</u>
            </span>
          </Flex>
        );
      case "image":
        return <img src={obj.content} alt={obj.content} />;
      case "file":
        return (
          <Flex alignItems="center" className="msg-file">
            <FileOutlined className="font-size-md" />
            <span className="ml-2 font-weight-semibold text-link pointer">
              <u>{obj.content}</u>
            </span>
          </Flex>
        );
      default:
        return null;
    }
  };

  const scrollToBottom = () => {
    chatBodyRef.current.scrollToBottom();
  };

  const onSend = (values) => {
    if (values.newMsg) {
      var msgType = "text";

      if (isValidURL(values.newMsg)) {
        msgType = "link";
      }

      const newMsgData = {
        avatar: avatar,
        from: "me",
        msgType: msgType,
        content: values.newMsg,
        unread: false,
        time: "",
      };
      formRef.current.setFieldsValue({
        newMsg: "",
      });

      setMsgList([...msgList, newMsgData]);
      sendMessage(getConversationId(), newMsgData);
    }
  };

  const emptyClick = (e) => {
    setShowPicker(true);
    e.preventDefault();
  };

  const menu = () => (
    <Menu>
      <Menu.Item key="0">
        <UserOutlined />
        <span>User Info</span>
      </Menu.Item>
      <Menu.Item key="1">
        <AudioMutedOutlined />
        <span>Mute Chat</span>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={() => deleteChat(getConversationId())}>
        <DeleteOutlined />
        <span>Delete Chat</span>
      </Menu.Item>
    </Menu>
  );

  const chatContentHeader = (name) => {
    return (
      <div className="chat-content-header">
        <h4 className="mb-0">{name}</h4>
        <div>
          <EllipsisDropdown menu={menu} />
        </div>
      </div>
    );
  };

  const chatContentBody = (props, _id) => {
    return (
      <div className="chat-content-body">
        <Scrollbars ref={chatBodyRef} autoHide>
          {props.map((elm, i) => (
            <div
              key={`msg-${_id}-${i}`}
              className={`msg ${elm.msgType === "date" ? "datetime" : ""} ${
                elm.from === "opposite"
                  ? "msg-recipient"
                  : elm.from === "me"
                  ? "msg-sent"
                  : ""
              }`}
            >
              {
                elm.avatar && elm.from === "opposite" ? (
                  <div className="mr-2">
                    <Avatar
                      size={30}
                      className="font-size-sm"
                      src={elm.avatar}
                    ></Avatar>
                  </div>
                ) : null
                // <div className="mr-2">
                // <Avatar
                // size={30}
                // className="font-size-sm"
                // style={{ backgroundColor: "#111111" }}
                // >
                // {utils.getNameInitial("wow")}
                // </Avatar>
                // </div>
              }
              {elm.content ? (
                <div className={`bubble ${!elm.avatar ? "ml-5" : ""}`}>
                  <div className="bubble-wrapper">{getMsgType(elm)}</div>
                </div>
              ) : null}
              {elm.msgType === "date" ? <Divider>{elm.time}</Divider> : null}
            </div>
          ))}
        </Scrollbars>
      </div>
    );
  };

  const chatContentFooter = () => {
    return (
      <div className="chat-content-footer">
        <Form name="msgInput" ref={formRef} onFinish={onSend} className="w-100">
          <Form.Item name="newMsg" className="mb-0">
            <Input
              autoComplete="off"
              placeholder="Type a message..."
              suffix={
                <div className="d-flex align-items-center">
                  <a
                    href="/#"
                    className="mr-3 text-dark font-size-lg"
                    onClick={emptyClick}
                  >
                    <SmileOutlined />
                  </a>
                  <a
                    href="/#"
                    className="mr-3 text-dark font-size-lg"
                    onClick={emptyClick}
                  >
                    <PaperClipOutlined />
                  </a>
                  <Button
                    shape="circle"
                    type="primary"
                    size="small"
                    onClick={onSend}
                    htmlType="submit"
                  >
                    <SendOutlined />
                  </Button>
                </div>
              }
            />
          </Form.Item>
          {showPicker ? <Picker onEmojiClick={onEmojiClick} /> : null}
        </Form>
      </div>
    );
  };

  return (
    <div className="chat-content">
      {chatContentHeader(info.name)}
      {chatContentBody(msgList, _id)}
      {chatContentFooter()}
    </div>
  );
};

export default Conversation;

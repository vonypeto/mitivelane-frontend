import React, { useState, useEffect, useRef } from "react";
import { Avatar, Divider, Input, Form, Button, Menu, message } from 'antd';
import utils from "utils";
import {
	FileOutlined,
	SendOutlined,
	PaperClipOutlined,
	SmileOutlined,
	AudioMutedOutlined,
	UserOutlined,
	DeleteOutlined
} from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import Flex from 'components/shared-components/Flex';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { AUTH_TOKEN } from "redux/constants/Auth";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";

const Conversation = ({ match, chatData, setChatData }) => {
	const { currentBarangay, generateToken } = useAuth();
	const authToken = localStorage.getItem(AUTH_TOKEN);
	const formRef = useRef(null)
	const chatBodyRef = useRef(null)

	const [info, setInfo] = useState({})
	const [msgList, setMsgList] = useState([])

	const { _id } = match.params

	useEffect(() => {
		// console.log("Conversation")
		getConversation(getConversationId())
	}, [chatData])

	useEffect(() => {
		// console.log("Scroll")
		scrollToBottom()
	}, [msgList])

	const startConversation = (values) => {
		axios
			.post("/api/chat/start-conversation", values, generateToken()[1])
			.then((response) => {
				if (response.data == "Success") {
					return message.success(
						`Added new Blotter`
					);
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

	const sendMessage = (conversationId, newMsgData) => {
		const newData = chatData.filter(elm => elm._id === conversationId)
		newData[0].messages.push(newMsgData)
		
        var currentData = chatData.filter((elm) => elm._id !== conversationId)
		
		var finalValue = newData.concat(currentData)
			
		setChatData(finalValue)

		var values = {
			participants: ["62284d4700fd9e2d45af89cd", "62288194ad33a709728a68da"],
			sender_uuid: authToken,
			content: newMsgData.content,
			unread: false,
			conversation_id: conversationId
		}

		// startConversation(values)

		// axios
		// .post("/api/chat/send-message", values, generateToken()[1])
		// .then((response) => {
		// if (response.data == "Success") {
		// return message.success(
		// `Added new Blotter`
		// );
		// } else {
		// return message.error("Error, please try again.");
		// }
		// })
		// .catch((error) => {
		// console.log(error);
		// message.destroy();
		// message.error("The action can't be completed, please try again.");
		// });
	}

	const deleteChat = (currentId) => {
		console.log("delete")
	}

	const getConversationId = () => {
		const { _id } = match.params
		return _id
	}

	const getConversation = (currentId) => {
		if (chatData.length != 0) {
			const data = chatData.filter(elm => elm._id === currentId)
			setInfo(data[0])
			setMsgList(data[0].messages)

		}
	}

	const getMsgType = (obj) => {
		switch (obj.msgType) {
			case 'text':
				return <span>{obj.content}</span>
			case 'image':
				return <img src={obj.content} alt={obj.content} />
			case 'file':
				return (
					<Flex alignItems="center" className="msg-file">
						<FileOutlined className="font-size-md" />
						<span className="ml-2 font-weight-semibold text-link pointer">
							<u>{obj.content}</u>
						</span>
					</Flex>
				)
			default:
				return null;
		}
	}

	const scrollToBottom = () => {
		chatBodyRef.current.scrollToBottom()
	}

	const onSend = (values) => {
		if (values.newMsg) {
			const newMsgData = {
				avatar: "",
				from: "me",
				msgType: "text",
				content: values.newMsg,
				time: "",
			}
			formRef.current.setFieldsValue({
				newMsg: ''
			});

			setMsgList([...msgList, newMsgData])
			sendMessage(getConversationId(), newMsgData)

		}
	};

	const emptyClick = (e) => {
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
		)
	}

	const chatContentBody = (props, _id) => {
		return (
			<div className="chat-content-body">
				<Scrollbars ref={chatBodyRef} autoHide>
					{
						props.map((elm, i) => (
							<div
								key={`msg-${_id}-${i}`}
								className={`msg ${elm.msgType === 'date' ? 'datetime' : ''} ${elm.from === 'opposite' ? 'msg-recipient' : elm.from === 'me' ? 'msg-sent' : ''}`}
							>
								{
									elm.avatar ?
										<div className="mr-2">
											<Avatar size={30}
												className="font-size-sm" src={elm.avatar}></Avatar>
										</div>
										:
										null
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
								{
									elm.content ?
										<div className={`bubble ${!elm.avatar ? 'ml-5' : ''}`}>
											<div className="bubble-wrapper">
												{getMsgType(elm)}
											</div>
										</div>
										:
										null
								}
								{
									elm.msgType === 'date' ?
										<Divider>{elm.time}</Divider>
										:
										null
								}
							</div>
						))
					}
				</Scrollbars>
			</div>
		)
	}

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
									<a href="/#" className="text-dark font-size-lg mr-3" onClick={emptyClick}>
										<SmileOutlined />
									</a>
									<a href="/#" className="text-dark font-size-lg mr-3" onClick={emptyClick}>
										<PaperClipOutlined />
									</a>
									<Button shape="circle" type="primary" size="small" onClick={onSend} htmlType="submit">
										<SendOutlined />
									</Button>
								</div>
							}
						/>
					</Form.Item>
				</Form>
			</div>
		)
	}

	return (
		<div className="chat-content">
			{chatContentHeader(info.name)}
			{chatContentBody(msgList, _id)}
			{chatContentFooter()}
		</div>
	)

}


export default Conversation

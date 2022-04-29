import React, { useState, useEffect } from "react";
import { message } from "antd"
import ChatData from "assets/data/chat.data.json"
import InnerAppLayout from 'layouts/inner-app-layout';
import ChatContent from './ChatContent';
import ChatMenu from './ChatMenu';
import { withRouter } from "react-router-dom";
import { AUTH_TOKEN } from "redux/constants/Auth";
import axios from "axios";
import { useAuth } from "contexts/AuthContext";
import { socket } from "api/AppController/SocketController/SocketController"

var conversationData = []
var alreadyRun = false

const Chat = props => {
	const { currentBarangay, generateToken } = useAuth();
	const authToken = localStorage.getItem(AUTH_TOKEN);
	const [chatData, setChatData] = useState(conversationData)

	useEffect(() => {
		if (alreadyRun == false) {
			getConversations()
			alreadyRun = true
		}

	}, [])

	useEffect(() => {
		conversationData = chatData
	}, [chatData])
	
	useEffect(() => {
		socket.off("chat:receive-message").on("chat:receive-message", (conversationId, message) => {
			message.from = "opposite"
			console.log(message)
			const newData = conversationData.filter(elm => elm._id === conversationId)
			
			newData[0].messages.push(message)
		

			var currentData = conversationData.filter((elm) => elm._id !== conversationId)

			var finalValue = newData.concat(currentData)

			setChatData(finalValue)
	
		})

	}, [socket])
	
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

	const getConversations = () => {
		// setChatData(ChatData)

		axios
			.get("/api/chat/get-conversation/" + authToken, generateToken()[1])
			.then((response) => {
				console.log("Conversation in Index.js ", response.data)
				setChatData(response.data)
			})
			.catch(() => {
				message.error("Could not fetch the data in the server!");
			});
	}

	return (
		<div className="chat">
			<InnerAppLayout
				sideContent={<ChatMenu match={props.match} location={props.location} chatData={chatData} />}
				mainContent={<ChatContent {...props} chatData={chatData} setChatData={setChatData} />}
				sideContentWidth={450}
				sideContentGutter={false}
				border
			/>
		</div>
	)
}

export default withRouter(Chat)

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

var conversationData = []
var alreadyRun = false

const Chat = props => {
	const { currentBarangay, generateToken } = useAuth();
	const authToken = localStorage.getItem(AUTH_TOKEN);
	const [chatData, setChatData] = useState(conversationData)

	useEffect(() => {
		if(alreadyRun == false){
		  getConversations()
		  alreadyRun = true
		}

	}, [])
	
	useEffect(() => {
		conversationData = chatData
	}, [chatData])

	const getConversations = () => {
		// setChatData(ChatData)

		axios
			.get("/api/chat/get-conversation/" + authToken, generateToken()[1])
			.then((response) => {
				console.log("Conversation in Index.js")
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

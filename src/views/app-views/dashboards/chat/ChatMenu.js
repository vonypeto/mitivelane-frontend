import React, { useState, useEffect, useContext } from 'react'
import { Badge, Input, Avatar } from 'antd';
import utils from "utils";
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { COLOR_1 } from 'constants/ChartConstant';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";

import { ChatContext } from "contexts/ChatContext";

const ChatMenu = ({ match, location }) => {
	const { chatData } = useContext(ChatContext)
	
	const [list, setList] = useState([]);

	useEffect(() => {
		setList(chatData)

	}, [chatData])

	let history = useHistory();

	const openChat = _id => {
		const data = list.map(elm => {
			if (elm._id === _id) {
				elm.unread = 0
			}
			return elm
		})
		setList(data)
		history.push(`${match.url}/${_id}`)
	}

	const searchOnChange = e => {
		const query = e.target.value;
		const data = chatData.filter(item => {
			return query === '' ? item : item.name.toLowerCase().includes(query)
		})
		setList(data)
	}

	const _id = parseInt(location.pathname.match(/\/([^/]+)\/?$/)[1])

	return (
		<div className="chat-menu">
			<div className="chat-menu-toolbar">
				<Input
					placeholder="Search"
					onChange={searchOnChange}
					prefix={
						<SearchOutlined className="font-size-lg mr-2" />
					}
				/>
			</div>
			<div className="chat-menu-list">
				{
					list.map((item, i) => (
						<div
							key={`chat-item-${item._id}`}
							onClick={() => openChat(item._id)}
							className={`chat-menu-list-item ${i === (list.length - 1) ? 'last' : ''} ${item._id === _id ? 'selected' : ''}`}
						>


							<div className="d-flex align-items-center">
								{
									item.avatar ?
										<>
											<AvatarStatus src={item.avatar} name={item.name} subTitle={item.messages[item.messages.length - 1].content} />
										</>
										:
										<>
											<Avatar
												size={40}
												className="font-size-sm"
												style={{ backgroundColor: "#111111" }}
											>
												{utils.getNameInitial(item.name)}
											</Avatar>

											<div className="ml-2">
												<div className="avatar-status-name">{item.name}</div>
												<div className="text-muted avatar-status-subtitle">
													{(item.messages[item.messages.length - 1].content.length < 20) ? `${item.messages[item.messages.length - 1].content}`
														: `${item.messages[item.messages.length - 1].content.substring(0, 20)}...`}
												</div>
											</div>
										</>
								}
							</div>

							<div className="text-right">
								<div className="chat-menu-list-item-time">{item.time}</div>
								{item.unread === 0 ? <span></span> : <Badge count={item.unread} style={{ backgroundColor: COLOR_1 }} />}
							</div>
						</div>
					))
				}
			</div>
		</div>
	)
}

export default ChatMenu

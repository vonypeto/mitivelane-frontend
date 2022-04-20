import React from 'react'
import InnerAppLayout from 'layouts/inner-app-layout';
import ChatContent from './ChatContent';
import ChatMenu from './ChatMenu';
import { withRouter } from "react-router-dom";

const Chat = props => {
	return (
		<div className="chat">
			<InnerAppLayout 
				sideContent={<ChatMenu {...props}/>}
				mainContent={<ChatContent {...props}/>}
				sideContentWidth={450}
				sideContentGutter={false}
				border
			/>
		</div>
	)
}

export default withRouter(Chat)

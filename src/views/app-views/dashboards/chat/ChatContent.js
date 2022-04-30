import React, { useState, useEffect } from "react";
import { Route, Switch, } from 'react-router-dom';
import Conversation from './Conversation';

const ConversationEmpty = () => (
  <div className="chat-content-empty">
    <div className="text-center">
      <img src="/img/others/img-11.png" alt="Start a Conversation" />
      <h1 className="font-weight-light">Start a conversation</h1>
    </div>
  </div>
)

const ChatContent = ({ match, chatData, setChatData, socket}) => {
  const [conversation, setConversation] = useState([])

  useEffect(() => {
    setConversation(chatData)
  }, [chatData])

  return (
    <Switch>
      <Route path={`${match.url}/:_id`}
        render={result => <Conversation match={result.match} chatData={conversation} setChatData={setChatData} socket={socket}></Conversation>} />
      <Route path={`${match.url}`} component={ConversationEmpty} />
    </Switch>
  )
}

export default ChatContent

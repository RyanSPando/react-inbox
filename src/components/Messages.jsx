import React from 'react'
import Message from './Message'

const Messages = ({messages, starToggle, selectMessage}) =>
    <div>
        {messages.map((message, idx) => <Message key={idx} idx={idx} message={message} starToggle={starToggle} selectMessage={selectMessage}/>)}
    </div>

export default Messages
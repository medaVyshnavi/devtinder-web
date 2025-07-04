import React, { useEffect, useState } from 'react'
import { createSocketConnection } from '../utils/socket'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import  axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  
  const userDetails = useSelector(state => state.user)
  const userId = userDetails?.data?.id || userDetails?.id
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  
  useEffect(() => {
    if(!userId) return
    const socket = createSocketConnection();
    socket.emit("joinChat", { userId, targetUserId });

    socket.on("newMessage", ({ userId, newMessage }) => {
      setMessages([...messages, { text: newMessage, sender: userId }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId,messages]);

  useEffect(() => {
    if (userId && targetUserId) {
      handleFetchChatHistory();
    }
  }, [])
  
   const handleFetchChatHistory = async() => {
     const chatHistoryResponse = await axios.post(BASE_URL + "/chat/history",
       { userId: userId, targetUserId: targetUserId }, { withCredentials: true })
     setMessages(chatHistoryResponse.data.data.messages);
    }
  
  const handleSendMessage = () => {
    const socket = createSocketConnection();
    let firstName = userDetails?.data?.firstName || userDetails?.firstName
    socket.emit("sendMessage", {
      firstName: firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("")
  }

  return (
      <div className=" w-3/5 text-center m-auto border-1 p-4 h-full relative">
        <div className="font-bold text-2xl text-center mt-2 pb-1">Chat</div>
        <div className="h-[500px]">
          {messages?.map((message, index) => (
            <div
              className={`chat ${
                message.sender == userId ? "chat-end" : "chat-start"
              } `}
              key={index}
            >
              {console.log(message._id, userId)}
              <div className="chat-header">
                
                <time className="text-xs opacity-50"></time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50"></div>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center ">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full border border-white h-10"
          />
          <button
            onClick={() => handleSendMessage()}
            className="btn btn-secondary ml-4"
          >
            Send
          </button>
        </div>
      </div>
  );
}

export default Chat
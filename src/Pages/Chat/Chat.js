import React, { useState } from 'react';
import './Chat.css';
import { useAuth } from '../../Auth'
import Messages from './Components/Messages'
import ChatRooms from './Components/ChatRooms';
import { Spinner } from 'react-bootstrap'


const Chat = () => {
  const { auth } = useAuth()
  const [chatId, setChatId] = useState(null)
  const [chatFetched, setChatFetched] = useState(false)


  const goToRoom = async chatId => {
    setChatFetched(false)
    await setChatId(chatId)
    setChatFetched(true)

  }


  const renderMessageBox = () => {
    if (chatId) {
      return (
        <React.Fragment>
          {chatFetched ? <Messages userId={auth.user.uid} chatId={chatId} /> : <div className='profileSpinner'>
            <Spinner animation="border" role="status" variant="info" >
              <span ></span>
            </Spinner>
          </div>}
        </React.Fragment>
      )
    } else return (
      <div className='chatBox'>
        <div className='boxMessage'>
          Chat Rooms
      </div>
      </div>
    )
  }
  return (

    <div className="container my-5">
      <div className="messaging">
        <div className="inbox_msg">
          <ChatRooms goToRoom={goToRoom} chatId={chatId} userId={auth.user.uid} />
          {renderMessageBox()}
        </div>


      </div>
    </div>

  )



}
export default Chat



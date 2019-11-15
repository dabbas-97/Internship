import React, { Component } from 'react';
import { IoIosSend } from 'react-icons/io'
import Moment from 'react-moment';
import { Spinner } from 'react-bootstrap';
import { db } from '../../../Auth'

export default class Messages extends Component {
    state = { messages: [], myMessage: '' }

    unsubscribe = null;

    componentDidMount = async () => {
        const { chatId } = this.props
        if (chatId) {
            this.setState({ loading: true })
            this.unsubscribe = db.collection('chat').doc(chatId).collection('messages').orderBy('createdAt').onSnapshot(async snapshot => {
                const messages = await Promise.all(snapshot.docs.map(async doc => {
                    const userImg = await db.collection('users').doc(doc.data().userId).get().then(doc => doc.data().photoURL)
                    const userName = await db.collection('users').doc(doc.data().userId).get().then(doc => doc.data().name)
                    return {
                        ...doc.data(),
                        userImg, userName,
                        id: doc.id
                    }


                }))

                this.setState({ messages, loading: false })
                this.scrollToBottom();
            })
        }


    }
    componentWillUnmount = () => {
        this.unsubscribe()
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }



    componentDidUpdate() {
        this.scrollToBottom();
    }




    sendMessage = (e) => {
        e.preventDefault()
        const { myMessage } = this.state
        const { userId, chatId } = this.props
        db.collection('chat').doc(chatId).collection('messages').add({
            content: myMessage,
            userId: userId,
            createdAt: new Date()
        }).then(() => this.setState({ myMessage: '' }))

    }
    render() {

        const { messages, loading } = this.state
        const { userId } = this.props

        const displayMessages = messages.map(message => {


            if (message.userId === userId) {
                return (
                    <div className="outgoing_msg" key={message.id}>
                        <div className="sent_msg">
                            <p>
                                {message.content}
                            </p>
                            <span className="time_date">  <Moment fromNow>{message.createdAt.toDate()}</Moment></span> </div>
                    </div>
                )
            } else {



                return (
                    <div className="incoming_msg" key={message.id}>
                        <div className="incoming_msg_img"> <img src={message.userImg} alt="sunil" /> </div>
                        <div className="received_msg">
                            <div className="received_withd_msg">
                                <span className="time_date"> {message.userName} </span>
                                <p>
                                    {message.content}
                                </p>
                                <span className="time_date"> <Moment fromNow>{message.createdAt.toDate()}</Moment></span>
                            </div>
                        </div>
                    </div>
                )
            }


        })







        return (
            <div className="mesgs" >
                <div className="msg_history">
                    {loading ? <div className='chatSpinner'>
                        <Spinner animation="border" role="status" variant="info" >
                            <span ></span>
                        </Spinner>
                    </div> : displayMessages}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <div className="type_msg">
                    <div className="input_msg_write">
                        <form onSubmit={this.sendMessage}>
                            <input type="text" className="write_msg" placeholder="Type a message" value={this.state.myMessage} onChange={e => this.setState({ myMessage: e.target.value })} />
                            <button className="msg_send_btn" type="submit"><IoIosSend /></button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
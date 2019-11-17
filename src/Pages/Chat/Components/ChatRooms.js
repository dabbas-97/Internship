import React, { Component } from 'react';
import { db } from '../../../Auth';
import { Spinner } from 'react-bootstrap'
export default class ChatRooms extends Component {

    state = { chatRooms: [] };
    unsubscribe = null;

    componentDidMount = async () => {
        const { userId } = this.props
        const userType = await db.collection('users').doc(userId).get().then(doc => doc.data().type).catch(err => console.log(err.message))
        this.setState({ loading: true })
        this.unsubscribe = db.collection('chat').onSnapshot(async snapshot => {
            const chatRooms = await Promise.all(snapshot.docs.map(async doc => {
                const chatType = await doc.data().type
                if (chatType.includes(userType)) {
                    return {
                        ...doc.data(),
                        roomId: doc.id,
                    };
                }
            }));
            this.setState({ chatRooms: chatRooms.filter(room => room), loading: false });

        });
    };

    componentWillUnmount = () => {
        this.unsubscribe();
    };

    render() {

        const { chatRooms, loading } = this.state;
        const { chatId } = this.props;
        const renderRooms = chatRooms.map(room => {

            const goRoom = () => {
                if (room.roomId !== chatId) {
                    this.props.goToRoom(room.roomId)
                }

            }

            const activeRoom = () => {
                if (room.roomId === chatId)
                    return 'chat_list active_chat';
                else
                    return 'chat_list ';
            };
            return (
                <div className={activeRoom()} key={room.roomId} onClick={() => goRoom()}>
                    <div className="chat_people">
                        <div className="chat_img"> <img src={room.roomImgURL} alt='' /> </div>
                        <div className="chat_ib">
                            <h5>{room.roomName} </h5>
                            <p>{room.roomDescription}</p>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="inbox_people">
                <div className="headind_srch">
                    <div className="recent_heading">
                        <h4>Chat Rooms</h4>
                    </div>
                </div>

                <div className="inbox_chat">

                    {loading ? <div className='profileSpinner'>
                        <Spinner animation="border" role="status" variant="info" >
                            <span ></span>
                        </Spinner>
                    </div> : renderRooms}


                </div>
            </div>
        );
    }
}

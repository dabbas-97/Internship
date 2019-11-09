import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { db } from '../../../../../Auth';

const RejectModal = ({ studentId, closeJobModal, postId }) => {
    const [message, setMessage] = useState('')

    const submitReject = async e => {
        e.preventDefault();
        const response = await db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).get().then(doc => doc.data().response)
        if (!response) {
            db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).update({
                message: message,
                status: 'Rejected',
                response: true
            }).then(() => {
                window.alert('You Have Rejected The Student Successfully');
                closeJobModal()
            })
        } else { window.alert('You Have Already Responeded To This Post!'); closeJobModal() }

    };

    const handleChange = e => {
        setMessage(e.target.value)
    };

    return (
        <React.Fragment>
            <Modal show={true} onHide={closeJobModal}>

                <Modal.Header closeButton>
                    <Modal.Title>Reject Student</Modal.Title>
                </Modal.Header>

                <form onSubmit={submitReject}>
                    <ul className='list-group text-center cvul'>
                        <li className='list-group-item py-5 '>
                            <h6 className=' mt-1 h-6'> Message:</h6>

                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <textarea type='text' className=' form-control' onChange={handleChange} placeholder='The reason we rejected you is' required />
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-6'>
                                    <button type='button' className='btn w-100' onClick={closeJobModal}>Cancel</button>
                                </div>

                                <div className='col-6'>
                                    <button type='submit' className='btn w-100'>Send Message</button>
                                </div>

                            </div>
                        </li>
                    </ul>

                </form>
            </Modal>
        </React.Fragment>
    );

}
export default RejectModal
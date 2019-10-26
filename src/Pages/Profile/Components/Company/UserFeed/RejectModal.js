import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
export class RejectModal extends Component {
    state = { message: '' };
    render() {
        const submitReject = e => {
            e.preventDefault();
            //do backend stuff 
        };
        const handleChange = e => {
            this.setState({ message: e.target.value });
        };
        return (<React.Fragment>
            <Modal show={true} onHide={this.props.closeJobModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject Student</Modal.Title>
                </Modal.Header>

                <form onSubmit={submitReject}>
                    <ul className='list-group text-center cvul'>
                        <li className='list-group-item py-5 '>
                            <h6 className=' mt-1 h-6'>
                                Message:
              </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <textarea type='text' className=' form-control' onChange={handleChange} placeholder='The reason we rejected you is' required />
                                </div>
                            </div>
                            <div className='row'>
                                <div className='col-6'>
                                    <button type='button' className='btn w-100' onClick={this.props.closeJobModal}>Cancel</button>
                                </div>
                                <div className='col-6'>
                                    <button type='submit' className='btn w-100'>Send Message</button>
                                </div>

                            </div>
                        </li>
                    </ul>

                </form>
            </Modal>
        </React.Fragment>);
    }
}

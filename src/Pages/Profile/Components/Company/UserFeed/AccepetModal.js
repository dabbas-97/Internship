import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
export class AccepetModal extends Component {
    state = {
        message: '',
        location: '',
        contact: 'coco@yah.com',
        phone: '079555'
    };
    componentDidMount() {
        //get company location, email and phone 
    }
    render() {
        const submitAccept = e => {
            e.preventDefault();
            //do backend stuff 
        };
        const handleChange = input => e => {
            this.setState({ [input]: e.target.value });
        };
        return (<React.Fragment>
            <Modal show={true} onHide={this.props.closeJobModal} dialogClassName=''>
                <Modal.Header closeButton>
                    <Modal.Title className=' align-content-center'>Accept Student</Modal.Title>
                </Modal.Header>

                <form onSubmit={submitAccept}>
                    <ul className='list-group text-center cvul'>
                        <li className='list-group-item py-5 '>
                            <h6 className=' mt-1 h-6'>
                                Location
                            </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <input type='text' className=' form-control' defaultValue={this.state.location} onChange={handleChange('location')} required />
                                </div>
                            </div>
                            <h6 className=' mt-1 h-6'>
                                Contact Email
                            </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <input type='text' className=' form-control' defaultValue={this.state.contact} onChange={handleChange('contact')} required />
                                </div>
                            </div>
                            <h6 className=' mt-1 h-6'>
                                Phone Number
                            </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <input type='text' className=' form-control' defaultValue={this.state.phone} onChange={handleChange('phone')} required />
                                </div>
                            </div>
                            <h6 className=' mt-1 h-6'>
                                Message
                             </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <textarea type='text' className=' form-control' defaultValue={this.state.message} onChange={handleChange('message')} required />
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

import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { db, useAuth } from '../../../../../Auth';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Spinner } from 'react-bootstrap'

const InterviewModal = ({ studentId, closeJobModal, postId }) => {
    const { auth } = useAuth();
    const [message, setMessage] = useState('')
    const [interviewDate, setInterviewDate] = useState(new Date())
    const [validDate, setValidDate] = useState(true)
    const [companyInfoFetched, setCompanyInfoFetched] = useState(false)
    const [loading, setLoading] = useState(false)
    const [companyInfo, setCompanyInfo] = useState({
        location: '',
        contact: '',
        phone: ''
    })

    useEffect(() => {
        if (!companyInfoFetched) {
            setLoading(true)
            const fetch = async () => {
                const info = await db.collection('users').doc(auth.user.uid).get()
                    .then(doc => doc.data())
                    .catch(err => console.log(err.message))
                setCompanyInfo({
                    location: info.location,
                    phone: info.phone,
                    contact: auth.user.email
                })
                setCompanyInfoFetched(true)
                setLoading(false)
            }
            fetch()
        }
    }, [])

    const isDateValid = () => {
        if (validDate) return 'd-none'
        else return 'invalid-feedback'
    }

    const submitInterview = async e => {
        e.preventDefault();

        if (interviewDate > new Date()) {
            setValidDate(true)
            const interview = await db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).get().then(doc => doc.data().status === 'Interview')
            if (!interview) {
                db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).update({
                    contact: companyInfo.contact,
                    message: message,
                    interviewDate: interviewDate,
                    status: 'Interview',
                }).then(() => {
                    closeJobModal()
                })
            } else { window.alert('You Have Already Scheduled An Interview'); closeJobModal() }
        } else setValidDate(false)

    }
    const handleChange = input => e => {
        if (input === 'message') {
            setMessage(e.target.value)
        } else setCompanyInfo({ ...companyInfo, [input]: e.target.value });
    };


    return (
        <React.Fragment>
            <Modal show={true} onHide={closeJobModal} dialogClassName="modal-class">

                <Modal.Header closeButton>
                    <Modal.Title>Schedule An Interview</Modal.Title>
                </Modal.Header>

                {loading ? (<div className='profileSpinner'>
                    <Spinner animation="border" role="status" variant="info" >
                        <span ></span>
                    </Spinner>
                </div>) : (<form onSubmit={submitInterview}>

                    <ul className='list-group text-center cvul'>
                        <li className='list-group-item py-1 mt-1'>
                            <h6 className=' my-3 h-6'> Location </h6>
                            <div className='h5'> {companyInfo.location}</div>
                        </li>
                        <li className='list-group-item py-1 mt-1'>
                            <h6 className=' my-3 h-6'> Phone Number </h6>
                            <div className='h5'> {companyInfo.phone}</div>
                        </li>
                        <li className='list-group-item py-1 mt-1'>
                            <h6 className=' my-3 h-6'> Contact Email </h6>
                            <input type='text' className=' form-control' defaultValue={companyInfo.contact} onChange={handleChange('contact')} required />
                        </li>
                        <li className='list-group-item py-1 mt-1'>
                            <h6 className=' my-3 h-6'> Interview Date:</h6>
                            <DatePicker
                                selected={interviewDate}
                                onChange={date => setInterviewDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                inline
                                readOnly
                            />
                            <div className={isDateValid()}>Please enter a valid date.</div>
                        </li>
                        <li className='list-group-item py-1 mt-1'>
                            <h6 className=' my-3 h-6'> Interview Description:</h6>
                            <textarea type='text' className=' form-control' onChange={handleChange('message')} placeholder='Details about the interview.' required />
                        </li>
                        <li className=' list-group-item  mb-4'>
                            <div className='row'>
                                <div className='col-6'>
                                    <button type='button' className='btn w-100' onClick={closeJobModal}>Cancel</button>
                                </div>

                                <div className='col-6'>
                                    <button type='submit' className='btn w-100'>Submit</button>
                                </div>

                            </div>
                        </li>
                    </ul>

                </form>)}
            </Modal>
        </React.Fragment>
    );

}
export default InterviewModal
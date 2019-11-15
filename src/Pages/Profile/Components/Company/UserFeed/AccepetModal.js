import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { db, useAuth } from '../../../../../Auth';

const AccepetModal = ({ studentId, closeJobModal, postId }) => {
    const { auth } = useAuth();
    const [companyInfo, setCompanyInfo] = useState({
        location: '',
        contact: '',
        phone: ''
    })
    const [message, setMessage] = useState('')
    const [companyInfoFetched, setCompanyInfoFetched] = useState(false)


    useEffect(() => {
        if (!companyInfoFetched) {
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
            }
            fetch()
        }
    }, [])


    const submitAccept = async e => {
        e.preventDefault();
        const response = await db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).get().then(doc => doc.data().response)
        if (!response) {
            db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).update({
                contact: companyInfo.contact,
                message: message,
                status: 'Accepted',
                response: true
            }).then(() => {
                closeJobModal()
            })
        } else { window.alert('You Have Already Responeded To This Post!'); closeJobModal() }

    };

    const handleChange = input => e => {
        if (input === 'message') {
            setMessage(e.target.value)
        } else setCompanyInfo({ ...companyInfo, [input]: e.target.value });
    };
    return (
        <React.Fragment>
            <Modal show={true} onHide={closeJobModal} dialogClassName=''>
                <Modal.Header closeButton>
                    <Modal.Title className=' align-content-center'>Accept Student</Modal.Title>
                </Modal.Header>

                <form onSubmit={submitAccept}>
                    <ul className='list-group text-center cvul'>
                        <li className='list-group-item py-5 '>

                            <h6 className=' mt-1 h-6'> Location </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    {companyInfo.location}
                                </div>
                            </div>

                            <h6 className=' mt-1 h-6'> Phone Number </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    {companyInfo.phone}
                                </div>
                            </div>

                            <h6 className=' mt-1 h-6'> Contact Email </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <input type='text' className=' form-control' defaultValue={companyInfo.contact} onChange={handleChange('contact')} required />
                                </div>
                            </div>

                            <h6 className=' mt-1 h-6'> Message </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <textarea type='text' className=' form-control' defaultValue={message} onChange={handleChange('message')} required />
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
export default AccepetModal
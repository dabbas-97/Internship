import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { db, useAuth } from '../../../../../Auth';
import { Spinner } from 'react-bootstrap'

const AccepetModal = ({ studentId, closeJobModal, postId }) => {
    const { auth } = useAuth();
    const [companyInfo, setCompanyInfo] = useState({
        location: '',
        contact: '',
        phone: ''
    })
    const [message, setMessage] = useState('')
    const [companyInfoFetched, setCompanyInfoFetched] = useState(false)
    const [loading, setLoading] = useState(false)


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


    const submitAccept = async e => {
        e.preventDefault();
        const response = await db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).get().then(doc => doc.data().response)
        if (!response) {
            db.collection('users').doc(studentId).collection('postsAppliedFor').doc(postId).update({
                contact: companyInfo.contact,
                message: message,
                status: 'Accepted',
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
            <Modal show={true} onHide={closeJobModal} dialogClassName="modal-class">
                <Modal.Header closeButton>
                    <Modal.Title className=' align-content-center'>Accept Student</Modal.Title>
                </Modal.Header>

                {loading ? (<div className='profileSpinner'>
                    <Spinner animation="border" role="status" variant="info" >
                        <span ></span>
                    </Spinner>
                </div>) : (<form onSubmit={submitAccept}>
                    <ul className='list-group text-center cvul'>
                        <li className='list-group-item py-1 mt-1 '>

                            <h6 className=' my-3 h-6'> Location </h6>
                            <div className='h5'>
                                {companyInfo.location}
                            </div>
                        </li>

                        <li className='list-group-item py-1 mt-1'>
                            <h6 className=' my-3 h-6'> Phone Number </h6>
                            <div className='h5'>
                                {companyInfo.phone}
                            </div>
                        </li>

                        <li className='list-group-item py-1 mt-1'>
                            <h6 className=' my-3 h-6'> Contact Email </h6>
                            <input type='text' className=' form-control' defaultValue={companyInfo.contact} onChange={handleChange('contact')} required />
                        </li>
                        <li className='list-group-item py-1 mt-1'>
                            <h6 className=' my-3 h-6'> Message </h6>
                            <textarea type='text' className=' form-control' defaultValue={message} onChange={handleChange('message')} required />
                        </li>
                        <li className='list-group-item mb-4'>
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
                </form>)}
            </Modal>
        </React.Fragment>
    );

}
export default AccepetModal
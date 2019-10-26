import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { FiPercent } from 'react-icons/fi';
import { MdHelp } from 'react-icons/md';
import { IoMdBriefcase, IoMdMale, IoMdFemale } from 'react-icons/io';
import { FaLaptopCode } from 'react-icons/fa';
export class EditPostForm extends Component {
    state = {
        jobdesc: '',
        jobtitle: '',
        gpa: 'Good Or Higher',
        gender: 'Male',
        specialty: '',
    };
    componentDidMount() {
        const { values } = this.props;
        this.setState({
            id: values.id,
            jobdesc: values.jobdesc,
            jobtitle: values.jobtitle,
            gpa: values.gpa,
            gender: values.gender,
            specialty: values.specialty
        });
    }
    handleChange = input => e => {
        this.setState({ [input]: e.target.value });
    };
    render() {
        const handleClose = () => {
            this.props.clearPostInfo();
        };
        const genderIcon = () => {
            if (this.state.gender === 'Male')
                return <IoMdMale />;
            else if (this.state.gender === 'Female')
                return <IoMdFemale />;
            else
                return (<React.Fragment>
                    <IoMdFemale /> , <IoMdMale />
                </React.Fragment>);
        };
        return (<React.Fragment>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Post</Modal.Title>
                </Modal.Header>

                <form onSubmit={this.props.submitEditedPost(this.state)}>
                    <ul className='list-group text-center cvul'>
                        <li className='list-group-item py-2 '>
                            <h6 className=' mt-1 h-6'>
                                <span>
                                    <IoMdBriefcase />
                                </span>
                                Job Title
                            </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <input type='text' className=' form-control' onChange={this.handleChange('jobtitle')} placeholder='Full Stack Developer' defaultValue={this.state.jobtitle} required />
                                </div>
                            </div>
                        </li>
                        <li className='list-group-item py-2 '>
                            <h6 className=' mt-1 h-6'>
                                <span>
                                    <MdHelp />
                                </span>
                                Job Description
                             </h6>
                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <input type='text' className=' form-control' onChange={this.handleChange('jobdesc')} placeholder='Describe the jobs nature' defaultValue={this.state.jobdesc} required />
                                </div>
                            </div>
                        </li>
                        <li className='list-group-item py-2 '>
                            <h6 className=' mt-1 h-6'>
                                <span>{genderIcon()}</span>
                                Gender
                                                  </h6>

                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <select name='socialStatus' className='mx-1 custom-select w-50 ' onChange={this.handleChange('gender')} value={this.state.gender}>
                                        <option value='Male'>Male</option>
                                        <option value='Female'>Female</option>
                                        <option value='Any Gender'>Any Gender</option>
                                    </select>
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item py-2 '>
                            <h6 className=' mt-1 h-6'>
                                <span>
                                    <FiPercent />
                                </span>
                                GPA
                </h6>

                            <div className='form-row my-3'>
                                <div className='col-12'>
                                    <select name='gpa' className=' custom-select w-50' onChange={this.handleChange('gpa')} value={this.state.gpa}>
                                        <option value='Excellent'>Excellent</option>
                                        <option value='Very Good Or Higher'>
                                            Very Good Or Higher
                      </option>
                                        <option value='Good Or Higher'>Good Or Higher</option>
                                        <option value='Pass Or Higher'>Pass Or Higher</option>
                                        <option value='Weak Or Higher'>Weak Or Higher</option>
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li className='list-group-item py-2 '>
                            <h6 className=' mt-1 h-6'>
                                <span>
                                    <FaLaptopCode />
                                </span>
                                Specialty
                </h6>

                            <div className='form-row'>
                                <div className='col-12'>
                                    <select name='specialty' className='mx-1 custom-select w-50 ' onChange={this.handleChange('specialty')} value={this.state.specialty}>
                                        <option value='IOS Developer'>IOS Developer</option>
                                        <option value='Node JS Developer'>Node JS Developer</option>
                                        <option value='Android Developer'>Android Developer</option>
                                        <option value='Java Developer'>Java Developer</option>
                                        <option value='Python Developer'>Python Developer</option>
                                        <option value='Linux Developer'>Linux Developer</option>
                                        <option value='Unity Developer'>Unity Developer</option>
                                        <option value='Angular Developer'>Angular Developer</option>
                                        <option value='PHP Developer'>PHP Developer</option>
                                        <option value='React JS Developer'>React JS Developer</option>
                                        <option value='Wordpress Developer'>Wordpress Developer</option>
                                        <option value='Javascript Developer'>Javascript Developer</option>
                                        <option value='HTML5 Developer'>HTML5 Developer</option>
                                        <option value='Database Developer'>Database Developer</option>
                                        <option value='.NET Developer'>.NET Developer</option>
                                        <option value='Larvel Developer'>Larvel Developer</option>
                                        <option value='Larvel Developer'>Windows Applications Developer</option>
                                        <option value='Larvel Developer'>Swift Developer</option>
                                        <option value='Larvel Developer'>Web Developer</option>
                                    </select>
                                </div>
                            </div>
                        </li>
                        <li className='list-group-item py-2 '>
                            <button className='btn m-3 px-3 py-2' type='submit'>
                                Save Changes
                </button>
                        </li>
                    </ul>
                </form>
            </Modal>
        </React.Fragment>);
    }
}

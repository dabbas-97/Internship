import React, { Component } from 'react';
import { MdLocationOn, MdSchool, MdClose, MdCheck } from 'react-icons/md';
import { IoLogoApple, IoMdMale, IoMdFemale } from 'react-icons/io';
import { FaAndroid, FaJava, FaPython, FaLinux, FaDatabase, FaUserGraduate, FaSchool, FaCode, FaUniversity, FaBirthdayCake, FaHeart, FaPhone } from 'react-icons/fa';
import { FiPercent } from 'react-icons/fi';
import { DiUnitySmall, DiAngularSimple, DiPhp, DiReact, DiLaravel, DiWordpress, DiJavascript1, DiDotnet, DiHtml5, DiWindows, DiSwift, DiCodeBadge, DiNodejsSmall } from 'react-icons/di';
import RejectModal from '../RejectModal';
import AccepetModal from '../AccepetModal';
export class StudentsApplies extends Component {
    state = {
        reject: '',
        accept: ''
    };
    closeJobModal = () => {
        this.setState({ accept: '', reject: '' });
    };
    handleModal = (type, studentId) => {
        if (type === 'accept')
            this.setState({ accept: studentId });
        else
            this.setState({ reject: studentId });
    };
    render() {
        const showModal = () => {
            if (this.state.accept) {
                return <AccepetModal closeJobModal={this.closeJobModal} studentId={this.state.accept} postId={this.props.postId} />;
            }
            else if (this.state.reject)
                return (<RejectModal closeJobModal={this.closeJobModal} studentId={this.state.reject} postId={this.props.postId} />);
        };
        const { studentsApplied } = this.props;
        if (!studentsApplied) {
            return (
                <div className='appliedFor m-4  col  '>
                    <h6 className='text-muted'>
                        No Students have applied to any of your Internship posts.
                     </h6>
                </div>
            );
        }
        const info = studentsApplied.map(data => {
            const renderSpecialties = data.studentSpecialities.map(specialty => {
                const jobIcon = () => {
                    switch (specialty) {
                        case 'IOS Developer': return <IoLogoApple />
                        case 'Node JS Developer': return <DiNodejsSmall />
                        case 'Android Developer': return <FaAndroid />
                        case 'Java Developer': return <FaJava />
                        case 'Python Developer': return <FaPython />
                        case 'Linux Developer': return <FaLinux />
                        case 'Unity Developer': return <DiUnitySmall />
                        case 'Angular Developer': return <DiAngularSimple />
                        case 'PHP Developer': return <DiPhp />
                        case 'React JS Developer': return <DiReact />
                        case 'Wordpress Developer': return <DiWordpress />
                        case 'Javascript Developer': return <DiJavascript1 />
                        case 'HTML5 Developer': return <DiHtml5 />
                        case 'Database Developer': return <FaDatabase />
                        case '.NET Developer': return <DiDotnet />
                        case 'Larvel Developer': return <DiLaravel />
                        case 'Windows Applications Developer': return <DiWindows />
                        case 'Swift Developer': return <DiSwift />
                        case 'Web Developer': return <DiCodeBadge />
                        default: break;
                    }

                };
                return (
                    <div className='row' key={Math.random()}>
                        <div className='col my-1'>
                            <span className='job'>{jobIcon()}</span>
                            {specialty}
                        </div>
                    </div>
                );
            });
            const genderIcon = () => {
                if (data.studentGender === 'Female')
                    return <span className='job pink'><IoMdFemale /></span>;
                else
                    return <span className='job blue'><IoMdMale /></span>;
            };
            const renderGpa = () => {
                switch (data.studentGpa) {
                    case '3.5': return 'Exccelent'
                    case '3.0': return 'Very Good'
                    case '2.5': return 'Good'
                    case '2.0': return 'Pass'
                    case '1.5': return 'Weak'
                    default: break;
                }
            }
            const buttons = () => {
                if (data.status === 'Accepted') {
                    return (
                        <div className='text-center mx-1 '>
                            <button type='button' className='btn acceptedBtnDisabled w-100' >
                                Accepted <MdCheck />
                            </button>
                        </div>
                    )
                } else if (data.status === 'Rejected') {
                    return (
                        <div className='text-center mx-1 '>
                            <button type='button' className='btn rejectedBtnDisabled w-100' >
                                Rejected <MdClose />
                            </button>
                        </div>
                    )
                } else {
                    return (
                        <div className='form-inline justify-content-center my-1'>
                            <div className='text-center mx-1 '>
                                <button type='button' className='btn rejectedbtn' onClick={() => this.handleModal('reject', data.studentId)}>
                                    Reject <MdClose />
                                </button>
                            </div>
                            <div className='text-center mx-1 '>
                                <button type='button' className='btn acceptedbtn' onClick={() => this.handleModal('accept', data.studentId)}>
                                    Accept <MdCheck />
                                </button>
                            </div>
                        </div>
                    )
                }
            }
            return (
                <div className='col-md-6' key={data.studentId}>
                    <div className='card '>
                        <img src={data.studentPhoto} className='card-img-top' alt={data.studentName} />

                        <ul className='list-group list-group-flush text-center'>
                            <li className='list-group-item applied '>
                                <span className='job' style={{ color: '#585858' }}><FaUserGraduate /> </span>
                                {data.studentName}
                            </li>

                            <li className='list-group-item applied '>
                                {genderIcon()}
                                {data.studentGender}
                            </li>

                            <li className='list-group-item applied '>
                                <span className='job' style={{ color: '#FBC02D' }}><MdLocationOn /> </span>
                                {data.studentHometown}
                            </li>

                            <li className='list-group-item applied '>
                                <span className='job' style={{ color: '#FF9800' }}><FaBirthdayCake /> </span>
                                {data.studentBirthday}
                            </li>
                            <li className='list-group-item applied '>
                                <span className='job red'><FaHeart /> </span>
                                {data.studentSocial}
                            </li>
                            <li className='list-group-item applied '>
                                <span className='job green'><FaPhone /> </span>
                                {data.studentPhone}
                            </li>

                            <li className='list-group-item applied togglerLi ' data-toggle='collapse' href={'#education' + data.studentId} role='button' aria-expanded='false'>
                                <div className='row '>
                                    <div className='col'>
                                        <span className='job'><FaSchool /> </span>
                                        Education
                                    </div>
                                </div>
                            </li>

                            <li className='list-group-item applied collapse' id={'education' + data.studentId}>
                                <div className='row my-1'>
                                    <div className='col'>
                                        <span className='job'> <FaUniversity /> </span>
                                        {data.studentSchool}
                                    </div>
                                </div>

                                <div className='row my-1'>
                                    <div className='col'>
                                        <span className='job'> <MdSchool /> </span>
                                        {data.studentField}
                                    </div>
                                </div>

                                <div className='row my-1'>
                                    <div className='col'>
                                        <span className='job'> <FiPercent /> </span>
                                        {renderGpa()}
                                    </div>
                                </div>

                            </li>

                            <li className='list-group-item applied togglerLi ' data-toggle='collapse' href={'#specialties' + data.studentId} role='button' aria-expanded='false'>
                                <div className='row '>
                                    <div className='col'>
                                        <span className='job'> <FaCode />  </span>
                                        Specialties
                                </div>
                                </div>
                            </li>

                            <li className='list-group-item applied collapse' id={'specialties' + data.studentId}>
                                {renderSpecialties}
                            </li>

                            <li className='list-group-item applied '>
                                {buttons()}
                            </li>
                        </ul>
                    </div>
                    {showModal()}
                </div>);
        });
        return <React.Fragment>{info}</React.Fragment>;
    }
}

import React, { Component } from 'react';
import { MdLocationOn, MdSchool, MdClose, MdCheck } from 'react-icons/md';
import { IoLogoApple, IoMdMale, IoMdFemale } from 'react-icons/io';
import { FaAndroid, FaJava, FaPython, FaLinux, FaDatabase, FaUserGraduate, FaSchool, FaCode, FaUniversity, FaBirthdayCake, FaHeart, FaPhone } from 'react-icons/fa';
import { FiPercent } from 'react-icons/fi';
import { DiUnitySmall, DiAngularSimple, DiPhp, DiReact, DiLaravel, DiWordpress, DiJavascript1, DiDotnet, DiHtml5, DiWindows, DiSwift, DiCodeBadge, DiNodejsSmall } from 'react-icons/di';
import { RejectModal } from '../RejectModal';
import { AccepetModal } from '../AccepetModal';
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
                return <AccepetModal closeJobModal={this.closeJobModal} studentId={this.state.accept} />;
            }
            else if (this.state.reject)
                return (<RejectModal closeJobModal={this.closeJobModal} studentId={this.state.reject} />);
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
                    if (specialty === 'IOS Developer')
                        return <IoLogoApple />;
                    else if (specialty === 'Node JS Developer')
                        return <DiNodejsSmall />;
                    else if (specialty === 'Android Developer')
                        return <FaAndroid />;
                    else if (specialty === 'Java Developer')
                        return <FaJava />;
                    else if (specialty === 'Python Developer')
                        return <FaPython />;
                    else if (specialty === 'Linux Developer')
                        return <FaLinux />;
                    else if (specialty === 'Unity Developer')
                        return <DiUnitySmall />;
                    else if (specialty === 'Angular Developer')
                        return <DiAngularSimple />;
                    else if (specialty === 'PHP Developer')
                        return <DiPhp />;
                    else if (specialty === 'React JS Developer')
                        return <DiReact />;
                    else if (specialty === 'Wordpress Developer')
                        return <DiWordpress />;
                    else if (specialty === 'Javascript Developer')
                        return <DiJavascript1 />;
                    else if (specialty === 'HTML5 Developer')
                        return <DiHtml5 />;
                    else if (specialty === 'Database Developer')
                        return <FaDatabase />;
                    else if (specialty === '.NET Developer')
                        return <DiDotnet />;
                    else if (specialty === 'Larvel Developer')
                        return <DiLaravel />;
                    else if (specialty === 'Windows Applications Developer')
                        return <DiWindows />;
                    else if (specialty === 'Swift Developer')
                        return <DiSwift />;
                    else if (specialty === 'Web Developer')
                        return <DiCodeBadge />;
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
                    return <IoMdFemale />;
                else
                    return <IoMdMale />;
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
            return (
                <div className='col-md-6' key={data.studentId}>
                    <div className='card '>
                        <img src={data.studentPhoto} className='card-img-top' alt={data.studentName} />

                        <ul className='list-group list-group-flush text-center'>
                            <li className='list-group-item applied '>
                                <span className='job'><FaUserGraduate /> </span>
                                {data.studentName}
                            </li>

                            <li className='list-group-item applied '>
                                <span className='job'>{genderIcon()}</span>
                                {data.studentGender}
                            </li>

                            <li className='list-group-item applied '>
                                <span className='job'><MdLocationOn /> </span>
                                {data.studentHometown}
                            </li>

                            <li className='list-group-item applied '>
                                <span className='job'><FaBirthdayCake /> </span>
                                {data.studentBirthday}
                            </li>
                            <li className='list-group-item applied '>
                                <span className='job'><FaHeart /> </span>
                                {data.studentSocial}
                            </li>
                            <li className='list-group-item applied '>
                                <span className='job'><FaPhone /> </span>
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
                            </li>
                        </ul>
                    </div>
                    {showModal()}
                </div>);
        });
        return <React.Fragment>{info}</React.Fragment>;
    }
}

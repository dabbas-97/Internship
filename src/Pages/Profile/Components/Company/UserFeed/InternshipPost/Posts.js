import React from 'react';
import { FaAndroid, FaJava, FaPython, FaLinux, FaUserGraduate, FaDatabase, FaInfo } from 'react-icons/fa'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
import { IoMdBriefcase, IoIosMale, IoIosFemale, IoLogoApple } from 'react-icons/io'
import { FiPercent, FiUsers } from 'react-icons/fi'
import { DiNodejsSmall, DiUnitySmall, DiAngularSimple, DiPhp, DiReact, DiWordpress, DiJavascript1, DiHtml5, DiDotnet, DiLaravel, DiWindows, DiSwift, DiCodeBadge } from 'react-icons/di'


export function Posts(props) {
    const { myPosts } = props;
    const returnGender = (gender) => {
        if (Array.isArray(gender)) {
            if (gender.length === 2) return 'Both'
            return gender[0]
        } else return gender
    }
    const gpaRenderer = (gpa) => {
        switch (gpa) {
            case '1.5': return 'Weak Or Higher'
            case '2.0': return 'Pass Or Higher'
            case '2.5': return 'Good Or Higher'
            case '3.0': return 'Very Good Or Higher'
            case '3.5': return 'Exccelent'
            default:
                break;
        }
    }
    if (!myPosts) {
        return (<div className='appliedFor m-4  col  '>
            <h6 className='text-muted'>
                You don't have any Internship posts.
        </h6>
        </div>);
    }
    const genderIcon = (gender) => {
        const newGender = returnGender(gender)
        switch (newGender) {
            case 'Both': return <FiUsers />
            case 'Female': return <IoIosFemale />
            case 'Male': return <IoIosMale />
            default: break;
        }
    }
    const jobIcon = (specialty) => {
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
    const info = myPosts.map(data => {

        return (
            <div className='col-md-6 companyPosts ' key={data.id}>
                <div className='card '>

                    <ul className='list-group list-group-flush text-center'>

                        <li className='list-group-item applied '>
                            <div className='row'>
                                <div className='col-2'>
                                    <span className='job'><IoMdBriefcase /></span>
                                </div>
                                <div className='col-10'>
                                    {data.jobtitle}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied togglerLi ' data-toggle='collapse' href={'#jobdesc' + data.id} role='button' aria-expanded='false'>
                            <div className='row '>
                                <div className='col-2'>
                                    <span className='job'><FaInfo /></span>
                                </div>
                                <div className='col-10'>
                                    Job Description
                                </div>
                            </div>
                        </li>
                        <li className='list-group-item applied collapse ' id={'jobdesc' + data.id} >



                            {data.jobdesc}


                        </li>

                        <li className='list-group-item applied '>
                            <div className='row '>
                                <div className='col-2'>
                                    <span className='job'> <FiPercent /> </span>
                                </div>
                                <div className='col-10'>
                                    {gpaRenderer(data.gpa)}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied '>
                            <div className='row '>
                                <div className='col-2'>
                                    <span className='job'> {genderIcon(data.gender)}</span>

                                </div>
                                <div className='col-10'>
                                    {returnGender(data.gender)}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied'>
                            <div className='row '>
                                <div className='col-2'>
                                    <span className='job'> {jobIcon(data.specialty)}</span>
                                </div>
                                <div className='col-10'>
                                    {data.specialty}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied'>
                            <div className='row'>

                                <div className='col-6'>
                                    <button className=' w-100 btn' onClick={() => { props.handleDeletePosts(data.id); props.getStudentsApplied(null); props.resetPages() }}> <MdDeleteForever /></button>
                                </div>

                                <div className='col-6'>
                                    <button className='w-100 btn' onClick={() =>
                                        props.handleEditPosts({
                                            id: data.id,
                                            jobdesc: data.jobdesc,
                                            jobtitle: data.jobtitle,
                                            gpa: data.gpa,
                                            gender: returnGender(data.gender),
                                            specialty: data.specialty
                                        })}>
                                        <MdModeEdit />
                                    </button>
                                </div>

                            </div>
                        </li>

                        <li className='list-group-item applied'>
                            <div className='row'>
                                <div className='col'>
                                    <button className=' w-100 btn coolbtn' onClick={() => props.getStudentsApplied(data.id)}><FaUserGraduate /></button>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>
        );
    });
    return <React.Fragment>{info}</React.Fragment>;
}

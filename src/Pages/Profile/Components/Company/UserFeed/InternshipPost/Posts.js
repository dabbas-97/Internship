import React from 'react';
import { FaUserGraduate } from 'react-icons/fa'
import { MdDeleteForever, MdModeEdit } from 'react-icons/md'
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

    const info = myPosts.map(data => {

        return (
            <div className='col-md-6 companyPosts ' key={data.id}>
                <div className='card '>

                    <ul className='list-group list-group-flush text-center'>

                        <li className='list-group-item applied '>
                            <div className='row'>
                                <div className='col-4'>
                                    <span className=' float-left text-center'> Job Title: </span>
                                </div>
                                <div className='col-8'>
                                    {data.jobtitle}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied '>
                            <div className='row '>
                                <div className='col-4'>
                                    <span className='float-left text-center'> Description: </span>
                                </div>
                                <div className='col-8'>
                                    {data.jobdesc}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied '>
                            <div className='row '>
                                <div className='col-4'>
                                    <span className='float-left'>GPA: </span>
                                </div>
                                <div className='col-8'>
                                    {gpaRenderer(data.gpa)}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied '>
                            <div className='row '>
                                <div className='col-4'>
                                    <span className='float-left'>Gender:</span>
                                </div>
                                <div className='col-8'>
                                    {returnGender(data.gender)}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied'>
                            <div className='row '>
                                <div className='col-4'>
                                    <span className='float-left'> Specialty: </span>
                                </div>
                                <div className='col-8'>
                                    {data.specialty}
                                </div>
                            </div>
                        </li>

                        <li className='list-group-item applied'>
                            <div className='row'>

                                <div className='col-6'>
                                    <button className=' w-100 btn' onClick={() => { props.handleDeletePosts(data.id); props.getStudentsApplied(null) }}> <MdDeleteForever /></button>
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

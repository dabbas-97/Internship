import React from 'react';
import { useAuth, db } from '../../../Auth'
import Moment from 'react-moment';
import { MdAccessTime } from 'react-icons/md'

export function CompaniesPosts(props) {
    const { posts } = props;
    const { auth } = useAuth()
    if (!posts) {
        return (<div className='appliedFor m-4  col  '>
            <h6 className='text-muted'>There are no posts for this specialty</h6>
        </div>);
    }


    const apply = async (post) => {
        const applied = await db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').doc(post.postId).get()
            .then(doc => doc.exists)
            .catch(err => console.log(err.message))
        if (applied) {
            window.alert('You Have Already Applied To This Post!')
        } else {
            db.collection('users').doc(auth.user.uid).collection('postsAppliedFor').doc(post.postId).set({
                companyId: post.companyId,
                postId: post.postId,
                message: '',
                contact: '',
                status: '',
                response: false
            })
                .then(() => {
                    return db.collection('internships').doc(post.companyId).collection('companyPosts').doc(post.postId).collection('studentsApplied').doc(auth.user.uid).set({
                        studentId: auth.user.uid,
                    })
                })
                .then(() => window.alert('You Have Successfully Applied To This Post!'))
                .catch(err => console.log(err.message))

        }

    }


    const specialtyPosts = posts.map(post => {
        return (
            <div className='col-md-3 col-sm-6 ' key={post.postId}>
                <div className='card companyPost'>
                    <ul className='list-group list-group-flush text-center'>
                        <li className='list-group-item applied companyName '>
                            {post.companyName}
                        </li>
                        <li className='list-group-item applied '>
                            {post.jobtitle}
                        </li>
                        <li className='list-group-item togglerLi ' data-toggle='collapse' href={'#description' + post.postId} role='button'>
                            Job Description
                        </li>
                        <li className='list-group-item applied collapse' id={'description' + post.postId}>
                            {post.jobdesc}
                        </li>
                        <li className='list-group-item applied '>
                            {post.applied ?
                                <button type='button' className='btn disabled' >Successfully Applied!</button> :
                                <button type='button' className='btn' onClick={() => apply(post)}>Apply Now</button>}
                        </li>
                        <li className='list-group-item createdAt '>
                            <div className='row'>
                                <div className='col-4'>
                                    <MdAccessTime />
                                </div>
                                <div className='col-8 zeroPadding'>
                                    <Moment fromNow>{post.createdAt}</Moment>
                                </div>
                            </div>


                        </li>
                    </ul>
                </div>
            </div>
        );
    });
    return (
        <React.Fragment>
            {specialtyPosts}
        </React.Fragment>
    );
}

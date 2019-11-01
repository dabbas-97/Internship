import React from 'react';
export function CompaniesPosts(props) {
    const { posts } = props;
    if (!posts) {
        return (<div className='appliedFor m-4  col  '>
            <h6 className='text-muted'>There are no posts for this specialty</h6>
        </div>);
    }
    const specialtyPosts = posts.map(post => {
        return (
            <div className='col-md-3 col-sm-6 ' key={post.postId}>
                <div className='card companyPost'>
                    <ul className='list-group list-group-flush text-center'>
                        <li className='list-group-item applied '>
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
                            <button type='button' className='btn'>Apply Now</button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    });
    return (<React.Fragment>{specialtyPosts}</React.Fragment>);
}

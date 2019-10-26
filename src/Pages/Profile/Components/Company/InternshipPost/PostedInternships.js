import React, { Component } from 'react';
import Buttons from '../../../../Buttons';
import { Posts } from './Posts';
export class PostedInternships extends Component {
    state = {
        pages: 0
    };
    pageRenderer() {
        const { posts } = this.props;
        let i, j, pages = [], chunk = 2;
        for (i = 0, j = posts.length; i < j; i += chunk) {
            pages.push(posts.slice(i, i + chunk));
        }
        return pages;
    }
    render() {
        const myPosts = this.pageRenderer();
        const nextPage = () => {
            let { pages } = this.state;
            if (pages < myPosts.length - 1)
                this.setState({ pages: pages + 1 });
        };
        const prevPage = () => {
            let { pages } = this.state;
            if (pages > 0)
                this.setState({ pages: pages - 1 });
        };
        const showButtons = () => {
            if (myPosts.length > 1)
                return (<Buttons prevPage={prevPage} nextPage={nextPage} pages={this.state.pages} maxPages={myPosts.length - 1} />);
        };
        const internshipsPostsReturner = () => {
            //to put all my posts into chunks of x numbers 
            return (<div className=' m-5'>
                <div className='row'>
                    <Posts myPosts={myPosts[this.state.pages]} handleDeletePosts={this.props.handleDeletePosts} handleEditPosts={this.props.handleEditPosts} />
                </div>
                {showButtons()}
            </div>);
        };
        return (<div className='my-2 internshipsPosting'>
            <div className='m-3 '>
                <h5 className='h5'>Your internships posts</h5>
                {internshipsPostsReturner()}
            </div>
        </div>);
    }
}

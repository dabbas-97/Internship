import React, { Component } from 'react';
import { EditPostForm } from './EditPostForm';
import { PostedInternships } from './PostedInternships';
import { InternshipsPoster } from './InternshipsPoster';

//------------

export default class InternshipsPost extends Component {
  state = {
    step: 1,
    jobdesc: '',
    jobtitle: '',
    gpa: 'Good Or Higher',
    gender: 'Male', //[Male,Female,Any Gender]
    specialty: 'IOS Developer',
    posts: [],
    postEdit: ''
  };


  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };


  handlePost = e => {
    //we take submited data and push it into posts array in the state. to show evenutally in the posted internships section.
    e.preventDefault();
    const { gpa, gender, specialty, jobtitle, jobdesc } = this.state;
    let internshipsData = {
      id: Math.round(Math.random() * 10000),
      jobtitle: jobtitle,
      jobdesc: jobdesc,
      gpa: gpa,
      gender: gender,
      specialty: specialty
    };
    this.setState(state => ({
      posts: [...state.posts, internshipsData]
    }));

    this.setState({
      specialty: 'IOS Developer',
      step: 1,
      jobdesc: '',
      jobtitle: '',
      gpa: 'Good Or Higher',
      gender: 'Male'
    });
  };
  handleDeletePosts = id => {
    const { posts } = this.state;
    this.setState({
      posts: posts.filter(post => post.id !== id)
    });
  };
  clearPostInfo = () => {
    this.setState({ postEdit: '' });
  };
  submitEditedPost = newData => e => {
    e.preventDefault();
    let editedPost = {
      id: newData.id,
      jobtitle: newData.jobtitle,
      jobdesc: newData.jobdesc,
      gpa: newData.gpa,
      gender: newData.gender,
      specialty: newData.specialty
    };
    let posts = [...this.state.posts];
    const index = posts.findIndex(post => post.id === newData.id);
    posts.splice(index, 1);
    posts.splice(index, 0, editedPost);
    this.setState({ posts: posts, postEdit: '' });
  };
  editModal = () => {
    if (this.state.postEdit)
      return (
        <EditPostForm
          values={this.state.postEdit}
          clearPostInfo={this.clearPostInfo}
          submitEditedPost={this.submitEditedPost}
        />
      );
  };
  handleEditPosts = postEdit => {
    this.setState({ postEdit });
  };

  render() {
    const { gender, gpa, jobtitle, jobdesc, step, specialty } = this.state;
    const values = { jobtitle, jobdesc, gender, gpa, specialty };
    return (
      <React.Fragment>
        <InternshipsPoster
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={values}
          handlePost={this.handlePost}
          step={step}
        />
        <PostedInternships
          posts={this.state.posts}
          handleDeletePosts={this.handleDeletePosts}
          handleEditPosts={this.handleEditPosts}
          getStudentsWhoApplied={this.props.getStudentsWhoApplied}
        />
        {this.editModal()}
      </React.Fragment>
    );
  }
}



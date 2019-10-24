import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import Buttons from '../../../Buttons';
//icons import

import { FiPercent } from 'react-icons/fi';
import { MdHelp } from 'react-icons/md';
import {
  IoMdBriefcase,
  IoMdMale,
  IoMdFemale
} from 'react-icons/io';
import {

  FaLaptopCode,

} from 'react-icons/fa';

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

class InternshipsPoster extends Component {
  render() {
    const formReturner = () => {
      if (this.props.step === 1)
        return (
          <div className='m-3 '>
            <h5 className='h5'>Create an internship post</h5>
            <button className='btn m-4 px-5 py-2' onClick={this.props.nextStep}>
              Create an internship
            </button>
          </div>
        );
      else if (this.props.step === 2)
        return (
          <InternshipsCreateForm
            values={this.props.values}
            handleChange={this.props.handleChange}
            handlePost={this.props.handlePost}
          />
        );
    };
    return (
      <div className='internshipsPosting my-2'>
        <React.Fragment> {formReturner()} </React.Fragment>
      </div>
    );
  }
}
class InternshipsCreateForm extends Component {
  render() {
    const { values } = this.props;
    const genderIcon = () => {
      if (values.gender === 'Male') return <IoMdMale />;
      else if (values.gender === 'Female') return <IoMdFemale />;
      else
        return (
          <React.Fragment>
            <IoMdFemale /> , <IoMdMale />
          </React.Fragment>
        );
    };

    return (
      <React.Fragment>
        <form onSubmit={this.props.handlePost}>
          <ul className='list-group text-center cvul'>
            <li className='list-group-item py-2 fill'>
              <h5 className='h-5 text-center '>
                Fill Out Internship Vacancy Info
              </h5>
            </li>
            <li className='list-group-item py-2 '>
              <h6 className=' mt-1 h-6'>
                <span>
                  <IoMdBriefcase />
                </span>
                Job Title
              </h6>
              <div className='form-row my-3'>
                <div className='col-12'>
                  <input
                    type='text'
                    className=' form-control'
                    onChange={this.props.handleChange('jobtitle')}
                    placeholder='Full Stack Developer'
                    defaultValue={values.jobtitle}
                    required
                  />
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
                  <textarea
                    className=' form-control'
                    onChange={this.props.handleChange('jobdesc')}
                    placeholder='Describe the jobs nature'
                    defaultValue={values.jobdesc}
                    required
                  />
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
                  <select
                    name='socialStatus'
                    className='mx-1 custom-select w-50 '
                    onChange={this.props.handleChange('gender')}
                    value={values.gender}
                  >
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
                  <select
                    name='gpa'
                    className=' custom-select w-50'
                    onChange={this.props.handleChange('gpa')}
                    value={values.gpa}
                  >
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
                  <select
                    name='specialty'
                    className='mx-1 custom-select w-50 '
                    onChange={this.props.handleChange('specialty')}
                    value={values.specialty}
                  >
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
                Post Internship
              </button>
            </li>
          </ul>
        </form>
      </React.Fragment>
    );
  }
}

class PostedInternships extends Component {
  state = {
    pages: 0
  };

  pageRenderer() {
    const { posts } = this.props;
    let i,
      j,
      pages = [],
      chunk = 2;
    for (i = 0, j = posts.length; i < j; i += chunk) {
      pages.push(posts.slice(i, i + chunk));
    }
    return pages;
  }

  render() {
    const myPosts = this.pageRenderer();
    const nextPage = () => {
      let { pages } = this.state;
      if (pages < myPosts.length - 1) this.setState({ pages: pages + 1 });
    };
    const prevPage = () => {
      let { pages } = this.state;
      if (pages > 0) this.setState({ pages: pages - 1 });
    };
    const showButtons = () => {
      if (myPosts.length > 1)
        return (
          <Buttons
            prevPage={prevPage}
            nextPage={nextPage}
            pages={this.state.pages}
            maxPages={myPosts.length - 1}
          />
        );
    };

    const internshipsPostsReturner = () => {
      //to put all my posts into chunks of x numbers 
      return (
        <div className=' m-5'>
          <div className='row'>
            <Posts
              myPosts={myPosts[this.state.pages]}
              handleDeletePosts={this.props.handleDeletePosts}
              handleEditPosts={this.props.handleEditPosts}
            />
          </div>
          {showButtons()}
        </div>
      );
    };
    return (
      <div className='my-2 internshipsPosting'>
        <div className='m-3 '>
          <h5 className='h5'>Your internships posts</h5>
          {internshipsPostsReturner()}
        </div>
      </div>
    );
  }
}
function Posts(props) {
  const { myPosts } = props;
  if (!myPosts) {
    return (
      <div className='appliedFor m-4  col  '>
        <h6 className='text-muted'>
          You don't have any Internship posts.
        </h6>
      </div>
    );
  }
  const info = myPosts.map(data => {

    //onclick={this.props.getStudentsWhoApplied(data.id)}
    return (
      <div className='col-md-6 companyPosts ' key={data.id}>
        <div className='card '>
          <ul className='list-group list-group-flush text-center'>
            <li className='list-group-item applied '>
              <div className='row'>
                <div className='col-4'>
                  <span className=' float-left text-center'>
                    Job Title:
              </span></div>
                <div className='col-8'>
                  {data.jobtitle}
                </div></div>
            </li>
            <li className='list-group-item applied '>
              <div className='row '>
                <div className='col-4'>
                  <span className='float-left text-center'>
                    Description:
                  </span></div>
                <div className='col-8'>
                  {data.jobdesc}
                </div>
              </div>
            </li>

            <li className='list-group-item applied '>
              <div className='row '>
                <div className='col-4'>
                  <span className='float-left'>GPA:
              </span></div>
                <div className='col-8'>
                  {data.gpa}
                </div>
              </div>
            </li>
            <li className='list-group-item applied '>
              <div className='row '>
                <div className='col-4'>
                  <span className='float-left'>Gender:</span></div>
                <div className='col-8'>
                  {data.gender}
                </div>
              </div>
            </li>
            <li className='list-group-item applied'>
              <div className='row '>
                <div className='col-4'>
                  <span className='float-left'>
                    Specialty:
                  </span>
                </div>
                <div className='col-8'>
                  {data.specialty}
                </div>
              </div>
            </li>
            <li className='list-group-item applied'>
              <div className='row'>
                <div className='col-6'>
                  <button
                    className=' w-100 btn'
                    onClick={() => props.handleDeletePosts(data.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className='col-6'>
                  <button
                    className='w-100 btn'
                    onClick={() =>
                      props.handleEditPosts({
                        id: data.id,
                        jobdesc: data.jobdesc,
                        jobtitle: data.jobtitle,
                        gpa: data.gpa,
                        gender: data.gender, //[Male,Female,Any Gender]
                        specialty: data.specialty
                      })
                    }
                  >
                    Edit
                  </button>
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


class EditPostForm extends Component {
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
      if (this.state.gender === 'Male') return <IoMdMale />;
      else if (this.state.gender === 'Female') return <IoMdFemale />;
      else
        return (
          <React.Fragment>
            <IoMdFemale /> , <IoMdMale />
          </React.Fragment>
        );
    };
    return (
      <React.Fragment>
        <Modal show={true} onHide={handleClose} >
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
                    <input
                      type='text'
                      className=' form-control'
                      onChange={this.handleChange('jobtitle')}
                      placeholder='Full Stack Developer'
                      defaultValue={this.state.jobtitle}
                      required
                    />
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
                    <input
                      type='text'
                      className=' form-control'
                      onChange={this.handleChange('jobdesc')}
                      placeholder='Describe the jobs nature'
                      defaultValue={this.state.jobdesc}
                      required
                    />
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
                    <select
                      name='socialStatus'
                      className='mx-1 custom-select w-50 '
                      onChange={this.handleChange('gender')}
                      value={this.state.gender}
                    >
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
                    <select
                      name='gpa'
                      className=' custom-select w-50'
                      onChange={this.handleChange('gpa')}
                      value={this.state.gpa}
                    >
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
                    <select
                      name='specialty'
                      className='mx-1 custom-select w-50 '
                      onChange={this.handleChange('specialty')}
                      value={this.state.specialty}
                    >
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
      </React.Fragment>
    );
  }
}

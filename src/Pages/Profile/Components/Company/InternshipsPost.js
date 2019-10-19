import React, { Component } from 'react';
import jsonData from '../../suggestions.json';
import { Modal } from 'react-bootstrap';
//icons import
import { GoPerson } from 'react-icons/go';
import { FiPercent } from 'react-icons/fi';
import { MdHelp } from 'react-icons/md';
import {
  IoMdBriefcase,
  IoLogoApple,
  IoIosArrowForward,
  IoIosArrowBack,
  IoMdMale,
  IoMdFemale
} from 'react-icons/io';
import {
  FaAndroid,
  FaJava,
  FaPython,
  FaLinux,
  FaDatabase,
  FaLaptopCode,
  FaCode
} from 'react-icons/fa';
import {
  DiUnitySmall,
  DiAngularSimple,
  DiPhp,
  DiReact,
  DiLaravel,
  DiWordpress,
  DiJavascript1,
  DiDotnet,
  DiHtml5,
  DiWindows,
  DiSwift,
  DiCodeBadge
} from 'react-icons/di';
//------------
import { WithContext as ReactTags } from 'react-tag-input';
const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
const loadData = () => JSON.parse(JSON.stringify(jsonData));
export default class InternshipsPost extends Component {
  state = {
    step: 1,
    jobdesc: '',
    jobtitle: '',
    gpa: 'Good Or Higher',
    gender: 'Male', //[Male,Female,Any Gender]
    tags: [],
    suggestions: [],
    posts: [],
    postEdit: ''
  };
  componentDidMount() {
    let suggestions = loadData();
    this.setState({ suggestions: suggestions });
  }

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };
  nextStep = () => {
    this.setState({ step: this.state.step + 1 });
  };

  //------------------------------------------------Input module stuff-------------------------------------
  handleDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };

  handleAddition = tag => {
    if (this.state.suggestions.find(x => x === tag)) {
      this.setState(state => ({ tags: [...state.tags, tag] }));
    }
  };

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  };
  //------------------------------------------------------------------------------------
  handlePost = e => {
    //we take submited data and push it into posts array in the state. to show evenutally in the posted internships section.
    e.preventDefault();
    const { gpa, gender, tags, jobtitle, jobdesc } = this.state;
    const specialties = tags.map(tag => tag.id);
    let internshipsData = {
      id: Math.round(Math.random() * 10000),
      jobtitle: jobtitle,
      jobdesc: jobdesc,
      gpa: gpa,
      gender: gender,
      specialties: specialties
    };
    this.setState(state => ({
      posts: [...state.posts, internshipsData]
    }));
    while (tags.length > 0) {
      tags.pop();
    }
    this.setState({
      tags: tags,
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
    const specialties = newData.tags.map(tag => tag.id);
    let editedPost = {
      id: newData.id,
      jobtitle: newData.jobtitle,
      jobdesc: newData.jobdesc,
      gpa: newData.gpa,
      gender: newData.gender,
      specialties: specialties
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
    const { gender, gpa, jobtitle, jobdesc, step } = this.state;
    const values = { jobtitle, jobdesc, gender, gpa };
    return (
      <React.Fragment>
        <InternshipsPoster
          nextStep={this.nextStep}
          handleChange={this.handleChange}
          values={values}
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleDelete={this.handleDelete}
          handleAddition={this.handleAddition}
          handleDrag={this.handleDrag}
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
            tags={this.props.tags}
            suggestions={this.props.suggestions}
            handleDelete={this.props.handleDelete}
            handleAddition={this.props.handleAddition}
            handleDrag={this.props.handleDrag}
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
                  <ReactTags
                    inputFieldPosition='top'
                    tags={this.props.tags}
                    suggestions={this.props.suggestions}
                    handleDelete={this.props.handleDelete}
                    handleAddition={this.props.handleAddition}
                    handleDrag={this.props.handleDrag}
                    delimiters={delimiters}
                    minQueryLength={1}
                    renderSuggestion={({ text }) => (
                      <div style={{}}>{text}</div>
                    )}
                    placeholder={'Java, PHP, etc.'}
                    autocomplete={1}
                    classNames={{
                      tags: 'tagsClass',
                      tagInput: 'tagInputClass',
                      tagInputField: 'tagInputFieldClass',
                      selected: 'selectedClass',
                      tag: 'tagClass',
                      remove: 'removeClass',
                      suggestions: 'suggestionsClass',
                      activeSuggestion: 'activeSuggestionClass'
                    }}
                  />
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
      //to put all my posts into chunks of x number
      if (!myPosts) {
        return (
          <div className='appliedFor m-4 '>
            <h6 className='text-muted'>You haven't posted any internships.</h6>
          </div>
        );
      } else
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
          No Students have applied to any of your Internship posts.
        </h6>
      </div>
    );
  }
  const info = myPosts.map(data => {
    const renderSpecialties = data.specialties.map(specialty => {
      const jobIcon = () => {
        if (specialty === 'IOS Developer') return <IoLogoApple />;
        else if (specialty === 'IOS Developer') return <IoLogoApple />;
        else if (specialty === 'Android Developer') return <FaAndroid />;
        else if (specialty === 'Java Developer') return <FaJava />;
        else if (specialty === 'Python Developer') return <FaPython />;
        else if (specialty === 'Linux Developer') return <FaLinux />;
        else if (specialty === 'Unity Developer') return <DiUnitySmall />;
        else if (specialty === 'Angular Developer') return <DiAngularSimple />;
        else if (specialty === 'PHP Developer') return <DiPhp />;
        else if (specialty === 'React JS Developer') return <DiReact />;
        else if (specialty === 'Wordpress Developer') return <DiWordpress />;
        else if (specialty === 'Javascript Developer') return <DiJavascript1 />;
        else if (specialty === 'HTML5 Developer') return <DiHtml5 />;
        else if (specialty === 'Database Developer') return <FaDatabase />;
        else if (specialty === '.NET Developer') return <DiDotnet />;
        else if (specialty === 'Larvel Developer') return <DiLaravel />;
        else if (specialty === 'Windows Applications Developer')
          return <DiWindows />;
        else if (specialty === 'Swift Developer') return <DiSwift />;
        else if (specialty === 'Web Developer') return <DiCodeBadge />;
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
      if (data.gender === 'Female') return <IoMdFemale />;
      else if (data.gender === 'Male') return <IoMdMale />;
      else
        return (
          <React.Fragment>
            <GoPerson />
          </React.Fragment>
        );
    };
    //onclick={this.props.getStudentsWhoApplied(data.id)}
    return (
      <div className='col-md-6' key={data.id}>
        <div className='card '>
          <ul className='list-group list-group-flush text-center'>
            <li className='list-group-item applied '>
              <span className='job'>
                <IoMdBriefcase />
              </span>
              {data.jobtitle}
            </li>
            <li
              className='list-group-item applied togglerLi '
              data-toggle='collapse'
              href={'#jobdesc' + data.id}
              role='button'
              aria-expanded='false'
            >
              <div className='row '>
                <div className='col'>
                  <span className='job'>
                    <MdHelp />
                  </span>
                  Job Description
                </div>
              </div>
            </li>
            <li
              className='list-group-item applied collapse'
              id={'jobdesc' + data.id}
            >
              {data.jobdesc}
            </li>
            <li className='list-group-item applied '>
              <span className='job'>
                <FiPercent />
              </span>
              {data.gpa}
            </li>
            <li className='list-group-item applied '>
              <span className='job'>{genderIcon()}</span>
              {data.gender}
            </li>
            <li
              className='list-group-item applied togglerLi '
              data-toggle='collapse'
              href={'#specialties' + data.id}
              role='button'
              aria-expanded='false'
            >
              <div className='row '>
                <div className='col'>
                  <span className='job'>
                    <FaCode />
                  </span>
                  Specialties
                </div>
              </div>
            </li>
            <li
              className='list-group-item applied collapse'
              id={'specialties' + data.id}
            >
              {renderSpecialties}
            </li>
            <li className='list-group-item applied'>
              <div className='row'>
                <div className='col-6'>
                  <button
                    className='rejected w-100 btn'
                    onClick={() => props.handleDeletePosts(data.id)}
                  >
                    Delete
                  </button>
                </div>
                <div className='col-6'>
                  <button
                    className='w-100 btn'
                    data-target='#exampleModal'
                    onClick={() =>
                      props.handleEditPosts({
                        id: data.id,
                        jobdesc: data.jobdesc,
                        jobtitle: data.jobtitle,
                        gpa: data.gpa,
                        gender: data.gender, //[Male,Female,Any Gender]
                        tags: data.specialties.map(tag => {
                          let newTag = { id: tag, text: tag };
                          return newTag;
                        })
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

function Buttons(props) {
  if (props.pages === 0)
    return (
      <div className='row'>
        <div className='form-inline offset-6 col-6 my-1 '>
          <div className='text-center m-4 '>
            <button type='button' className='btn' onClick={props.nextPage}>
              Next <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    );
  else if (props.pages === props.maxPages)
    return (
      <div className='row'>
        <div className='form-inline justify-content-end col-6 my-1'>
          <div className='text-center m-4 '>
            <button type='button' className='btn' onClick={props.prevPage}>
              <IoIosArrowBack /> Back
            </button>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className='row'>
        <div className='form-inline justify-content-end col-6 my-1'>
          <div className='text-center m-4 '>
            <button type='button' className='btn' onClick={props.prevPage}>
              <IoIosArrowBack /> Back
            </button>
          </div>
        </div>
        <div className='form-inline col-6 my-1 '>
          <div className='text-center m-4 '>
            <button type='button' className='btn' onClick={props.nextPage}>
              Next <IoIosArrowForward />
            </button>
          </div>
        </div>
      </div>
    );
}
class EditPostForm extends Component {
  state = {
    jobdesc: '',
    jobtitle: '',
    gpa: 'Good Or Higher',
    gender: 'Male',
    tags: [],
    suggestions: []
  };

  handleDelete = i => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };

  handleAddition = tag => {
    if (this.state.suggestions.find(x => x === tag)) {
      this.setState(state => ({ tags: [...state.tags, tag] }));
    }
  };

  handleDrag = (tag, currPos, newPos) => {
    const tags = [...this.state.tags];
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    this.setState({ tags: newTags });
  };

  componentDidMount() {
    let suggestions = loadData();
    const { values } = this.props;
    this.setState({
      id: values.id,
      suggestions: suggestions,
      jobdesc: values.jobdesc,
      jobtitle: values.jobtitle,
      gpa: values.gpa,
      gender: values.gender,
      tags: values.tags
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
                    <ReactTags
                      inputFieldPosition='top'
                      tags={this.state.tags}
                      suggestions={this.state.suggestions}
                      handleDelete={this.handleDelete}
                      handleAddition={this.handleAddition}
                      handleDrag={this.handleDrag}
                      delimiters={delimiters}
                      minQueryLength={1}
                      renderSuggestion={({ text }) => (
                        <div style={{}}>{text}</div>
                      )}
                      placeholder={'Java, PHP, etc.'}
                      autocomplete={1}
                      classNames={{
                        tags: 'tagsClass',
                        tagInput: 'tagInputClass',
                        tagInputField: 'tagInputFieldClass',
                        selected: 'selectedClass',
                        tag: 'tagClass',
                        remove: 'removeClass',
                        suggestions: 'suggestionsClass',
                        activeSuggestion: 'activeSuggestionClass'
                      }}
                    />
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
        </Modal>
      </React.Fragment>
    );
  }
}

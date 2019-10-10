import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

export default class StudentCV extends Component {
  state = {
    step: 1,
    isCV: true,
    socialStatus: 'Single',
    education: {
      school: 'Hashemite University',
      field: 'Computer Science'
    },
    gpa: 'Good',
    tags: [
      { id: 'IOS Developer', text: 'IOS Developer' },
      { id: 'Python Developer', text: 'Python Developer' }
    ],
    suggestions: [
      { id: 'IOS Developer', text: 'IOS Developer' },
      { id: 'Android Developer', text: 'Android Developer' },
      { id: 'Java Developer', text: 'Java Developer' },
      { id: 'Python Developer', text: 'Python Developer' },
      { id: 'Linux Developer', text: 'Linux Developer' },
      { id: 'Unity Developer', text: 'Unity Developer' },
      { id: 'Angular Developer', text: 'Angular Developer' },
      { id: 'PHP Developer', text: 'PHP Developer' },
      { id: 'React JS Developer', text: 'React JS Developer' },
      { id: 'Wordpress Developer', text: 'Wordpress Developer' },
      { id: 'Javascript Developer', text: 'Javascript Developer' },
      { id: 'HTML5 Developer', text: 'HTML5 Developer' },
      { id: 'Database Developer', text: 'Database Developer' },
      { id: '.NET Developer', text: '.NET Developer' },
      { id: 'Larvel Developer', text: 'Larvel Developer' },
      {
        id: 'Windows Applications Developer',
        text: 'Windows Applications Developer'
      },
      { id: 'Swift Developer', text: 'Swift Developer' },
      { id: 'Web Developer', text: 'Web Developer' }
    ]
  };

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  handleChange = (input, inside) => e => {
    if (input === 'education') {
      var education = { ...this.state.education };
      education[inside] = e.target.value;
      this.setState({ education });
    } else this.setState({ [input]: e.target.value });
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
  submitCV = e => {
    e.preventDefault();
  };
  render() {
    const { socialStatus, education, tags, gpa } = this.state;
    const values = {
      socialStatus,
      tags,
      education,
      gpa
    };
    const showCV = () => {
      if (!this.state.isCV)
        return (
          <CreateCV
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={values}
            step={this.state.step}
            tags={this.state.tags}
            suggestions={this.state.suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag}
            onSubmit={this.submitCV}
          />
        );
      else
        return (
          <EditCV
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            step={this.state.step}
            tags={this.state.tags}
            suggestions={this.state.suggestions}
            handleDelete={this.handleDelete}
            handleAddition={this.handleAddition}
            handleDrag={this.handleDrag}
            onSubmit={this.submitCV}
            values={values}
          />
        );
    };
    return <div className='cv'>{showCV()}</div>;
  }
}
//************************************************************************creacte CV Class ***********************************************/
class CreateCV extends Component {
  state = { type: 'create' };

  render() {
    const formRenderer = () => {
      switch (this.props.step) {
        case 1:
        default:
          return (
            <div className='m-3'>
              <h6 className='h6'>You haven't created your CV yet.</h6>
              <Button nextStep={this.props.nextStep} type={this.state.type} />
            </div>
          );
        case 2:
          return (
            <CVCreateForm
              values={this.props.values}
              handleChange={this.props.handleChange}
              tags={this.props.tags}
              suggestions={this.props.suggestions}
              handleDelete={this.props.handleDelete}
              handleAddition={this.props.handleAddition}
              handleDrag={this.props.handleDrag}
              onSubmit={this.props.onSubmit}
            />
          );
      }
    };
    return <React.Fragment>{formRenderer()} </React.Fragment>;
  }
}
function CVCreateForm(props) {
  const { values } = props;
  return (
    <React.Fragment>
      <form className='cv-form' onSubmit={props.onSubmit}>
        <h5 className='h-5 text-center '>Fill Out Your CV Info</h5>
        <hr />
        <div className='form-row'>
          <div className='col-12'>
            <h6 className=' mt-1 h-6'>Social Status</h6>
          </div>
        </div>
        <div className='form-row my-3'>
          <div className='col-12'>
            <select
              name='socialStatus'
              className='mx-1 custom-select w-50 '
              onChange={props.handleChange('socialStatus')}
              value={values.socialStatus}
            >
              <option value='single'>Single</option>
              <option value='married'>Married</option>
              <option value='engaged'>Engaged</option>
            </select>
          </div>
        </div>
        <hr />
        <div className='form-row my-1'>
          <div className='col-12'>
            <h6 className=' mt-1 h-6'>Degree</h6>
          </div>
        </div>
        <div className='form-row'>
          <div className='col-4'>
            <div className='form-group my-1 '>
              <select
                name='field'
                className='mx-1 custom-select '
                onChange={props.handleChange('education', 'field')}
                value={values.education.field}
              >
                <option value='Computer Science'>Computer Science</option>
                <option value='Computer Information Systems'>
                  Computer Information Systems
                </option>
                <option value='Business Information Technology'>
                  Business Information Technology
                </option>
                <option value='Software Engineering'>
                  Software Engineering
                </option>
                <option value='Management information system'>
                  Management information system
                </option>
                <option value='Cyber Security'>Cyber Security</option>
                <option value='Artificial Intelligence'>
                  Artificial Intelligence
                </option>
              </select>
            </div>
          </div>
          <div className='col-5'>
            <div className='form-group my-1 '>
              <Universities
                school={values.education.school}
                handleChange={props.handleChange}
              />
            </div>
          </div>
          <div className='from-col-3'>
            <div className='from-group my-1'>
              <select
                name='gpa'
                className='mx-1 custom-select '
                onChange={props.handleChange('gpa')}
                value={values.gpa}
              >
                <option value='Excellent'>Excellent</option>
                <option value='Very Good'>Very Good</option>
                <option value='Good'>Good</option>
                <option value='Pass'>Pass</option>
                <option value='Weak'>Weak</option>
              </select>
            </div>
          </div>
        </div>
        <br></br>
        <hr />
        <div className='form-row mt-1'>
          <div className='col-12'>
            <h6 className=' mt-1 h-6'>Specialty</h6>
          </div>
        </div>
        <div className='form-row'>
          <div className='col-12'>
            <ReactTags
              inputFieldPosition='top'
              tags={props.tags}
              suggestions={props.suggestions}
              handleDelete={props.handleDelete}
              handleAddition={props.handleAddition}
              handleDrag={props.handleDrag}
              delimiters={delimiters}
              minQueryLength={1}
              renderSuggestion={({ text }) => <div style={{}}>{text}</div>}
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
        <hr />
        <button className='btn m-5 px-3' type='submit'>
          Submit CV
        </button>
      </form>
    </React.Fragment>
  );
}
function Universities(props) {
  return (
    <React.Fragment>
      <select
        name='school'
        className='mx-1 custom-select w-75'
        onChange={props.handleChange('education', 'school')}
        value={props.school}
      >
        <option value='Jordanian University'>Jordanian University</option>
        <option value='Mutah University'>Mutah University</option>
        <option value='University of Science and Technology'>
          University of Science and Technology
        </option>
        <option value='Al Al-Bait University'>Al Al-Bait University</option>
        <option value='Hashemite University'>Hashemite University</option>
        <option value='Al-Balqa Applied University'>
          Al-Balqa Applied University
        </option>
        <option value='Al-Hussein Bin Talal University'>
          Al-Hussein Bin Talal University
        </option>
        <option value='Tafila Technical University'>
          Tafila Technical University
        </option>
        <option value='German Jordanian University'>
          German Jordanian University
        </option>
        <option value='Al-Ahliya Amman University'>
          Al-Ahliya Amman University
        </option>
        <option value='Philadelphia University'>Philadelphia University</option>
        <option value='Princess Sumaya University'>
          Princess Sumaya University
        </option>
        <option value='Israa University'>Israa University</option>
        <option value='Petra University'>Petra University</option>
        <option value='Applied Science Private University'>
          Applied Science Private University
        </option>
        <option value='Jarash University'>Jarash University</option>
        <option value='Zaytooneh University'>Zaytooneh University</option>
        <option value='Zarqa University'>Zarqa University</option>
        <option value='Irbid National University'>
          Irbid National University
        </option>
        <option value='Amman Arab University'>Amman Arab University</option>
        <option value='American University of Madaba'>
          American University of Madaba
        </option>
        <option value='Jadara University'>Jadara University</option>
        <option value='Middle East University'>Middle East University</option>
        <option value='Ajloun National University'>
          Ajloun National University
        </option>
        <option value='Aqaba University of Technology'>
          Aqaba University of Technology
        </option>
        <option value='Hussein Technical University'>
          Hussein Technical University
        </option>
      </select>
    </React.Fragment>
  );
}

//************************************************************************Edit CV Class *****************************************/
class EditCV extends Component {
  state = { type: 'edit' };

  render() {
    const formRenderer = () => {
      switch (this.props.step) {
        case 1:
        default:
          return (
            <div className='m-3'>
              <h4 className='h4 m-4'>Edit your CV info.</h4>
              <ul className='list-group text-center '>
                <li className='list-group-item py-2 '>
                  <div className='row'>
                    <div className='col-4'>Social Status:</div>
                    <div className='col-8'>
                      <span>{this.props.values.socialStatus}</span>
                    </div>
                  </div>
                </li>
                <li className='list-group-item py-2'>
                  <div className='row'>
                    <div className='col-4'> Degree:</div>
                    <div className='col-8'>
                      <span>{this.props.values.education.field}</span>
                    </div>
                  </div>
                  <div className='row'>
                    <div className='col-4'>University:</div>
                    <div className='col-8'>
                      <span>{this.props.values.education.school}</span>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='col-4'> GPA :</div>
                    <div className='col-8'>
                      <span>{this.props.values.gpa}</span>
                    </div>
                  </div>
                </li>
                <li className='list-group-item py-2'>
                  <div className='row'>
                    <div className='col-4'>Specialties:</div>
                    <div className='col-8'>
                      {this.props.values.tags.map(x => (
                        <span key={x.id}>{x.text} , </span>
                      ))}
                    </div>
                  </div>
                </li>
              </ul>

              <Button nextStep={this.props.nextStep} type={this.state.type} />
            </div>
          );
        case 2:
          return (
            <CVCreateForm
              values={this.props.values}
              handleChange={this.props.handleChange}
              tags={this.props.tags}
              suggestions={this.props.suggestions}
              handleDelete={this.props.handleDelete}
              handleAddition={this.props.handleAddition}
              handleDrag={this.props.handleDrag}
              onSubmit={this.props.onSubmit}
            />
          );
      }
    };
    return <React.Fragment>{formRenderer()} </React.Fragment>;
  }
}

function Button(props) {
  const { nextStep, type } = props;
  const buttonName = () => {
    if (type === 'create') return 'Create CV';
    else return 'Edit CV';
  };
  return (
    <React.Fragment>
      <button className='btn m-5 p-3' onClick={nextStep}>
        {buttonName()}
      </button>
    </React.Fragment>
  );
}

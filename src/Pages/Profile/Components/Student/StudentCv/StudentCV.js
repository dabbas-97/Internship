import React, { Component } from 'react';
import jsonData from '../../../suggestions.json';
import { EditCV } from './EditCV';
import { CreateCV } from './CreateCV';
import { db, toto } from '../../../../../Auth'

const KeyCodes = {
  comma: 188,
  enter: 13
};

export const delimiters = [KeyCodes.comma, KeyCodes.enter];
const loadData = () => JSON.parse(JSON.stringify(jsonData));

export default class StudentCV extends Component {
  constructor(props){
    super(props)
    this._isMountned=false;
  }
  state = {
    isloaded: false,
    step: 1,
    isCV: false,
    socialStatus: 'Single',
    education: {
      school: 'Hashemite University',
      field: 'Computer Science'
    },
    gpa: '2.5',
    tags: [],
    suggestions: []
  };
  
  UNSAFE_componentWillMount() {
    let suggestions = loadData();
    this.setState({ suggestions: suggestions }); // Filling data from the json file (suggestions.json)
  }
  componentDidMount() {
    this._isMountned=true
    if (this._isMountned) {
      toto.onAuthStateChanged(cred => {
        db.collection('cv').doc(cred.uid).get().then(doc => {
          if (doc.exists) this.setState({
           
            isCV: true,
            socialStatus: doc.data().socialStatus,
            education: { school: doc.data().school, field: doc.data().field },
            gpa: doc.data().gpa,
            tags: doc.data().specialities.map(x => { return { id: x, text: x } }),
          })
          this._isMountned=false;
        }).catch(err => console.log(err.message))
      });
    }

  }
  componentWillUnmount() {
    this._isMountned=false;
  }
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
  submitCV = e => {
    e.preventDefault();
    toto.onAuthStateChanged(cred => {
      db.collection('cv').doc(cred.uid).set({

        socialStatus: this.state.socialStatus,
        school: this.state.education.school,
        field: this.state.education.field,
        gpa: this.state.gpa,
        specialities: this.state.tags.map(tag => tag.text)
      })
    })
    this.setState({ step: this.state.step - 1, isCV: true });
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
    return <React.Fragment>{showCV()}</React.Fragment>;
  }
}


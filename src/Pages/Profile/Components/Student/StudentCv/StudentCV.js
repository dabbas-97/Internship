import React, { Component } from 'react';
import jsonData from '../../../suggestions.json';
import { EditCV } from './EditCV';
import { CreateCV } from './CreateCV';

const KeyCodes = {
  comma: 188,
  enter: 13
};

export const delimiters = [KeyCodes.comma, KeyCodes.enter];
const loadData = () => JSON.parse(JSON.stringify(jsonData));

export default class StudentCV extends Component {
  state = {
    step: 1,
    isCV: false,
    socialStatus: 'Single',
    education: {
      school: 'Hashemite University',
      field: 'Computer Science'
    },
    gpa: 'Good',
    tags: [],
    suggestions: []
  };
  UNSAFE_componentWillMount() {
    let suggestions = loadData();
    this.setState({ suggestions: suggestions }); // Filling data from the json file (suggestions.json)
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
    if (this.state.isCV === false) this.setState({ isCV: true });
    this.setState({ step: this.state.step - 1 });
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


import React, { Component } from 'react';
import { Button } from './Button';
import { CVCreateForm } from "./CVCreateForm";
import { MdDeleteForever } from 'react-icons/md'
//************************************************************************Edit CV Class *****************************************/
export class EditCV extends Component {
    state = { type: 'edit' };
    render() {
        const renderGpa = () => {
            switch (this.props.values.gpa) {
                case '3.5': return 'Exccelent'
                case '3.0': return 'Very Good'
                case '2.5': return 'Good'
                case '2.0': return 'Pass'
                case '1.5': return 'Weak'
                default: return
            }
        }
        const formRenderer = () => {
            switch (this.props.step) {
                case 1:
                default:
                    return (<div className='m-3 editCV'>
                        <h5 className='h5 mb-4'>Edit your CV info.</h5>
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
                                    <div className='col-4'> Field:</div>
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
                                        <span>{renderGpa()}</span>
                                    </div>
                                </div>
                            </li>
                            <li className='list-group-item py-2'>
                                <div className='row'>
                                    <div className='col-4'>Specialities:</div>
                                    <div className='col-8'>
                                        {this.props.values.tags.map(x => (<span key={x.id}>{x.text} , </span>))}
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <Button nextStep={this.props.nextStep} type={this.state.type} />

                        <button className='btn  m-4 px-5 py-2' onClick={this.props.deleteCv}><MdDeleteForever /></button>


                    </div>);
                case 2:
                    return (<CVCreateForm values={this.props.values} handleChange={this.props.handleChange} tags={this.props.tags} suggestions={this.props.suggestions} handleDelete={this.props.handleDelete} handleAddition={this.props.handleAddition} handleDrag={this.props.handleDrag} onSubmit={this.props.onSubmit} />);
            }
        };
        return <React.Fragment>{formRenderer()} </React.Fragment>;
    }
}

import React, { Component } from 'react';
import { InternshipsCreateForm } from './InternshipsCreateForm';
export class InternshipsPoster extends Component {
    render() {
        const formReturner = () => {
            if (this.props.step === 1)
                return (<div className='m-3 '>
                    <h5 className='h5'>Create an internship post</h5>
                    <button className='btn m-4 px-5 py-2' onClick={this.props.nextStep}>
                        Create an internship
            </button>
                </div>);
            else if (this.props.step === 2)
                return (<InternshipsCreateForm values={this.props.values} handleChange={this.props.handleChange} handlePost={this.props.handlePost} />);
        };
        return (<div className='internshipsPosting my-2'>
            <React.Fragment> {formReturner()} </React.Fragment>
        </div>);
    }
}

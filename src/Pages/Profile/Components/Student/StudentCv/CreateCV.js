import React, { Component } from 'react';
import { Button } from './Button';
import { CVCreateForm } from './CVCreateForm';
//************************************************************************creacte CV Class ***********************************************/
export class CreateCV extends Component {
    state = { type: 'create' };
    render() {
        const formRenderer = () => {
            switch (this.props.step) {
                case 1:
                default:
                    return (
                        <div className='m-3'>
                            <h5 className='h5'>You haven't created your CV yet.</h5>
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
                            onSubmit={this.props.onSubmit} />
                    );
            }
        };
        return <React.Fragment>{formRenderer()} </React.Fragment>;
    }
}

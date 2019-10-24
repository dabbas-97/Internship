import React, { Component } from 'react'
import {
    IoIosArrowForward,
    IoIosArrowBack,
} from 'react-icons/io';
export default class Buttons extends Component {
    render() {
        if (this.props.pages === 0)
            return (
                <div className='row'>
                    <div className='form-inline offset-6 col-6 my-1 '>
                        <div className='text-center mx-4 my-2 '>
                            <button type='button' className='btn' onClick={this.props.nextPage}>
                                Next <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
            );
        else if (this.props.pages === this.props.maxPages)
            return (
                <div className='row'>
                    <div className='form-inline justify-content-end col-6 my-1'>
                        <div className='text-center mx-4 my-2 '>
                            <button type='button' className='btn' onClick={this.props.prevPage}>
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
                        <div className='text-center mx-4 my-2 '>
                            <button type='button' className='btn' onClick={this.props.prevPage}>
                                <IoIosArrowBack /> Back
              </button>
                        </div>
                    </div>
                    <div className='form-inline col-6 my-1 '>
                        <div className='text-center mx-4 my-2 '>
                            <button type='button' className='btn' onClick={this.props.nextPage}>
                                Next <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
            );
    }
}

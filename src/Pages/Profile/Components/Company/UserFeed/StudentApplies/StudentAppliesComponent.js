import React, { Component } from 'react'
import Buttons from '../../../../../Buttons'
import { StudentsApplies } from './StudentsApplies'

export default class StudentsAppliesComponent extends Component {

    state = {
        pages: 0,

    };





    //to split the companies applied for into 2 elements chunks
    pageRenderer() {
        const { studentsApplied } = this.props;
        let i,
            j,
            pages = [],
            chunk = 2;
        for (i = 0, j = studentsApplied.length; i < j; i += chunk) {
            pages.push(studentsApplied.slice(i, i + chunk));
        }
        return pages;
    }

    render() {
        const appliedChunks = this.pageRenderer();
        const nextPage = () => {
            let { pages } = this.state;
            if (pages < appliedChunks.length - 1) this.setState({ pages: pages + 1 });
        };
        const prevPage = () => {
            let { pages } = this.state;
            if (pages > 0) this.setState({ pages: pages - 1 });
        };
        const showButtons = () => {
            if (appliedChunks.length > 1)
                return (
                    <Buttons
                        prevPage={prevPage}
                        nextPage={nextPage}
                        pages={this.state.pages}
                        maxPages={appliedChunks.length - 1}
                    />
                );
        };


        return (
            <div className='appliedFor m-3'>
                <h5 className='h5'>Students who have applied to your internships.</h5>
                <div className='feedContent m-3'>
                    <div className='row  '>
                        <StudentsApplies
                            studentsApplied={appliedChunks[this.state.pages]}
                        />
                    </div>
                    {showButtons()}

                </div>
            </div>
        );
    }
}
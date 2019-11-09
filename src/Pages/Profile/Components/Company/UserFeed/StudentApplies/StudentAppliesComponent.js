import React, { useEffect, useState } from 'react'
import Buttons from '../../../../../Buttons'
import { StudentsApplies } from './StudentsApplies'

const StudentsAppliesComponent = (props) => {
    const [pages, setPages] = useState(0)
    const [studentsApplied, setStudentsApplied] = useState([])

    useEffect(() => {
        setStudentsApplied(props.studentsApplied)
    }, [props.studentsApplied])

    useEffect(() => {
        setPages(0)

    }, [studentsApplied])

    const pageRenderer = () => {
        let i,
            j,
            pages = [],
            chunk = 2;
        for (i = 0, j = studentsApplied.length; i < j; i += chunk) {
            pages.push(studentsApplied.slice(i, i + chunk));
        }
        return pages;
    }


    const appliedChunks = pageRenderer();
    const nextPage = () => {
        if (pages < appliedChunks.length - 1) setPages(pages + 1);
    };
    const prevPage = () => {
        if (pages > 0) setPages(pages - 1)
    };
    const showButtons = () => {
        if (appliedChunks.length > 1)
            return (
                <Buttons
                    prevPage={prevPage}
                    nextPage={nextPage}
                    pages={pages}
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
                        studentsApplied={appliedChunks[pages]}
                        postId={props.postId}
                    />
                </div>
                {showButtons()}

            </div>
        </div>
    );

}
export default StudentsAppliesComponent
import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';
import { GoHeart } from 'react-icons/go';
import { IoMdSchool } from 'react-icons/io';
import { FaLaptopCode } from 'react-icons/fa';
import { Universities } from './Universities';
import { delimiters } from './StudentCV';
export function CVCreateForm(props) {
    const { values } = props;
    return (
        <React.Fragment>
            <form onSubmit={props.onSubmit}>
                <ul className='list-group text-center cvul'>
                    <li className='list-group-item py-2 fill'>
                        <h5 className='h-5 text-center '>Fill Out Your CV Info</h5>
                    </li>

                    <li className='list-group-item py-2 '>
                        <h6 className=' mt-1 h-6'>
                            <span>
                                <GoHeart />
                            </span>
                            Social Status
                     </h6>

                        <div className='form-row my-3'>
                            <div className='col-12'>
                                <select name='socialStatus' className='mx-1 custom-select w-50 ' onChange={props.handleChange('socialStatus')} value={values.socialStatus}>
                                    <option value='Single'>Single</option>
                                    <option value='Married'>Married</option>
                                    <option value='Engaged'>Engaged</option>
                                </select>
                            </div>
                        </div>
                    </li>

                    <li className='list-group-item py-2 '>
                        <h6 className=' mt-1 h-6'>
                            <span>
                                <IoMdSchool />
                            </span>
                            Degree
                     </h6>

                        <div className='form-row'>
                            <div className='col-4'>
                                <div className='form-group my-1 '>
                                    <select name='field' className='mx-1 custom-select ' onChange={props.handleChange('education', 'field')} value={values.education.field}>
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
                                    <Universities school={values.education.school} handleChange={props.handleChange} />
                                </div>
                            </div>
                            <div className='from-col-3'>
                                <div className='from-group my-1'>
                                    <select name='gpa' className='mx-1 custom-select ' onChange={props.handleChange('gpa')} value={values.gpa}>
                                        <option value='3.5'>Excellent</option>
                                        <option value='3.0'>Very Good</option>
                                        <option value='2.5'>Good</option>
                                        <option value='2.0'>Pass</option>
                                        <option value='1.5'>Weak</option>
                                    </select>
                                </div>
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
                                <ReactTags inputFieldPosition='top' tags={props.tags} suggestions={props.suggestions} handleDelete={props.handleDelete} handleAddition={props.handleAddition} handleDrag={props.handleDrag} delimiters={delimiters} minQueryLength={1} renderSuggestion={({ text }) => <div style={{}}>{text}</div>} placeholder={'Java, PHP, etc.'} autocomplete={1} classNames={{
                                    tags: 'tagsClass',
                                    tagInput: 'tagInputClass',
                                    tagInputField: 'tagInputFieldClass',
                                    selected: 'selectedClass',
                                    tag: 'tagClass',
                                    remove: 'removeClass',
                                    suggestions: 'suggestionsClass',
                                    activeSuggestion: 'activeSuggestionClass'
                                }} />
                            </div>
                        </div>
                    </li>
                    <li className='list-group-item py-2 '>
                        <button className='btn m-3 px-3 py-2' type='submit'>
                            Submit CV
            </button>
                    </li>
                </ul>
            </form>
        </React.Fragment>
    );
}

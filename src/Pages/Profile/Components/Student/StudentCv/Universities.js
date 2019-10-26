import React from 'react';
export function Universities(props) {
    return (<React.Fragment>
        <select name='school' className='mx-1 custom-select w-75' onChange={props.handleChange('education', 'school')} value={props.school}>
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
    </React.Fragment>);
}

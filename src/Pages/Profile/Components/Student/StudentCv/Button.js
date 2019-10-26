import React from 'react';
export function Button(props) {
    const { nextStep, type } = props;
    const buttonName = () => {
        if (type === 'create')
            return 'Create CV';
        else
            return 'Edit CV';
    };
    return (<React.Fragment>
        <button className='btn m-4 px-5 py-2' onClick={nextStep}>
            {buttonName()}
        </button>
    </React.Fragment>);
}

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
class Success extends Component {
    componentDidMount(){
        setTimeout(()=>{this.props.history.push('/profile')},3000)
    }
    render() {
        
        return (<React.Fragment>
            <h1 className='h1 text-center m-lg-5'>Success!</h1>
        </React.Fragment>);
    }
}

export default withRouter(Success);
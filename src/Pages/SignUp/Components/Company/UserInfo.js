import React, { Component } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
export class UserInfo extends Component {
  state = {
    matchedPassword: false,
    validEmail: false,
    validPassword: false,
    emailValidClass: 'form-control',
    passwordValidClass: 'form-control',
    passwordMatchClass: 'form-control mt-2',
    matchFeedback: 'd-none',
    emailFeedback: 'd-none',
    passwordFeedback: 'd-none'
  };

  render() {
    const { email, password, passmatch } = this.props.values;
    //Next

    const nextValidate = () => {
      let { matchedPassword, validEmail, validPassword } = this.state;
      if (
        matchedPassword &&
        validEmail &&
        validPassword &&
        email &&
        password &&
        passmatch
      )
        this.props.nextStep();
    };

    //Password Matching
    const isMatched = isIt => {
      if (isIt) {
        this.setState({ matchedPassword: true });
        this.setState({ passwordMatchClass: 'form-control is-valid mt-2' });
        this.setState({ matchFeedback: 'd-none' });
      } else {
        this.setState({ matchedPassword: false });
        this.setState({ passwordMatchClass: 'form-control is-invalid mt-2' });
        this.setState({ matchFeedback: 'invalid-feedback' });
      }
    };
    const matchPassword = e => {
      this.props.handleChange('passmatch')(e);
      this.setState({ matchInvoked: true });
      if (e.target.value === password && e.target.value !== '') {
        isMatched(true);
      } else isMatched(false);
    };

    //Password validation
    const isValidPass = isIt => {
      if (isIt) {
        this.setState({ validPassword: true });
        this.setState({ passwordValidClass: 'form-control is-valid' });
        this.setState({ passwordFeedback: 'd-none' });
      } else {
        this.setState({ validPassword: false });
        this.setState({ passwordValidClass: 'form-control is-invalid' });
        this.setState({ passwordFeedback: 'invalid-feedback' });
      }
    };
    const validatePassword = e => {
      this.setState({ allValid: false });
      this.props.handleChange('password')(e);
      // eslint-disable-next-line no-useless-escape
      let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z_.,@#$%^&*()\-+=! <>"'\\?\/]{8,}$/;

      if (re.test(String(e.target.value))) {
        isValidPass(true);
      } else {
        isValidPass(false);
      }

      if (this.state.matchInvoked) {
        if (e.target.value === passmatch && passmatch !== '') {
          isMatched(true);
        } else {
          isMatched(false);
        }
      }
    };

    //Email validation
    const isValidEmail = isIt => {
      if (isIt) {
        this.setState({ validEmail: true });
        this.setState({ emailValidClass: 'form-control is-valid' });
        this.setState({ emailFeedback: 'd-none' });
      } else {
        this.setState({ validEmail: false });
        this.setState({ emailValidClass: 'form-control is-invalid' });
        this.setState({ emailFeedback: 'invalid-feedback' });
      }
    };

    const validateEmail = e => {
      this.setState({ allValid: false });
      this.props.handleChange('email')(e);
      let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(String(e.target.value).toLowerCase())) {
        isValidEmail(true);
      } else {
        isValidEmail(false);
      }
    };

    return (
      <React.Fragment>
        <div className='form-group my-4 '>
          <label htmlFor='emailAddress'>Email address</label>
          <input
            type='email'
            className={this.state.emailValidClass}
            placeholder='eg. mohammad@email.com'
            onChange={validateEmail}
            defaultValue={email}
          />
          <div className={this.state.emailFeedback}>
            Please enter a valid email.
          </div>
        </div>

        <div className='form-group my-4 '>
          <label htmlFor='password'>Passowrd</label>
          <input
            type='password'
            className={this.state.passwordValidClass}
            placeholder='Type your password'
            onChange={validatePassword}
            defaultValue={password}
          />
          <div className={this.state.passwordFeedback}>
            Password must contain at least 8 characters, one uppercase letters,
            and one lowercase letters.
          </div>
          <input
            type='password'
            className={this.state.passwordMatchClass}
            placeholder='Retype your password'
            onChange={matchPassword}
          />
          <div className={this.state.matchFeedback}>Passwords dont match.</div>
        </div>
        <div className='form-group my-4'>
          <div className=' form-inline justify-content-center form-row my-4'>
            <div className='text-center m-4 '>
              <button
                type='button'
                className='btn'
                onClick={this.props.prevStep}
              >
                <IoIosArrowBack /> Back
              </button>
            </div>
            <div className='text-center m-4 '>
              <button type='button' className='btn' onClick={nextValidate}>
                Next <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

import React, { Component } from 'react';
import '../App/App.scss';
import { Redirect } from 'react-router-dom';
import { fetchUser } from '../../util/apiCalls';
import { connect } from 'react-redux';
import { getUser } from '../../actions/index';
import PropTypes from 'prop-types';

export class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      isPasswordShown: false
    }
  }

  togglePasswordVisibility = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown})
  }

  handleChange = e => {
    this.setState({[e.target.name] : e.target.value })
  }

  handleSubmit = (e) => {
    const { email, password } = this.state
    e.preventDefault()
    fetchUser(email, password)
    .then(user => this.props.getUser(user))
    .then(this.setState({ loggedIn: true}))
  }

  render() {
      if(this.state.loggedIn){
      return <Redirect to="/" />;
    }
    const { isPasswordShown } = this.state;
    return (
      <section className="section-form">
        <div className="section-form__header">
        <div className="user-info">
          <div className="user-info__form">
            <form className="loginForm">
              <h1 className="heading">
                Please login!
              </h1>
              <div className="loginForm__group">
                <input
                  name="email"
                  value={this.state.email}
                  className="loginForm__input"
                  onChange={(e)=> this.handleChange(e)}
                  id="email"
                  placeholder="email"
                  type="text"
                  />
                <label
                  htmlFor="email"
                  className="loginForm__label">email
                </label>
                <div className="loginForm__group">
                  <i
                      className={`fa ${isPasswordShown ? "fa-eye" : "fa-eye-slash"} password-icon`} onClick={this.togglePasswordVisibility} />
                  <input
                    name="password"
                    value={this.state.password}
                    className="loginForm__input"
                    onChange={(e) => this.handleChange(e)}
                    id="password"
                    placeholder="password"
                    type={(isPasswordShown) ? "text" : "password"}
                  />
                  <label
                    htmlFor="password"
                    className="loginForm__label">password
                  </label>
                  <a className="btn btn-grey" href='/login' onClick={(e)=> this.handleSubmit(e)}>Login &rarr;</a>
                </div>
              </div>
            </form>
          </div>
        </div>
        </div>
      </section>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user))
});

export default connect(null, mapDispatchToProps)(LoginForm);


LoginForm.propTypes = {
  isPasswordShown: PropTypes.func,
  getUser: PropTypes.func
}

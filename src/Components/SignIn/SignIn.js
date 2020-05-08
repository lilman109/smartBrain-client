import React, {Component} from 'react'

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onEnterPressed = (event) => {
    const {signInEmail, signInPassword} = this.state;
    if (signInEmail && signInPassword) {
      if (event.key === 'Enter') {
        this.onSubmitSignIn();
      }
    }
  }

  onSubmitSignIn = () => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id)
        {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        }
      })
  }

  render() {
    const {onRouteChange} = this.props;

    return (
      <div>
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-1">
          <main className="pa4 black-80 w-200">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-200"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                    onKeyPress={this.onEnterPressed}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-200"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                    onKeyPress={this.onEnterPressed}
                  />
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
              </fieldset>
              <div className="">
                <input
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow f6 dib button"
                  type="submit"
                  value="Sign in"
                  onClick={this.onSubmitSignIn}
                />
              </div>
              <div className="lh-copy mt3">
                <p className="f6 link dim black db button" onClick={() => onRouteChange('register')}>Register</p>
                <a href="#0" className="f6 link dim black db">Forgot your password?</a>
              </div>
            </div>
          </main>
        </article>
      </div>
    );
  }
}

export default SignIn;
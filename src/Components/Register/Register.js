import React, {Component} from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      signInEmail: '',
      signInPassword: '',
      name: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({signInEmail: event.target.value});
  }

  onPasswordChange = (event) => {
    this.setState({signInPassword: event.target.value});
  }

  onSubmitRegister = () => {
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        name: this.state.name,
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
    return (
      <div>
        <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-1">
          <main className="pa4 black-80 w-200">
            <div className="measure">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-200"
                    type="text"
                    name="name"
                    id="name"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                  <input
                    className="pa2
                    input-reset ba bg-transparent hover-bg-black hover-white w-200"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                  <input
                    className="b pa2
                    input-reset ba bg-transparent hover-bg-black hover-white w-200"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
              </fieldset>
              <div className="lh-copy mt3">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow f6 dib button" type="submit" value="Register" onClick={this.onSubmitRegister} />
              </div>
            </div>
        </main>
      </article>
     </div>
    )
  }
}

export default Register;
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AuthenticationService from './services/AuthenticationService'
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    componentDidMount() {
      AuthenticationService.sendToken(sessionStorage.getItem('jwttoken'))
        .then(
          (res) => {
            if (res.status === 200) {
              this.setState({ loading: false })
            } else {
              const error = new Error(res.error);
              throw error
            }
          },
          (err) => {
            console.log(err)
            alert('Please log in!')
            this.setState({
              redirect: true,
              loading: false,
            })
          })
    }
    
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}
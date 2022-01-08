import React, { Component } from 'react';
import { Button } from "reactstrap";

class Home extends Component {
  doLogin() {
    window.location.href = '/login'
  }

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">Welcome to AdmiosFlix</h1>
        <p>
          <Button onClick={this.doLogin}>Login</Button>
        </p>
      </main>
    );
  }
}

export default Home

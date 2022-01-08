import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label, Container, Row, Col} from "reactstrap";

import axiosInstance from "../axiosApi";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      errorLogin: ''
    }
  }

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value,
    });
  };

  submitForm(e) {
    e.preventDefault();
    
    this.setState({
      errorLogin: ''
    })

    try {
      console.log('Por logear')
      axiosInstance.post('/token/', {
          username: this.state.username,
          password: this.state.password
      }).then(response => {
        console.log(response)

        axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;

        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        window.location.href = '/movies'
        
      }).catch(error => {
        console.log(error)
        this.setState({
          errorLogin: 'Login Error: ' + error
        })
      })

    } catch (error) {
        throw error;
    }
  }

  render() {
    return (
      <Container>
        <h1 className="text-white text-uppercase text-center my-4">Welcome to AdmiosFlix</h1>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 2 }}>
            <Form onSubmit={(e) => this.submitForm(e)}>
                <FormGroup>
                  <Label for="username" className="text-white">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    onChange={(e) => this.handleChange(e)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password" className="text-white">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => this.handleChange(e)}
                  />
                </FormGroup>
              <Button>Login</Button>
              
            </Form>
            </Col>
        </Row>
        <Row>
          <Col sm="12" md={{ size: 4, offset: 2 }}>
            <Label className="text-white">{this.state.errorLogin}</Label>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login

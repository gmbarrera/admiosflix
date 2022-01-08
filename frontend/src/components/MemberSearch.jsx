import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Input,
  Label,
  Table,
} from "reactstrap";

import { fetchMembers } from '../services';

class MemberSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pattern: '',
      members: []
    };
  }

  handleChange = (event) => {
    let { value } = event.target;

    this.setState({
      pattern: value
    });
  }
  
  searchmembers() {
    fetchMembers(this.state.pattern)
    .then(data => {
      this.setState({
        members: data
      })
    })
  }

  render() {
    const { toggle, onSelect } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Search Movie Members</ModalHeader>
        <ModalBody>
          <Label for="todo-title">Part of the name</Label>
          <Input
            type="text"
            id="pattern"
            name="pattern"
            onChange={this.handleChange}
            value={this.state.pattern}
          />
          <Button onClick={() => this.searchmembers() } >Search...</Button>
          <Table striped bordered hover dark size="sm">
            <thead>
              <tr>
                <th>
                  Lastname
                </th>
                <th>
                  Firstname
                </th>
                <th>
                  Rol
                </th>
              </tr>
            </thead>
            <tbody>
            {this.state.members.map((member) => {
                return <tr key={member.id} onDoubleClick={() => onSelect(member)}>
                  <td>{member.lastname}</td>
                  <td>{member.firstname}</td>
                  <td>{member.rol}</td>
                </tr>
              }
            )}
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    );
  }
}

export default MemberSearch

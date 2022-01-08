import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        movie: this.props.movie,
    };
  }

  render() {
    const { toggle } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Movie Details</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                readOnly
                value={this.state.movie.title}
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Rating</Label>
              <Input
                type="text"
                id="rating"
                name="rating"
                readOnly
                value={this.state.movie.rating}
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Release Date</Label>
              <Input
                type="text"
                id="release_date"
                name="release_date"
                readOnly
                value={this.state.movie.release_date}
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Genre</Label>
              <Input
                type="text"
                id="genre"
                name="genre"
                readOnly
                value={this.state.movie.genre.description}
              />
            </FormGroup>
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
              {this.state.movie.members.map((member) => {
                  return <tr key={member.id}>
                    <td>{member.lastname}</td>
                    <td>{member.firstname}</td>
                    <td>{member.rol}</td>
                  </tr>
                }
              )}
              </tbody>

            </Table>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

export default MovieDetails

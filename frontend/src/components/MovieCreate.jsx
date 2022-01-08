import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Button,
  Input,
  Label,
  Table,
} from "reactstrap";

import { fetchGenres } from '../services';
import MemberSearch from "./MemberSearch";

class MovieCreate extends Component {
  constructor(props) {
    super(props);

    this.handleSelectMember = this.handleSelectMember.bind(this);

    this.state = {
        genres: [],
        movie: {
          title: '',
          release_date: '',
          rating: 0,
          genre: null,
          members: []
        },
        showingSearchMembers: false,
    };
  }
  
  componentDidMount() {
    fetchGenres().then(data => {
      this.setState({
        genres: data
      })
    });
  }

  handleChange = (event) => {
    let { name, value } = event.target;

    if (event.target.type === "select-one") {
      value = event.target.selectedOptions[0].id
    }
    
    const movie = {...this.state.movie, [name]: value };

    this.setState({
      movie: movie
    });
  }

  toggleSearcheMembers = () => {
    this.setState({ 
      showingSearchMembers: !this.state.showingSearchMembers 
    });
  }

  showSearchmembers() {
    this.setState({
      showingSearchMembers: !this.state.showingSearchMembers,
    })
  }

  handleSelectMember(member) {
    let members = this.state.movie.members;
    members.push(member)

    const movie = {...this.state.movie, members: members };

    this.setState({
      movie: movie
    });
  }

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Movie Create</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="todo-title">Title</Label>
              <Input
                type="text"
                id="title"
                name="title"
                onChange={this.handleChange}
                value={this.state.movie.title}
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Rating</Label>
              <Input
                type="text"
                id="rating"
                name="rating"
                onChange={this.handleChange}
                value={this.state.movie.rating}
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Release Date</Label>
              <Input
                type="text"
                id="release_date"
                name="release_date"
                onChange={this.handleChange}
                value={this.state.movie.release_date}
              />
            </FormGroup>
            <FormGroup>
              <Label for="todo-title">Genre</Label>
              <Input
                type="select"
                name="genre"
                onChange={this.handleChange}>
                {this.state.genres.map((genre) => <option id={genre.id} key={genre.id}>{genre.description}</option>)}
              </Input>
            </FormGroup>
            
            <Button onClick={() => this.showSearchmembers() } >Add Member</Button>

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
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.movie)}
          >
            Save
          </Button>
        </ModalFooter>
        {this.state.showingSearchMembers ? (
          <MemberSearch
            toggle={this.toggleSearcheMembers}
            onSelect={this.handleSelectMember}
          />
        ) : null}
      </Modal>
    );
  }
}

export default MovieCreate

import React, { Component } from 'react';
import { 
  Container, 
  Row, Col, 
  Table, Input, Button, 
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

import { createMovie, fetchGenres } from '../services';
import axiosInstance from "../axiosApi";
import MovieDetails from '../components/MovieDetails';
import MovieCreate from '../components/MovieCreate';


class Movies extends Component {
  constructor(props) {
    super(props);

    this.searchMovies = this.searchMovies.bind(this);

    this.state = {
      isFetching: false,
      genres: [],
      movies: [],
      selectedGenreId: 0,
      showingMovieDetails: false,
      showingCreateDetails: false,
      selectedMovie: null,
      movieCount: 0,
      pageSize: 5,
      pagesCount: 0,
      currentPage: 1
    }
  }

  async fetchMovies(index) {
    let response;
    let movies = [];

    response = await axiosInstance.get('/movie/', {params: {page: index, genre: this.state.selectedGenreId} });
    response.data.results.forEach(movie => {
      movies.push(movie)
    });
    
    this.setState({
      movies: movies,
      movieCount: response.data.count,
      pagesCount: Math.ceil(response.data.count / this.state.pageSize),
      currentPage: index
    })
  }

  searchMovies() {
    this.fetchMovies(1);
  }

  handleChangeSelectGenre = ({ target }) => {
    this.setState({
      selectedGenreId:target.selectedOptions[0].id
    });
  }

  showMovieDetails(movie) {
    this.setState({
      showingMovieDetails: !this.state.showingMovieDetails,
      selectedMovie: movie,
    })
  }

  toggleDetails = () => {
    this.setState({ 
      showingMovieDetails: !this.state.showingMovieDetails 
    });
  }

  showMovieCreate() {
    this.setState({
      showingMovieCreate: !this.state.showingMovieCreate,
    })
  }

  toggleCreate = () => {
    this.setState({ 
      showingMovieCreate: !this.state.showingMovieCreate 
    });
  }

  handleCreateMovie = (movie) => {
    this.toggleCreate();
    
    movie.members = movie.members.map(member => member.id)

    createMovie(movie)
    .then(response => {
      alert("Movie created, id " + response.data.id);
    })
  };

  handleClickPagination(e, index) {
    e.preventDefault();
    
    this.fetchMovies(index);
  }

  componentDidMount() {
    fetchGenres().then(data => {
      this.setState({
        genres: data
      })
    });
  }

  render() {
    const { currentPage, pagesCount } = this.state;

    return (
      <Container>
        <h1 className="text-white text-uppercase text-center my-4">Movies Collection</h1>
        <Row>
          <Col sm="12" md="4">
            <Input
              type="select"
              name="selectedGenre"
              onChange={this.handleChangeSelectGenre}>
              {this.state.genres.map((genre) => <option id={genre.id} key={genre.id}>{genre.description}</option>)}
            </Input>
            <Button onClick={this.searchMovies}>Find movies</Button>
          </Col>
          <Col sm="12" md="4">
            <Button onClick={() => this.showMovieCreate()}>Add movie</Button>
          </Col>
        </Row>

        <Row>
          <Col sm="12" md="6">
            <Table striped bordered hover dark size="sm">
            <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  Title
                </th>
                <th>
                  Rating
                </th>
                <th>
                  Release Date
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.movies.map((movie) => {
                  return <tr key={movie.id} onClick={() => this.showMovieDetails(movie)}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
                    <td>{movie.rating}</td>
                    <td>{movie.release_date}</td>
                  </tr>
                }
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4}>
                  <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                      <PaginationLink
                        onClick={e => this.handleClickPagination(e, 1)}
                        first
                        href="#"
                      />
                    </PaginationItem>
                    <PaginationItem disabled={currentPage <= 1}>
                      <PaginationLink
                        onClick={e => this.handleClickPagination(e, currentPage - 1)}
                        href="#"
                        previous
                      />
                    </PaginationItem>
                    
                    {[...Array(pagesCount)].map((page, i) => 
                      <PaginationItem active={i+1 === currentPage} key={i+1}>
                        <PaginationLink onClick={e => this.handleClickPagination(e, i+1)} href="#">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPage >= pagesCount - 1}>
                      <PaginationLink
                        onClick={e => this.handleClickPagination(e, currentPage + 1)}
                        href="#"
                        next
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={e => this.handleClickPagination(e, pagesCount)}
                        href="#"
                        last
                      />
                    </PaginationItem>
                  </Pagination>
                </td>
              </tr>
            </tfoot>
            </Table>
          </Col>
        </Row>
        {this.state.showingMovieDetails ? (
          <MovieDetails
            movie={this.state.selectedMovie}
            toggle={this.toggleDetails}
          />
        ) : null}
        {this.state.showingMovieCreate ? (
          <MovieCreate
            toggle={this.toggleCreate}
            onSave={this.handleCreateMovie}
          />
        ) : null}
      </Container>
    );
  }
}

export default Movies

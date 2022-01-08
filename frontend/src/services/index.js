import axiosInstance from "../axiosApi";

export async function fetchGenres() {
  let response;
  let genres = [];
  genres.push({
    id:0,
    description: '-----'
  })

  response = await axiosInstance.get('/genre/');

  response.data.forEach(genre => {
      genres.push(genre)
  })
  
  return genres;
}

export async function fetchMembers(pattern) {
  let response;
  let members = [];
  
  response = await axiosInstance.get('/moviemember/', { params: { partial_name: pattern } });

  response.data.forEach(member => {
    members.push(member)
  });
  
  return members;
}

export async function createMovie(movie) {
  let response = await axiosInstance.post(
    '/movie/',
    movie
  );
  
  return response;
}

import axios from "axios";

const apiKey = "f54b08a22123c3ac91b9cc27d18257ca";

const baseUrl = 'https://api.themoviedb.org/3';

// Movies types endpoints
const trendingMoviesEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`;
const searchMoviesEndpoint = `${baseUrl}/search/movie?api_key=${apiKey}`;


// Movie detail endpoints
const movieDetailEndpoint = id => `${baseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// Person detail endpoints
const personDetailEndpoint = id => `${baseUrl}/person/${id}?api_key=${apiKey}`;
const personCreditsEndpoint = id => `${baseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

// Images render url
const imageBaseUrl = "https://image.tmdb.org/t/p";

export const w500 = path => path ? `${imageBaseUrl}/w500${path}` : null;
export const w342 = path => path ? `${imageBaseUrl}/w342${path}` : null;
export const w185 = path => path ? `${imageBaseUrl}/w185${path}` : null;

// Fallback links

export const fallbackPersonPoster = 'https://thecollegeplanninggroup.com/wp-content/uploads/2019/03/images.png'
export const fallbackMoviePoster = 'https://images.squarespace-cdn.com/content/v1/553e1e3ae4b0c7db85dc4fb3/1444126522464-TR86PW6SEATPSOLYKUS2/Billy_Saw_Minimalist_Halloween_Poster_Posteritty.jpg?format=1000w';


// all the api call base api
const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log(error);

        return {};
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = (id) => {
    return apiCall(movieDetailEndpoint(id));

}

export const fetchMovieCredits = (id) => {
    return apiCall(movieCreditsEndpoint(id));
}

export const fetchSimilarMovies = (id) => {
    return apiCall(similarMoviesEndpoint(id));
}


export const fetchPersonDetails = (id) => {
    return apiCall(personDetailEndpoint(id));

}

export const fetchPersonMovies = (id) => {
    return apiCall(personCreditsEndpoint(id));
}

export const searchMovies = (options) => {
    return apiCall(searchMoviesEndpoint, options);
}
import {useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import {useDebounce} from 'react-use'
import './App.css'
import MovieCard from './components/MovieCard';


 const API_BASE_URL = " https://api.themoviedb.org/3";
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_OPTIONS={
    method:'GET',
    headers:{
    accept:'application/json',
    Authorization: `Bearer ${API_KEY}`
    }
  }

const App = () => {

  const [searchTerm,setSearchTerm] = useState('');
  const [movieList,setMovieList] = useState([]);
  const [errorMessage,setErrorMessage] =useState(' ');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(()=>setDebouncedSearchTerm(searchTerm),800,[searchTerm])



const fetchMovies = async (query = "") => {
  setIsLoading(true);
  setErrorMessage("");

  try {
    const endpoint = query.trim()
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();
    console.log(data);

    if (data.results?.length === 0) {
      setErrorMessage("No movies found.");
      setMovieList([]);
      return;
    }

    setMovieList(data.results || []);
  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage("Error fetching movies. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};



  useEffect( ()=>{
    
    fetchMovies(debouncedSearchTerm)

    }, [debouncedSearchTerm] );

  return (
    <>
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <img src="./hero.png" alt="" />
            <h1>Find <span className='text-gradient'>Movies</span> You"ll Enjoy Without the Hassle</h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* <h1 className='text-white w-3xl' > {searchTerm} </h1> */}
          </header>
          <section className='all-movies'>
            <h2 className='mt-[27px]' >Popular Movies</h2>
            {isLoading ? (
              <Spinner/>
            ):errorMessage?(
              <p> {errorMessage} </p>
            ):(
              <ul>
                {movieList.map((movie)=>(
                <MovieCard key={movie.id}  movie={movie}/>               ))}
              </ul>
            )}


          </section>
          
        </div>
      </div>
    </main>
    </>
  )
}

export default App
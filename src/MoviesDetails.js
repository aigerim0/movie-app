import {useEffect, useState} from "react";
import axios from "axios";
import {useParams,useHistory} from 'react-router-dom'


const MoviesDetails = () => {
    const [film, setFilm] = useState({})
    const [actors, setActors] = useState([])
    const moviesParams = useParams()
    const history = useHistory()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${moviesParams.id}?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setFilm(data))
        axios(`https://api.themoviedb.org/3/movie/${moviesParams.id}/credits?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActors(data.cast))
    }, [moviesParams])

    const Back = () => {
        history.goBack()
    }
    return (

        <div>
       <div>
           <button className='backBtn' onClick={Back}>Go back</button>
       </div>
     <div className='movieDetails'>
         <div className='mDetails-leftSide'>
             <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${film.poster_path}`}  width='150' height='225' alt=""/>
         </div>
         <div className='mDetails-rightSide'>
             <h3>{film.original_title}</h3>
             <h4>Overview</h4>
             <p>{film.overview}</p>
             <p>Popularity: {film.popularity}</p>
             <p>Release date: {film.release_date}</p>
             <p>Revenue: {film.revenue}</p>
             <p>Runtime: {film.runtime}</p>
             <p>Status: {film.status}</p>
         </div>
     </div>
          <div className='grid'>
              {
                  actors.map(item =>
                      <div>
                          <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`} width='138' height='175' alt="#"/>
                          <h4>Name:{item.name}</h4>
                          <h6>Character:{item.character}</h6>
                      </div>
                  )
              }
          </div>


        </div>
    )
}

export default MoviesDetails
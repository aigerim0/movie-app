import {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useHistory, Link} from 'react-router-dom'
import man from './img/ee5fb3d0-4d3c-43f4-ab2f-70d397f472e1.jpg'


const MoviesDetails = () => {
    const [film, setFilm] = useState({})
    const [actors, setActors] = useState([])
    const [isLoding,setIsLoding] = useState(true)
    const moviesParams = useParams()
    const history = useHistory()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${moviesParams.id}?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) =>{
                setFilm(data)
                setIsLoding(false)
            })
        axios(`https://api.themoviedb.org/3/movie/${moviesParams.id}/credits?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActors(data.cast))
    }, [moviesParams])
const handelWatchMOre = () => {
        history.push(`/actors/${film.id}`)
}
    const Back = () => {
        history.goBack()
    }
  if(isLoding) {
      return 'Loding...'
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
                    <span>Release date: {film.release_date}</span>
                    <div><b>Genres:</b>
                        {
                            film.genres.map(el=>
                                <span key={el.id}>{el.name}  </span>
                            )
                        }
                    </div>
                    <p>Duration: {film.runtime}m</p>
                    <p><b>Overview:</b> {film.overview}</p>
                    <p>Source language: {film.original_language}</p>
                    <p>Budget: {film.budget.toLocaleString()} $</p>
                    <p>Revenue: {film.revenue} $</p>
                    <p>Popularity: {film.popularity}</p>
                    <p>Release date: {film.release_date}</p>
                    <p>Revenue: {film.revenue}</p>
                    <p>Status: {film.status}</p>
                </div>
            </div>

               <div  className='grid'>
                   {
                       actors.slice(actors,9).map(item =>

                           <Link to={`/person/${item.id}`} key={item.id}>
                               {item.profile_path === null ? <img src={man} alt="" height='400' width='300'/> :<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} alt=""/>}
                               {/*<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`} width='138' height='175' alt="#"/>*/}
                               <h4>Name:{item.name }</h4>
                               <h6>Character:{item.character}</h6>

                           </Link>

                       )

                   }
               </div>


            <button onClick={handelWatchMOre} >watch more... </button>

        </div>
    )
}

export default MoviesDetails
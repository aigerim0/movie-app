import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useHistory, Link} from 'react-router-dom'
import man from './img/ee5fb3d0-4d3c-43f4-ab2f-70d397f472e1.jpg'
import Video from "./ModalVideo/Video";
import noPhoto from "./img/noPhoto.jpg";



const MoviesDetails = () => {
    const [film, setFilm] = useState({})
    const [actors, setActors] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [actorsLoading, setactorsLoading] = useState(true)
    const [trailers,setTrailers] = useState([])
    const [trailersIsloading, setTrailersIsloading] = useState(true)
    const moviesParams = useParams()
    const history = useHistory()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${moviesParams.id}?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setFilm(data)
                setIsLoading(false)
            })
        axios(`https://api.themoviedb.org/3/movie/${moviesParams.id}/videos?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setTrailers(data.results)
                setTrailersIsloading(false)
            })
        axios(`https://api.themoviedb.org/3/movie/${moviesParams.id}/credits?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActors(data.cast)
                setactorsLoading(false)
            })
    }, [moviesParams])
    const handelWatchMOre = () => {
        history.push(`/actors/${film.id}`)
    }
    const Back = () => {
        history.goBack()
    }


    if (isLoading || actorsLoading || trailersIsloading ) {
        return <div className='d-flex justify-content-center  align-items-center'>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    return (

        <div>
            <div>
                <button className='backBtn' onClick={Back}><i className='btnBack bx  bx-arrow-back'></i></button>
            </div>
            <div className='row'>
                <h3 className='d-flex justify-content-center moviesDetails-title-div '>{film.original_title}</h3>
                <div className='col-md-3  '>
                    <div>{film.poster_path ?    <img  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${film.poster_path}`}
                                                      className='movieImg w100 ' alt={film.title}/> : <img src={noPhoto} alt="#"/>}</div>
                </div>
                <div className='col-md-9 '>
                    <div className=' d-flex'>
                        <div className='col-md-6'>
                            <p><b>Release date:</b> {film.release_date}</p>
                            <p><b>Genres:</b> {
                                film.genres.map(el =>
                                    <p key={el.id}>{el.name}  </p>
                                )
                            }
                            </p>
                            <p>
                                <b>Countries:</b> {
                                film.production_countries.map(el =>
                                    el.name
                                )
                            }
                            </p>
                            <p><b>Duration:</b> {film.runtime}m</p>
                            <p><b>Source language:</b> {film.original_language}</p>
                        </div>
                        <div className='col-md-6'>
                            <p><b>Rating:</b> {film.vote_average}</p>
                            <p><b>Budget:</b> {film.budget.toLocaleString()} $</p>
                            <p><b>Revenue:</b> {film.revenue} $</p>
                            <p><b>Popularity:</b> {film.popularity}</p>
                            <p><b>Release date:</b> {film.release_date}</p>
                            <p><b>Revenue:</b> {film.revenue}</p>
                            <p><b>Status:</b> {film.status}</p>
                        </div>
                    </div>
                </div>
                <p><b>Overview:</b> {film.overview}</p>
            </div>

            <div className='row'>

                {
                    actors.slice(actors, 9).map(item =>

                 <div className='col-md-2 '>
                     <Link to={`/person/${item.id}`} key={item.id}>
                         {item.profile_path === null ? <img className='moviesDetails-img' src={man} alt="#" height='400' width='300'/> :
                             <img className='moviesDetails-img' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`}
                                  alt="#"/>}
                         {/*<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`} width='138' height='175' alt="#"/>*/}
                        <div className='moviesDetails-title-div'>
                            <h5 className='moviesDetails-title'>{item.name}</h5>
                        </div>
                     </Link>
                 </div>
                    )

                }

            </div>

<div  className='moviesDetails-btn'>

    <button  onClick={handelWatchMOre}>watch more...</button>
</div>

       <div className='row'>
           {
               trailers.map(el =>
                   <div className='col-md-3'>


                               <Video key={el.id} id={el.key}/>

                   </div>

               )
           }
       </div>
        </div>
    )
}

export default MoviesDetails
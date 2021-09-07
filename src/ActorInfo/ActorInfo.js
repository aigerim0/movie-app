import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, useHistory, Link} from 'react-router-dom'
import noPhoto from "../img/noPhoto.jpg";
import man from "../img/ee5fb3d0-4d3c-43f4-ab2f-70d397f472e1.jpg";


const ActorInfo = () => {
    const [actor, setActor] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [film, setFilm] = useState([])
    const [isLoadingFilm, setIsLoadingFilm] = useState(true)
    const {id} = useParams()
    const history = useHistory()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${id}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActor(data)
                setIsLoading(false)
            })
        axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setFilm(data.cast)
                setIsLoadingFilm(false)
            })
    }, [id])
    const Back = () => {
        history.goBack()
    }
    if (isLoading || isLoadingFilm) {
        return 'Loading...'
    }
    return (
        <div>
            <div>
                <button className='backBtn' onClick={Back}><i className='btnBack bx  bx-arrow-back'></i></button>
            </div>
            <div className='row'>
                <div className='col-md-3 actorInfo-img'>
                  <div>
                      {
                          actor.profile_path === null  ?  <img className='moviesDetails-img' src={man} alt="#" height='400' width='300'/>:     <img  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt="#"/>
                      }
                  </div>
                </div>
           
                <div className='col-md-9'>

                    <h2>{actor.name}</h2>
                    <p>
                        <b>Biography:</b> {actor.biography ? actor.biography : `We don't have a biography for ${actor.name}. `}
                    </p>

                </div>
            </div>
            <div className='row'>
                <div className='col-md-4'>
                    <h5> Personal information</h5>
                    <p><b>Birthday:</b> {actor.birthday}</p>
                    <span><b>Place of Birth:</b> {actor.place_of_birth}</span>
                    <p><b>Also known as:</b>
                        {
                            actor.also_known_as.map((item) =>
                                <div>{item}</div>
                            )


                        }
                    </p>
                    <p>
                        <b>Gender:</b> {actor.gender === 2 ? "Male" : "Female"}
                    </p>
                    <p><b>Known for:</b> {actor.known_for_department}</p>
                </div>
                <div className='col-md-8'>

                    {
                        film.filter(el => !el.release_date).sort((a, b) => new Date(a) - new Date(b))
                            .map(item =>
                         <div className='d-flex release_date '>
                             <div>****-**-**</div>
                             <i className='bx bx-radio-circle allActors-icon'></i>
                             <Link to={`/movie/${item.id}`}>
                                 <div className='text-white'>{item.title}</div>
                             </Link>
                         </div>
                            )
                    }
                    {
                        film.filter(el => el.release_date).sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
                            .map(item =>
                                <div className='d-flex release_date '>
                                    <div>{item.release_date}</div>
                                    <i className='bx bx-radio-circle allActors-icon'></i>
                                    <Link to={`/movie/${item.id}`}>
                                        <div className='text-white'>{item.title}</div>
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div>
            <div className='row my-5'>
            {
                film.filter(el => el.vote_average).sort((a, b) => b.vote_average - a.vote_average).slice(0, 10).map(item =>

                    <div className='allActors-movie col-md-3  col-sm-6 md-3 allActors-movie-box ' >
                        <Link to={`/movie/${item.id}`}>

                                <div>{item.poster_path ?
                                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                                         alt={item.title} className='allActors-movie-img'/> :
                                    <img src={noPhoto} alt="#"/>}
                                </div>


                            <div className='allActors-movie-title'>{item.title}</div>
                        </Link>
                    </div>
                )
            }
            </div>
        </div>
    )

};

export default ActorInfo;
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, useHistory, Link} from 'react-router-dom'
import noPhoto from "../img/noPhoto.jpg";


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
                <div className='col-md-3'>
                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt="#"/>
                </div>
                <div className='col-md-9'>

                    <h2>{actor.name}</h2>
                    <p>
                        <b>Biography:</b> {actor.biography ? actor.biography : `We don't have a biography for ${actor.name}. `}
                    </p>

                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
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
                <div className='col-md-6'>

                    {
                        film.filter(el => !el.release_date).sort((a, b) => new Date(a) - new Date(b))
                            .map(item =>

                                <div>{item.title}</div>
                            )
                    }
                    {
                        film.filter(el => el.release_date).sort((a, b) => new Date(a.release_date) - new Date(b.release_date))
                            .map(item =>
                                <div className='d-flex'>
                                    <div>{item.release_date}</div>
                                    <Link to={`/movie/${item.id}`}>
                                        <div>{item.title}</div>
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </div>

            {
                film.filter(el => el.vote_average).sort((a, b) => b.vote_average - a.vote_average).slice(0, 10).map(item =>

                    <div>
                        <Link to={`/movie/${item.id}`}>
                            <div className='allActors-img'>
                                <div>{item.poster_path ?
                                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                                         className='movieImg w100 ' alt={item.title}/> :
                                    <img src={noPhoto} alt="#"/>}</div>
                            </div>
                            <div>{item.title}</div>
                        </Link>
                    </div>
                )
            }
        </div>
    )

};

export default ActorInfo;
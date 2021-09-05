import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams, useHistory} from 'react-router-dom'


const ActorInfo = () => {
    const [actor, setActor] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()
    const history = useHistory()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${id}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => {
                setActor(data)
                setIsLoading(false)
            })
    }, [id])
    const Back = () => {
        history.goBack()
    }
    if (isLoading) {
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
                    <div className='row'>
                        <div className='col-md-6'>
                            <p><b>Birthday:</b> {actor.birthday}</p>
                            <div><b>Place of Birth:</b> {actor.place_of_birth}</div>
                            <p><b>Also known as:</b>
                                {
                                    actor.also_known_as.map((item) =>
                                        <div>{item}</div>
                                    )


                                }
                            </p>
                        </div>
                        <div className='col-md-6'>
                            <p>
                                <b>Gender:</b> {actor.gender === 2 ? "Male" : "Female"}
                            </p>
                            <p><b>Known for:</b> {actor.known_for_department}</p>

                        </div>
                    </div>
                </div>
            </div>

            <p><b>Biography:</b> {actor.biography}</p>
        </div>
    )

};

export default ActorInfo;
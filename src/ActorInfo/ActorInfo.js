import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom'

const ActorInfo = () => {
    const [actor, setActor] = useState({})
    const {id} = useParams()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/person/${id}?api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActor(data))
    }, [id])
    return (
        <div>

            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt="#"/>
            <h2>{actor.name}</h2>
            <p>Birthday: {actor.birthday}</p>
            <p>Place of Birth: {actor.place_of_birth}</p>
            <div>
                {
                    actor.also_known_as.map((item) =>
                        <div>{item}</div>
                    )


                }
            </div>
<div>
    Gender: {actor.gender === 2 ? "Male" : "Female"}
</div>
            <div>Known for: {actor.known_for_department}</div>


            <p>{actor.biography}</p>


        </div>
    )

};

export default ActorInfo;
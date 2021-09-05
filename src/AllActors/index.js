import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import man from "../img/ee5fb3d0-4d3c-43f4-ab2f-70d397f472e1.jpg";


const AllActors = () => {
    const [film, setFilm] = useState({})
    const [actors,setActors] = useState([])
    const params = useParams()

    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) =>{
                setFilm(data)

            })
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActors(data.cast))
    }, [params])

    return (
        <div>

            <h3>{film.original_title}</h3>
        <div className='grid'>
            {
                actors.map(item =>
                    <Link to={`/person/${item.id}`} key={item.id}>

                        <div>
                            {/*<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`} width='138' height='175' alt="#"/>*/}
                            {item.profile_path === null ? <img src={man} alt="" height='300' width='300'/> :<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} alt=""/>}
                            <h4>Name:{item.name }</h4>
                            <h6>Character:{item.character}</h6>

                        </div>
                    </Link>

                )



            }
        </div>

        </div>
    );
};

export default AllActors;
import React, {useEffect, useState} from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import axios from "axios";
import man from "../img/ee5fb3d0-4d3c-43f4-ab2f-70d397f472e1.jpg";


const AllActors = () => {
    const [film, setFilm] = useState({})
    const [actors,setActors] = useState([])
    const params = useParams()
    const history = useHistory()


    useEffect(() => {
        axios(`https://api.themoviedb.org/3/movie/${params.id}?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) =>{
                setFilm(data)

            })
        axios(`https://api.themoviedb.org/3/movie/${params.id}/credits?&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setActors(data.cast))
    }, [params])
    const Back = () => {
        history.goBack()
    }
    return (
        <div>
<div>
    <button className='backBtn' onClick={Back}><i className='btnBack bx  bx-arrow-back'></i></button>
</div>
            <h3 className='allActors-title'>{film.original_title}</h3>
        <div className='row'>
            {
                actors.map(item =>


                        <div className='col-md-3 col-sm-6 md-3'>
                            <Link to={`/person/${item.id}`} key={item.id}>
                            {/*<img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${item.profile_path}`} width='138' height='175' alt="#"/>*/}
                            {item.profile_path === null ?  <img className='allActors-img' src={man} alt="#" /> :<img className='allActors-img' src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${item.profile_path}`} alt="#"/>}
                            <p className='allActors-name'>{item.name }</p>
                            </Link>
                        </div>


                )



            }
        </div>

        </div>
    );
};

export default AllActors;
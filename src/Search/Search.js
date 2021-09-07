import React, {useEffect, useState} from 'react';
import {useParams,Link} from "react-router-dom";
import axios from "axios";

const Search = () => {
    const [search, setSearch] = useState([])
    const [page,setPage] = useState(1)
    const [error,setError] = useState('')
    const searchParams = useParams()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/multi?api_key=6f19f87e3380315b9573c4270bfc863c&language=%27rus%27&query=${searchParams.name}&page=${page}&include_adult=false`)
            .then(({data}) => {
               if (data.results){
                   setSearch(data.results)
               }else {
                   setError('No results!')
               }
            })
    },[page,searchParams])
    return (
        <div className='row'>
            {
                search.map(el =>

                    <div className='col-md-3  col-sm-6 md-3' key={el.id}>
                        <Link to={`/movie/${el.id}`}>
                        <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${el.poster_path}`}
                            alt={el.title} width='100' height='150'/>
                        <div>{el.title}</div>
                        <div>
                            {error}
                        </div>
                        </Link>
                    </div>
                )
            }

        </div>
    )
}

export default Search;

///search/multi?QUERY=QWERTY&API_KEY&PAGE=1  api_key=6f19f87e3380315b9573c4270bfc863c language=%27rus%27
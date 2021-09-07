import {useEffect, useState} from "react";
import axios from "axios";
import {Link,useHistory} from "react-router-dom";
import noPhoto  from './img/noPhoto.jpg'

const Movies = () => {
    const [page, setPage] = useState(1)
    const [movie, setMovie] = useState([])
    const [search,setSearch] = useState('')
    const history = useHistory()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setMovie(data.results))
    }, [page])

    const handlePage = (num) => {
        setPage(num)
    }
    const handleInput = (e) => {
        setSearch(e.target.value)
    }
    const handleBtn = () => {
        if (search.trim()){
            history.push(`/search/multi/${search}`)
        }
    }
    return (

        <div>
            <div>
                <input className='search' onChange={handleInput} type="text" placeholder='Search...'/>
                <button onClick={handleBtn} className='search-btn' ><i className='bx bx-search'></i></button>
            </div>
            {
                [...Array(6).keys()].map((item, idx) =>
                    <button key={item} type='button'
                            className={`btn btn-secondary mx-1 ${page === item + 1 && 'btn-danger'}`}
                            onClick={() => handlePage(idx + 1)}>{idx + 1}</button>
                )
            }

            <div className='row my-5 '>
                {
                    movie.map((el, idx) =>
                        <div className='col-md-3  col-sm-6 md-3' key={el.id}>
                            <Link to={`/movie/${el.id}`}>
                             <div className='releases-item__poster'>
                                 <div className='movie-img'>
                                    <div>{el.poster_path ?    <img  src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${el.poster_path}`}
                                                                    className='movieImg w100 ' alt={el.title}/> : <img src={noPhoto} alt="#"/>}</div>
                                 </div>
                             </div>
                                <h3 className='title '> {el.original_title}</h3>

                            </Link>
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Movies


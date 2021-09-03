import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const Movies = () => {
    const [page, setPage] = useState(1)
    const [movie, setMovie] = useState([])
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/discover/movie?page=${page}&language=%27rus%27&api_key=6f19f87e3380315b9573c4270bfc863c`)
            .then(({data}) => setMovie(data.results))
    }, [page])

    const handlePage = (num) => {
        setPage(num)
    }
    return (

        <div>


            {
                Array(6).fill(0).map((item, idx) =>
                    <button className='pageBtn' onClick={() => handlePage(idx + 1)}>{idx + 1}</button>
                )
            }

                <div className='grid'>
                    {
                        movie.map((el, idx) =>
                            <div key={idx}>
                                <Link to={`/movie/${el.id}`}>
                                     <div>
                                         <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${el.poster_path}`} className='movieImg' alt='#' width='150' height='225'/>
                                     </div>
                                      <h4 className='title'> {el.original_title}</h4>
                                </Link>
                            </div>
                        )
                    }
                </div>

        </div>
    )
}

export default Movies


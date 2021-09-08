import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import noPhoto  from './img/noPhoto.jpg'

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

          <div className='pageBtns'>
              {
                  [...Array(6).keys()].map((item, idx) =>
                      <button key={item} type='button'
                              className={`btn btn-secondary mx-1  ${page === item + 1 && 'btn-danger'}`}
                              onClick={() => handlePage(idx + 1)}>{idx + 1}</button>
                  )
              }
          </div>

            <div className='row my-5 '>
                {
                    movie.map((el, idx) =>
                        <div className='col-md-3  col-sm-6 md-3' key={el.id}>
                          <div className='box'>
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
                        </div>
                    )
                }
            </div>

        </div>
    )
}

export default Movies


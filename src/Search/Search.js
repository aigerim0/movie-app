import React, {useEffect, useState} from 'react';
import {useParams,Link,useHistory} from "react-router-dom";
import axios from "axios";
import noPhoto from "../img/noPhoto.jpg";

const Search = () => {
    const [search, setSearch] = useState({})
    const [page,setPage] = useState(1)
const [loading,setLoading] = useState(true)
    const searchParams = useParams()
    const history = useHistory()
    useEffect(() => {
        axios(`https://api.themoviedb.org/3/search/movie?api_key=6f19f87e3380315b9573c4270bfc863c&language=%27rus%27&query=${searchParams.name}&page=${page}&include_adult=false`)
            .then(({data}) => {
                setSearch(data)
                setLoading(false)
            })
    },[page,searchParams])

    const Back = () => {
        history.goBack()
    }
    let Buttons = ''
    if (search.total_pages > 1 && page === 1) {
        Buttons = (
         <div className='btnDiv'>
             <button  className="btn  btn-danger " onClick={() => {
                 setPage(page + 1)
             }}>NEXT<i className='bx bx-chevron-right'></i></button>
         </div>
        )
    }else if (search.total_pages > page && page > 1){
        Buttons = (
            <div className='btnDiv'>
                <button  className="btn  btn-danger " onClick={() => {
                    setPage(page - 1)
                }}><i className='bx bx-chevron-left'></i>PREV</button>
                <button  className="btn  btn-danger " onClick={() => {
                    setPage(page + 1)
                }}>NEXT<i className='bx bx-chevron-right'></i></button>
            </div>
        )

    }else if(search.total_pages === page) {
      Buttons = (
       <div className='btnDiv'>
           <button  className="btn  btn-danger" onClick={() => {
               setPage(page - 1)
           }}><i className='bx bx-chevron-left'></i>PREV</button>
       </div>
      )
    }






    if (loading){
        return <div className='d-flex justify-content-center  align-items-center'>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    }
    return (
        <div className='row'>
    <div  className='row'>
        <div>
            <button className='backBtn' onClick={Back}><i className='btnBack bx  bx-arrow-back'></i></button>
        </div>
   <div  className='row my-5 '>
       {
           search.results.length ?  search.results.map(el =>

               <div className='col-md-3  col-sm-6 md-3' key={el.id}>
                  <div  className='box'>
                      <Link to={`/movie/${el.id}`}>
                        <div className='releases-item__poster'>
                            <div className='movie-img'>
                                <div>{el.poster_path ?
                                    <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${el.poster_path}`}
                                         className='movieImg w100 ' alt={el.title}/> :
                                    <img src={noPhoto} alt="#"/>}</div>
                                <div className='title '>{el.title}</div>
                            </div>
                        </div>

                      </Link>
                  </div>
               </div>
           ) :    <h3>Nothing found!</h3>


       }
   </div>
    </div>
<div className='pageButtons'>{Buttons}</div>
        </div>
    )
}

export default Search;

///search/multi?QUERY=QWERTY&API_KEY&PAGE=1  api_key=6f19f87e3380315b9573c4270bfc863c language=%27rus%27
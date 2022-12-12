import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom' 

export const MovieDetails = () => {
    let {movieId}=useParams();
    let [movieObject,setMovie]=useState({})
   

    async function getMoviesData(id){
        let {data}=await axios.get('https://api.themoviedb.org/3/movie/'+id+'?api_key=b402cde08ea031fa3c1aa59446870d59&language=en-US')
        setMovie(data)
        console.log(data)
    }
 


    useEffect(()=>{
        getMoviesData(movieId);
    },[])

  return (
    <>
    
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-4">
            <img src={`https://image.tmdb.org/t/p/w500${movieObject.poster_path}`} alt="" className="w-100 detailsImg"/>
            </div>
            <div className='col-md-8'>
            <h2>{movieObject.original_title}</h2>
            <h3>{`${movieObject.tagline}`}</h3>
            <h5 className='bg-dark'>{`IMDB ID:  ${movieObject.imdb_id}`}</h5>
            <h5 className='bg-dark'>{`Release Date:  ${movieObject.release_date}`}</h5>
            <p className='bg-dark'>{movieObject.overview}</p>
            
            
            </div>
        </div>
    </div>

    </>
  )
}

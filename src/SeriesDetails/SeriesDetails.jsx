import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom' 

export const SeriesDetails = () => {
    let {seriesId}=useParams();
    const [tvSeries,setTvSeries]= useState([])

    async function getSeriesData(id){
        let {data}=await axios.get('https://api.themoviedb.org/3/tv/'+id+'?api_key=b402cde08ea031fa3c1aa59446870d59&language=en-US')
        setTvSeries(data)
        console.log(data)
    }
  


    useEffect(()=>{
        getSeriesData(seriesId);
    },[])

  return (
    <>
    
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-4 ">
            <img src={`https://image.tmdb.org/t/p/w500${tvSeries.poster_path}`} alt="" className="w-100 detailsImg" />
            </div>
            <div className='col-md-8 '>
            <h2>{tvSeries.original_name}</h2>
            <h3>{`${tvSeries.tagline}`}</h3>
            <h5 className='bg-dark'>{`IMDB ID:  ${tvSeries.imdb_id}`}</h5>
            <h5 className='bg-dark'>{`Release Date:  ${tvSeries.release_date}`}</h5>
            <p className='bg-dark'>{tvSeries.overview}</p>
            
            
            </div>
        </div>
    </div>

    </>
  )
}

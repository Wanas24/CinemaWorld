import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Tvshow() {
  const [tvSeries,setTvSeries]= useState([])


  async function getData (mediaType , setfun){
    let {data}=await axios.get('https://api.themoviedb.org/3/trending/'+mediaType+'/day?api_key=b402cde08ea031fa3c1aa59446870d59')
   console.log(data.results);
   setfun(data.results);
   }
 
   useEffect(()=>{
    
     getData('tv',setTvSeries);
     
   },[])
 

  return (
    <>
    <div className="container mb-3 mt-3">
    <div className="row">
      <div className="col-md-4 col-4">
        <h2>trending <br /> series <br />to watch now</h2>
      </div>
      {tvSeries.map((series)=>{
        return <div key={series.id} className="col-md-2 col-4">
          <div>
          <Link to={`/SeriesDetails/${series.id}`} >
            <img src={`https://image.tmdb.org/t/p/w500${series.poster_path}`} alt="" className="w-100"/>
            </Link>
            <h5 className="bg-dark">{series.name}</h5>
          </div>
        </div>
      })}




    </div>
  </div>
    </>
  )
}

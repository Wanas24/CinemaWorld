import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MovieDetails } from "../MovieDetails/MovieDetails";


export default function Movies() {
  const [movies,setMovies]= useState([])

  async function getData (mediaType , setfun){
    let {data}=await axios.get('https://api.themoviedb.org/3/trending/'+mediaType+'/day?api_key=b402cde08ea031fa3c1aa59446870d59')
   console.log(data.results);
   setfun(data.results);
   }
 
   useEffect(()=>{
     getData('movie',setMovies);
   },[])

  return (
    <>
    
    <div className="container mb-3 mt-3">
    <div className="row">
      <div className="col-md-4 col-4">
        <h2>trending <br /> movies <br />to watch now</h2>
      </div>
      {movies.map((movie)=>{
        return <div key={movie.id} className="col-md-2 col-4">
          <div>
            <Link to={`/MovieDetails/${movie.id}`} >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="w-100"/>
            </Link>
            <h5 className="bg-dark">{movie.title}</h5>
          </div>
        </div>
      })}




    </div>
  </div>
    
    
    </>
  )
}

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function People() {
  const [actors,setActors]= useState([])

  async function getData (mediaType , setfun){
    let {data}=await axios.get('https://api.themoviedb.org/3/trending/'+mediaType+'/day?api_key=b402cde08ea031fa3c1aa59446870d59')
   console.log(data.results);
   setfun(data.results);
   }
 
   useEffect(()=>{
    getData('person',setActors);
  },[])

  return (
    <>
    <div className="container mb-3 mt-3">
    <div className="row">
      <div className="col-md-4 col-4">
        <h2>trending <br /> Actors <br />to follow now</h2>
      </div>
      {actors.map((actors)=>{
        return <div key={actors.id} className="col-md-2 col-4">
          <div>
          <Link to={`/actorDetails/${actors.id}`} >
            <img src={`https://image.tmdb.org/t/p/w500${actors.profile_path}`} alt="" className="w-100"/>
            </Link>
            <h5 className="bg-dark">{actors.name}</h5>
          </div>
        </div>
      })}




    </div>
  </div>
    </>
  )
}

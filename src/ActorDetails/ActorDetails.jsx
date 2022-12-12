import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom' 


export const ActorDetails = () => {
    let {actorId}=useParams();
    let [actors,setActors]= useState([])
   

    async function getActorsData(id){
        let {data}=await axios.get('https://api.themoviedb.org/3/person/'+id+'?api_key=b402cde08ea031fa3c1aa59446870d59&language=en-US')
        setActors(data)
        console.log(data)
    }
 


    useEffect(()=>{
        getActorsData(actorId);
    },[])

  return (
    <>
    
    <div className="container mt-5">
        <div className="row">
            <div className="col-md-4">
            
            <img src={`https://image.tmdb.org/t/p/w500${actors.profile_path}`} alt="" className="w-100 detailsImg"/>
            
            </div>
            <div className='col-md-8'>
            <h2>{actors.name}</h2>
            <h5 className='bg-dark'>{`IMDB ID:  ${actors.imdb_id}`}</h5>
            <p className='bg-dark'>{actors.biography}</p>
            
            
            </div>
        </div>
    </div>

    </>
  )
}

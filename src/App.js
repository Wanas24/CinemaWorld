import './App.css';
import Layout from './Layout/Layout';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Tvshow from './Tvshow/Tvshow';
import People from './People/People';
import Movies from './Movies/Movies';
// import About from './About/About';
import { MovieDetails } from './MovieDetails/MovieDetails';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Protectedroute } from './Protectedroute/Protectedroute';
import { SeriesDetails } from './SeriesDetails/SeriesDetails';
import { ActorDetails } from './ActorDetails/ActorDetails';





function App() {

  let [isLogin,setIsLogin]=useState(false);
  let [userName,setuserName]=useState('');

  useEffect(()=>{
    
    if(localStorage.getItem('token')){
      let token =localStorage.getItem('token')
      let userData = jwtDecode(token)
      setuserName(userData.first_name);
      setIsLogin(true);
      
    }
  },[isLogin])

  const routs = createBrowserRouter([
    {path:'/', element:<Layout userName={userName} isLogin={isLogin} setIsLogin={setIsLogin} />, children:[
      {index:true, element:<Register/> },
      {path:'home', element: <Protectedroute><Home/></Protectedroute>     },
      {path:'moviedetails/:movieId', element:<Protectedroute><MovieDetails/></Protectedroute>},
      {path:'seriesdetails/:seriesId', element:<Protectedroute><SeriesDetails/></Protectedroute>},
      {path:'actordetails/:actorId', element:<Protectedroute><ActorDetails/></Protectedroute>},
      {path:'login', element:<Login setIsLogin={setIsLogin} />},
      {path:'tv', element:<Protectedroute>  <Tvshow/></Protectedroute>},
      {path:'people', element:<Protectedroute><People/></Protectedroute>},
      {path:'movies', element:<Protectedroute><Movies/></Protectedroute>},
      // {path:'about', element:<Protectedroute><About/></Protectedroute>},
      {path:'*', element:<h1>error 44 notfound</h1>},
      
    ]}
   ])



  return (
    <>
 
    <RouterProvider router={routs}/>
   
    
    
    </>
  );
}

export default App;

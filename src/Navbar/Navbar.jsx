import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar(props) {

console.log(props.isLogin)

let redirect = useNavigate()

function logout(){
  redirect('/login')
  props.setIsLogin(false);
  localStorage.clear('token')
}


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow ">
        <div className="container">
          <a className="navbar-brand">
            Cinema world
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">


            {!props.isLogin ? <>
            
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "bg-danger  nav-link" : "nav-link"
                  }
                  to=""
                >
                  Register
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "bg-danger  nav-link" : "nav-link"
                  }
                  to="login"
                >
                  Login
                </NavLink>
              </li>

            </>:''}
              




{props.isLogin ?<>
  <li className="nav-item d-flex align-items-center text-danger ">
                <span>
                 Hello {props.userName}
                </span>
              </li>
  <li className="nav-item">
    
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger  nav-link" : "nav-link"
                  }
                  to="home"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger  nav-link" : "nav-link"
                  }
                  to="movies"
                >
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger  nav-link" : "nav-link"
                  }
                  to="Tv"
                >
                  TV Show
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger  nav-link" : "nav-link"
                  }
                  to="people"
                >
                  People
                </NavLink>
              </li>
              {/* <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-danger  nav-link" : "nav-link"
                  }
                  to="about"
                >
                  About
                </NavLink>
              </li> */}
           
                  

</>:''}
 
            

            </ul>


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              
              <div className="navicons d-flex">
              <li className="nav-item">
                <NavLink>
                  <i className="fab fa-facebook-f fa-fw "></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink>
                  <i className="fab fa-youtube fa-fw "></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink>
                  <i className="fab fa-spotify fa-fw "></i>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink>
                  <i className="fab fa-instagram fa-fw"></i>
                </NavLink>
              </li>
              
              </div>
              

              {props.isLogin ?<>

              <li className="nav-item d-flex align-items-center logout">
                <span  onClick={logout}>
                  Logout
                </span>
              </li>
              </>:''}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

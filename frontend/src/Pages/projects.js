import React, { useState, useEffect } from "react";
import './Key.css'

function Projects(props) {
  // create state to hold projects
  const [projects, setProjects] = useState(null);

  //create function to make api call
  const getProjectsData = async () => {
    try {
      //make api call and get response
      const response = await fetch(props.URL + "projects");
      // turn response into javascript object
      const data = await response.json();
      // set the projects state to the data
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // make an initial call for the data inside a useEffect, so it only happens once on component load
  useEffect(() => {
    getProjectsData();
  }, []); // empty dependency array ensures this effect only runs once

  // define a function that will return the JSX needed once we get the data
  const loaded = () => {
    return projects.map((project) => (
        <div className="box">
      <div className="key" key={project.id}> {/* added key prop for optimization */}
        <h1>{project.name}</h1>
        <img src={project.image} alt={project.name} /> {/* added alt attribute */}
        <div className="btn">
        <a href={project.git}>
          <button>Github</button>
        </a>
        <a href={project.live}>
          <button>frontend</button>
         </a>  
       
        <a href={project.netlify}>
          <button>backend</button>
          </a>  
          </div>
      </div>
      </div>
    ));
  };

  return projects ? loaded() : <h1>Loading...</h1>;
}

export default Projects;
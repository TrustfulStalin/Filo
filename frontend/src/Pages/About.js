import { useState, useEffect } from "react";

function About(props) {
  // create state to hold about data
  const [about, setAbout] = useState(null);

  // create function to make api call
  const getAboutData = async () => {
    // make api call and get response
    const response = await fetch(props.URL + "about");
    // turn response into javascript object
    const data = await response.json();
    // set the about state to the data
    setAbout(data);
  };

  // make an initial call for the data inside a useEffect, so it only happens once on component load
  useEffect(() => getAboutData(), []);

  // define a function that will return the JSX needed once we get the data
  const loaded = () => (
    <div className="aboutback">
      <h2 className="name">{about.name}</h2>
      <h3 className="email">{about.email}</h3>
      <img className="headshot" src = {about.headshot}/>
      <p className="bio">{about.bio}</p>
      <a href={'https://www.linkedin.com/in/tevon-talbert-409968217'}>
  <button>My Linkedin profile</button>
</a>

<a href={'https://www.linkedin.com/feed/update/urn:li:ugcPost:7212725187975290880/'}>
  <button>My Resume</button>
  
</a>

    </div>
  );

  // if data arrives return the result of loaded, if not, an h1 that says loading
  return about ? loaded() : <h1>Loading...</h1>;
}

export default About;
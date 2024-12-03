import { useState, useEffect } from "react";

function About({ URL }) {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchURL = `${URL}/about`; // Ensure the URL is well-formed

    fetch(fetchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`); // Catch HTTP errors and include status text
        }
        return response.json();
      })
      .then((data) => {
        setAboutData(data); // Set the fetched data
        setLoading(false); // Set loading to false once the data is received
      })
      .catch((error) => {
        setError(error.message); // Catch and display any errors
        setLoading(false); // Set loading to false in case of error
      });
  }, [URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error message
  }

  return (
    <div className="about-container">
      <h1>About Us</h1>

      {/* Display the name, bio, email, and headshot */}
      <div className="about-info">
        {aboutData ? (
          <>
            <div className="about-header">
              {aboutData.headshot && (
                <img
                  src={aboutData.headshot} // Display the headshot image
                  alt={aboutData.name}
                  className="headshot"
                />
              )}
              <h2>{aboutData.name}</h2>
            </div>

            <p>{aboutData.bio}</p>
            {aboutData.email && (
              <p>Email: <a href={`mailto:${aboutData.email}`}>{aboutData.email}</a></p>
            )}
          </>
        ) : (
          <p>No information available</p> // Fallback if no aboutData is available
        )}
      </div>
    </div>
  );
}

export default About;
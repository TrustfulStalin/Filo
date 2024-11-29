import { useState, useEffect } from "react";

function About({ URL }) {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchURL = `${URL}about`; // Adjust the endpoint if needed

    fetch(fetchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setAboutData(data); // Set the fetched data
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error.message); // Handle any errors
        setLoading(false); // Set loading to false
      });
  }, [URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>About Us</h1>
      <p>{aboutData ? aboutData.description : "No information available"}</p>
    </div>
  );
}

export default About;
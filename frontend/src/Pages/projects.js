import { useState, useEffect } from "react";

function Projects({ URL }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Construct the fetch URL for the backend endpoint
    const fetchURL = `${URL}projects`; // Adjust the endpoint as needed

    // Fetch data from your backend
    fetch(fetchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        setProjects(data); // Store the fetched data
        setLoading(false); // Set loading state to false
      })
      .catch((error) => {
        setError(error.message); // Handle error if fetch fails
        setLoading(false); // Set loading state to false
      });
  }, [URL]); // Re-run fetch when URL changes (if applicable)

  // Render the component based on the states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
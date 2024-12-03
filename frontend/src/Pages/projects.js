import { useState, useEffect } from "react";
import "./Projects.css"; // Import your CSS file for styling (you can name it anything you like)

function Projects({ URL }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchURL = `${URL}/projects`; // Adjust the endpoint as needed

    // Fetch data from your backend
    fetch(fetchURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data"); // Handle unsuccessful response
        }
        return response.json(); // Parse the JSON if the response is OK
      })
      .then((data) => {
        setProjects(data); // Store the fetched data
        setLoading(false); // Set loading state to false
      })
      .catch((error) => {
        setError(error.message); // Handle error if fetch fails
        setLoading(false); // Set loading state to false even if there's an error
      });
  }, [URL]); // Re-run fetch when URL changes (if applicable)

  // Function to handle navigation
  const handleRedirect = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="projects-container">
      <h1>Projects</h1>
      <div className="projects-list">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div className="project-card" key={project.id}>
              <img
                src={project.image} // Assuming the image URL is part of the project data
                alt={project.name}
                className="project-image"
              />
              <h3>{project.name}</h3>
              <p>{project.description}</p>

              {/* Links to the live version and the GitHub repository */}
              <div className="project-links">
                <button
                  className="link-button"
                  onClick={() => handleRedirect(project.live)}
                >
                  Live
                </button>
                <button
                  className="link-button"
                  onClick={() => handleRedirect(project.git)}
                >
                  GitHub
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No projects available.</p>
        )}
      </div>
    </div>
  );
}

export default Projects;
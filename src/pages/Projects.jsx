import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProjects, createProject } from '../services/project'
import Button from '../components/Button'
import Slider from '../components/slider/Slider'
import ProjectForm from '../components/form/ProjectForm'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [showSlider, setShowSlider] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects()
      setProjects(allProjects)
    }
    fetchProjects()
  }, [])

  const handleCreateProject = async (project) => {
    const newProject = await createProject({
      name: project.name,
      description: project.description,
    })
    setProjects([...projects, newProject])
  }

  return (
    <div>
      <Button onClick={() => setShowSlider(true)}>Create New Project</Button>
      {projects.map((project) => (
        <div key={project.id} className="p-4 border-b border-gray-200">
          <Link to={`/projects/${project.id}`} className="block">
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <small>{project.id}</small>
            <p className="text-sm text-gray-600">{project.description}</p>
          </Link>
        </div>
      ))}
      <Slider show={showSlider}>
        <ProjectForm
          type="create"
          onSubmit={handleCreateProject}
          onDismiss={() => setShowSlider(false)}
        ></ProjectForm>
      </Slider>
    </div>
  )
}

export default Projects

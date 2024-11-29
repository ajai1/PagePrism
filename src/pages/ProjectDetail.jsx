import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProject, updateProject } from '../services/project'
import Button from '../components/Button'
import styles from './ProjectDetail.module.css'
import Slider from '../components/slider/Slider'
import ProjectForm from '../components/form/ProjectForm'

const ProjectDetail = () => {
  const [project, setProject] = useState(null)
  const [showSlider, setShowSlider] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    const fetchProject = async () => {
      const projectData = await getProject(id)
      setProject(projectData)
    }
    fetchProject()
  }, [id])

  if (!project) {
    return <div>Loading...</div>
  }

  const handleEditProject = async (proj) => {
    const updatedProject = await updateProject(project.id, proj)
    setProject(updatedProject)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{project.name}</h1>
      <p className={styles.description}>{project.description}</p>
      <div className={styles.section}>
        <h2 className={styles.subheading}>Project Details</h2>
        <p>
          <strong>Created:</strong>{' '}
          {new Date(project.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{' '}
          {new Date(project.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.section}>
        <h2 className={styles.subheading}>Inspirations</h2>
        {project.inspirations?.length > 0 ? (
          <ul className={styles.inspirationList}>
            {project.inspirations.map((inspiration) => (
              <li key={inspiration.id}>
                {inspiration.websiteMetadata.title ||
                  inspiration.websiteMetadata.url}
              </li>
            ))}
          </ul>
        ) : (
          <p>No inspirations added yet.</p>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <Button
          className={styles.editButton}
          onClick={() => setShowSlider(true)}
        >
          Edit Project
        </Button>
        <Button className={styles.deleteButton}>Delete Project</Button>
      </div>
      <Slider show={showSlider}>
        <ProjectForm
          type="edit"
          project={project}
          onSubmit={(project) => {
            handleEditProject(project)
          }}
          onDismiss={() => setShowSlider(false)}
        ></ProjectForm>
      </Slider>
    </div>
  )
}

export default ProjectDetail

import React, { useState } from 'react'
import Button from '../Button'
import { Project } from '../../models/schema'
import styles from "./projectform.module.css"

type ProjectFormProps = {
    type: "create" | "edit" | "delete",
    project?: Project,
    onSubmit: (project: FormValue) => void,
    onDismiss: () => void
}

type FormValue = {
    name: string,
    description: string
}

const ProjectForm = ({ type, project, onSubmit, onDismiss }: ProjectFormProps) => {

    const [formValue, setFormValue] = useState<FormValue>({
        name: "",
        description: ""
    })

    const handleFormValues = (key: "name" | "description", value: string) => {
        setFormValue((prev) => {
            const update = { ...prev };
            update[key] = value;
            return update;
        })
    }

    const onSubmitHandler = (e: React.ChangeEvent) => {
        e.preventDefault()
        onSubmit(formValue);
        onDismissHandler(e);
    }
    const onDismissHandler = (e: React.ChangeEvent) => {
        e.preventDefault()
        setFormValue({
            name: "",
            description: ""
        })
        onDismiss();
    }

    const getFields = () => {
        if (type === "delete") {
            return (<>
                <p>Are you sure you want to remove {project?.name} project</p>
            </>)
        } else {
            return (<>
                <fieldset className='my-2 flex flex-col'>
                    <label htmlFor="project_name_input">Project Name</label>
                    <input className={styles.inputStyles} id='project_name_input'
                        type='text' placeholder={type === "create" ? 'Enter the project name' : project?.name} value={formValue.name}
                        onChange={(e) => handleFormValues("name", e.target.value)}>
                    </input>
                </fieldset>
                <fieldset className='my-2 flex flex-col'>
                    <label htmlFor="project_name_input">Project Description</label>
                    <textarea className={styles.inputStyles} id='project_name_input'
                        rows={5} placeholder={type === "create" ? 'Enter the project description' : project?.description}
                        value={formValue.description}
                        onChange={(e) => handleFormValues("description", e.target.value)}>
                    </textarea>
                </fieldset>
            </>)
        }
    }


    const title = type === "create" ? "Create" : type === "edit" ? "Edit" : "Delete"

    return (
        <form className='flex flex-col p-4 w-96'>
            <header className='text-xl'>{title} Project</header>
            {getFields()}
            <fieldset className='my-2 flex gap-2 justify-center'>
                <Button className="bg-blue-500 hover:bg-blue-600" onClick={onSubmitHandler}>{title}</Button>
                <Button className="bg-red-500 hover:bg-red-600" onClick={onDismissHandler}>Dismiss</Button>
            </fieldset>
        </form>
    )
}

export default ProjectForm

import { render, screen } from "@testing-library/react"
import ProjectForm from "../ProjectForm"

const onSubmitMock = jest.fn();
const onDismissMock = jest.fn();

test("Type == create should contain 2 input fields", () => {
    render(<ProjectForm type="create" onSubmit={onSubmitMock} onDismiss={onDismissMock} />)
    const inputFieldProjectName = screen.getByPlaceholderText("Enter the project name");
    expect(inputFieldProjectName).toBeInTheDocument();
    const inputFieldDescription = screen.getByPlaceholderText("Enter the project description");
    expect(inputFieldDescription).toBeInTheDocument();
})

test("Type == create should contain 2 input fields", () => {
    render(<ProjectForm type="create" onSubmit={onSubmitMock} onDismiss={onDismissMock} />)
    const inputFieldProjectName = screen.getByPlaceholderText("Enter the project name");
    expect(inputFieldProjectName).toBeInTheDocument();
    const inputFieldDescription = screen.getByPlaceholderText("Enter the project description");
    expect(inputFieldDescription).toBeInTheDocument();
})
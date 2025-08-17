import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CreatePhraseForm } from "../create-phrase-form";

describe("CreatePhraseForm", () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders textarea, label, and button", () => {
        render(<CreatePhraseForm onSubmit={mockOnSubmit} />);
        expect(screen.getByLabelText(/Frase/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/En qué estas pensando/i)).toBeInTheDocument();
        expect(screen.getByRole("button")).toHaveTextContent("Crear frase");
    });

    it("calls onSubmit with content when form is submitted", () => {
        render(<CreatePhraseForm onSubmit={mockOnSubmit} />);
        const textarea = screen.getByPlaceholderText(/En qué estas pensando/i);
        fireEvent.change(textarea, { target: { value: "Test phrase" } });

        const form = screen.getByRole("form");
        fireEvent.submit(form!);

        expect(mockOnSubmit).toHaveBeenCalledWith("Test phrase");
    });

    it("shows error message when error prop is provided", () => {
        render(<CreatePhraseForm onSubmit={mockOnSubmit} error="Error message" />);
        expect(screen.getByText("Error message")).toBeInTheDocument();
    });

    it("disables textarea and button when isLoading is true", () => {
        render(<CreatePhraseForm onSubmit={mockOnSubmit} isLoading />);
        expect(screen.getByPlaceholderText(/En qué estas pensando/i)).toBeDisabled();
        expect(screen.getByRole("button")).toBeDisabled();
        expect(screen.getByRole("button")).toHaveTextContent("Creando...");
    });

    it("shows default button text when isLoading is false", () => {
        render(<CreatePhraseForm onSubmit={mockOnSubmit} isLoading={false} />);
        expect(screen.getByRole("button")).toHaveTextContent("Crear frase");
    });
});
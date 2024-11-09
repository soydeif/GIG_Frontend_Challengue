import { createMemoryHistory } from 'history';
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Formulary } from "@/components/ContactForm/Stateless/Formulary";
import "@testing-library/jest-dom";
import { UseFormRegister } from "react-hook-form";
import { contactItem } from "@/types/contacts";
import { Router } from "react-router-dom";

describe("Formulary Component", () => {
    const mockOnSubmit = jest.fn();
    const mockHandleDelete = jest.fn();
    const mockCountries = [{ name: "Austria", code: "AT" }];
    const mockRegister = jest.fn(() => ({
        name: "country",
        onChange: jest.fn(),
        onBlur: jest.fn(),
        ref: jest.fn(),
    })) as unknown as UseFormRegister<contactItem>;
    const mockHandleSubmit = jest.fn((fn) => fn);

    const history = createMemoryHistory();

    const mockErrors = {
        firstName: { message: "First name is required" },
        lastName: { message: "Last name is required" },
        email: { message: "Email is required" },
        country: { message: "Country is required" },
    };

    beforeEach(() => {
        HTMLFormElement.prototype.submit = jest.fn();
        const originalConsoleError = console.error;
        console.error = (...args) => {
            if (args[0].includes("Not implemented: HTMLFormElement.prototype.submit")) {
                return;
            }
            originalConsoleError(...args);
        };
        afterEach(() => {
            console.error = originalConsoleError;
        });
    });


    const renderForm = (errors = {}) => {
        const originalError = console.error;
        const originalWarn = console.warn;
        console.error = jest.fn();
        console.warn = jest.fn();
        render(
            <Router history={history}>
                <Formulary
                    handleDelete={mockHandleDelete}
                    onSubmit={mockOnSubmit}
                    register={mockRegister}
                    handleSubmit={mockHandleSubmit}
                    errors={errors}
                    countries={mockCountries}
                    history={history}
                    id={undefined}
                />
            </Router>
        );
        console.error = originalError;
        console.warn = originalWarn;
    };

    it("renders form fields correctly", () => {
        renderForm();
        expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Lastname")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("example@example.com")).toBeInTheDocument();
        expect(screen.getByLabelText("Country *")).toBeInTheDocument();
    });

    it("calls onSubmit when the form is submitted", () => {
        renderForm();
        const saveButton = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveButton);
        expect(mockOnSubmit).toHaveBeenCalled();
    });

    it("displays error messages when fields are invalid", () => {
        renderForm(mockErrors);
        expect(screen.getByText("First name is required")).toBeInTheDocument();
        expect(screen.getByText("Last name is required")).toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
        expect(screen.getByText("Country is required")).toBeInTheDocument();
    });

    it("calls handleDelete when delete button is clicked", () => {
        const originalError = console.error;
        const originalWarn = console.warn;
        console.error = jest.fn();
        console.warn = jest.fn();
        render(
            <Router history={history}>
                <Formulary
                    handleDelete={mockHandleDelete}
                    onSubmit={mockOnSubmit}
                    register={mockRegister}
                    handleSubmit={mockHandleSubmit}
                    errors={{}}
                    countries={mockCountries}
                    history={history}
                    id="some-id"
                />
            </Router>
        );
        console.error = originalError;
        console.warn = originalWarn;

        const deleteButton = screen.getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);
        expect(mockHandleDelete).toHaveBeenCalled();
    });

    it("navigates to the home page when the cancel button is clicked", () => {
        renderForm();
        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        fireEvent.click(cancelButton);
        expect(history.location.pathname).toBe("/");
    });
});

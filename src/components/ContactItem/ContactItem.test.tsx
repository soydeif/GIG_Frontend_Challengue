import React from 'react';
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactItem } from "@/components/ContactItem/ContactItem";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useHistory: () => ({ push: mockNavigate }),
    };
});

const mockContact = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    country: "USA",
};

const renderContactItem = () => {
    const originalError = console.error;
    const originalWarn = console.warn;
    console.error = jest.fn();
    console.warn = jest.fn();

    render(
        <MemoryRouter>
            <ContactItem contact={mockContact} />
        </MemoryRouter>
    );

    console.error = originalError;
    console.warn = originalWarn;
};

describe("ContactItem Component", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("renders contact information", () => {
        renderContactItem();

        expect(screen.getByText(mockContact.firstName)).toBeInTheDocument();
        expect(screen.getByText(mockContact.lastName)).toBeInTheDocument();
        expect(screen.getByText(mockContact.email)).toBeInTheDocument();
        expect(screen.getByText(mockContact.country)).toBeInTheDocument();
    });

    it("navigates to edit page when edit button is clicked", () => {
        renderContactItem();

        const editButton = screen.getByRole("button");
        fireEvent.click(editButton);

        expect(mockNavigate).toHaveBeenCalledWith(`/edit/${mockContact.id}`);
    });
});

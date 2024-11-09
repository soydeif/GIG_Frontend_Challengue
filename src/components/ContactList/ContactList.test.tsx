import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactList } from "@/components/ContactList/ContactList";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");
    return {
        ...actual,
        useHistory: () => ({ push: mockNavigate }),
    };
});

jest.mock("@/hooks/useContacts", () => ({
    useContacts: () => ({
        contacts: [],
        loading: false,
        error: null,
    }),
}));

describe("ContactList Component", () => {
    const disableConsoleWarnings = () => {
        const originalError = console.error;
        const originalWarn = console.warn;
        console.error = jest.fn();
        console.warn = jest.fn();
        return () => {
            console.error = originalError;
            console.warn = originalWarn;
        };
    };

    it("navigates to add contact page on button click", () => {
        const restoreConsole = disableConsoleWarnings();

        render(
            <MemoryRouter>
                <ContactList />
            </MemoryRouter>
        );
        restoreConsole();

        const addButton = screen.getByText("New Contact");
        fireEvent.click(addButton);

        expect(mockNavigate).toHaveBeenCalledWith("/add");
    });

    it("renders empty state message when there are no contacts", () => {
        const restoreConsole = disableConsoleWarnings();

        render(
            <MemoryRouter>
                <ContactList />
            </MemoryRouter>
        );
        restoreConsole();

        const emptyMessage = screen.queryByText("No content available. Try to add some");
        expect(emptyMessage).toBeInTheDocument();
    });
});

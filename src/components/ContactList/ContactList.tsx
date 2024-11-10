import React from "react";
import { useHistory } from "react-router-dom";
import { useContacts } from "@/hooks/useContacts";
import { contactItem } from "@/types/contacts";
import { Icons } from "@/assets/icons/Icons";
import styles from "@components/ContactList/ContactList.module.css"
import EmptyContent from "@components/common/EmptyContent/EmptyContent";
import { Button } from "@/components/common/Button";
import { ContactItem } from "@/components/ContactItem/ContactItem";

export const ContactList = () => {
    const { contacts, loading, error } = useContacts();

    const history = useHistory();

    const handleAddContact = () => {
        history.push("/add");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


    return (
        <div className={styles?.container}>
            <Button
                className={`button ${styles?.addContact}`}
                onClick={handleAddContact}
            >
                <Icons type="add" />
                <span>New Contact</span>
            </Button>
            <div className={styles?.headline}>
                <span >First Name</span>
                <span >Last Name</span>
                <span >Email</span>
                <span >Country</span>
                <span >Actions</span>
            </div>
            {contacts.map((contact: contactItem) => (
                <ContactItem key={contact?.id} contact={contact} />
            ))}
            {contacts.length === 0 && <EmptyContent />}
        </div>
    );
};

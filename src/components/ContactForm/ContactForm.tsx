import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { getData } from "country-list";
import { v4 as uuidv4 } from "uuid";
import { contactItem } from "@/types/contacts";
import { useContacts } from "@/hooks/useContacts";
import { Formulary } from "@/components/ContactForm/Stateless/Formulary";
import { useFormPersistence } from "@hooks/useFormPersistence";
import { handleDeleteConfirmation } from "@utils/handleDeleteConfrimation";

export const ContactForm = () => {
    const { addContact, contacts, removeContact, saveContact } = useContacts();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const countries = getData();

    const { register, handleSubmit, setValue, reset,
        formState: { errors }, watch } = useForm<contactItem>({
            defaultValues: {
                id: id || uuidv4(),
                firstName: "",
                lastName: "",
                email: "",
                country: "",
            },
        });

    useFormPersistence(id, reset, watch, contacts);

    const onSubmit: SubmitHandler<contactItem> = (data) => {
        if (id) {
            saveContact(data);
        } else {
            addContact(data);
        }
        sessionStorage.removeItem(`tempContact-${id || "new"}`);
        history.push("/");
    };

    const handleDelete = () => {
        if (id) {
            handleDeleteConfirmation(id, removeContact, history);
        }
    };

    return (
        <Formulary
            {...{ handleDelete, onSubmit, register, handleSubmit, errors, countries, history, id }} />
    );
};

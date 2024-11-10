import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { getData } from "country-list";
import { v4 as uuidv4 } from "uuid";
import { contactItem } from "@/types/contacts";
import { useContacts } from "@/hooks/useContacts";
import { useContactById } from "@/hooks/useContactById";
import toast from "react-hot-toast";
import { ConfirmationToast } from "@/components/common/ConfirmationToast/ConfirmationToast";
import { handleContactSubmit } from "@/utils/handleContactSubmit";
import { Formulary } from "@/components/ContactForm/Stateless/Formulary";

export const ContactForm = () => {
    const { addContact, editContact, contacts, removeContact } = useContacts();
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const countries = getData();

    const { register, handleSubmit, setValue, reset, formState: { errors }, } = useForm<contactItem>({
        defaultValues: {
            id: id || uuidv4(),
            firstName: "",
            lastName: "",
            email: "",
            country: "",
        },
    });

    useContactById(id, contacts, setValue);

    const onSubmit: SubmitHandler<contactItem> = (data) =>
        handleContactSubmit(data, id, addContact, editContact, history);

    const handleDelete = () => {
        if (id) {
            toast(
                (t) => (
                    <ConfirmationToast
                        onDelete={() => {
                            removeContact(id);
                            history.push("/");
                            toast.dismiss(t.id);
                        }}
                        onCancel={() => toast.dismiss(t.id)}
                    />
                ),
                {
                    position: "top-center",
                    duration: Infinity,
                }
            );
        }
    };

    return (
        <Formulary
            {...{ handleDelete, onSubmit, register, handleSubmit, errors, countries, history, id }} />
    );
};

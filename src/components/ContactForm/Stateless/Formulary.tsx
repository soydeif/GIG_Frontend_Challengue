import React from "react";
import styles from "@components/ContactForm/ContactForm.module.css";
import { validationRules } from "@/utils/formValidation";
import { TextInput } from "@/components/common/TextInput";
import { SelectInput } from "@/components/common/SelectInput";
import { Button } from "@/components/common/Button";
import { FormularyProps } from "@/types/contacts";

export const Formulary: React.FC<FormularyProps> = ({ handleDelete, onSubmit, register, handleSubmit, errors, countries, history, id }) => {
    return (
        <form className={styles?.contactForm} onSubmit={handleSubmit(onSubmit)} role="form">
            <TextInput
                label="First Name *"
                register={register("firstName", validationRules.firstName)}
                error={errors.firstName}
                placeholder="Name"
                type="text"
            />

            <TextInput
                label="Last Name *"
                register={register("lastName", validationRules.lastName)}
                error={errors.lastName}
                placeholder="Lastname"
                type="text"
            />

            <TextInput
                label="Email *"
                register={register("email", validationRules.email)}
                error={errors.email}
                placeholder="example@example.com"
                type="email"
            />

            <SelectInput
                label="Country *"
                register={register("country", validationRules.country)}
                error={errors.country}
                options={countries}
            />

            <div className={styles?.controls}>
                <Button
                    children={id ? "Update" : "Save"}
                    type="submit"
                    className={`button ${styles?.btnUpdate}`}
                />
                <Button
                    children="Cancel"
                    onClick={() => history.push("/")}
                    className={`button ${styles?.btnCancel}`}
                />
                {id && (
                    <Button
                        children="Delete"
                        onClick={handleDelete}
                        className={`button ${styles?.btnDelete}`}
                    />
                )}
            </div>
        </form>
    )
}


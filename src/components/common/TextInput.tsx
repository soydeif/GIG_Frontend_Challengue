import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

type TextInputProps = {
    label: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    placeholder: string;
    type?: string;
    className?: string;
};

export const TextInput = ({
    label,
    register,
    error,
    placeholder,
    type = "text",
    className,
}: TextInputProps) => (
    <>
        <label>{label}</label>
        <input
            type={type}
            {...register}
            placeholder={placeholder}
            className={className}
        />
        {error && <p>{error.message}</p>}
    </>
);

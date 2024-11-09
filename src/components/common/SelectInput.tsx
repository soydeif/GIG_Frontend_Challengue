import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import React from "react";

type SelectInputProps = {
    label: string;
    className?: string;
    register: UseFormRegisterReturn;
    error?: FieldError;
    options: { name: string; code: string }[];
};

export const SelectInput = ({
    label,
    register,
    error,
    options,
    className,
}: SelectInputProps) => {
    const selectId = register?.name;
    return (
        <>
            <label htmlFor={selectId}>{label}</label>
            <select id={selectId} {...register} className={className}>
                <option value="" hidden>
                    Select
                </option>
                {options.map((option) => (
                    <option value={option.name} key={option.code}>
                        {option.name} ({option.code})
                    </option>
                ))}
            </select>
            {error && <p>{error.message}</p>}
        </>
    );
};

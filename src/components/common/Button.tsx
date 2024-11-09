import { MouseEventHandler, CSSProperties } from "react";
import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    type?: "button" | "submit" | "reset";
    style?: CSSProperties;
};

export const Button = ({
    children,
    onClick,
    type = "button",
    style,
    className,
}: ButtonProps) => (
    <button className={className} type={type} onClick={onClick} style={style}>
        {children}
    </button>
);

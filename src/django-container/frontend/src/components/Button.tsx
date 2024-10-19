import style from "./Button.module.css";
import {Link, useNavigate} from "react-router-dom";
import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    primary?: boolean;
    className?: string;

    to?: string;
    back?: boolean;
};

/**
 * Universal button component
 * @param children - stuff inside the button
 * @param primary - style of the button
 * @param to - if present, button will be a link
 * @param back - if present, button will be a back button.
 * <br>
 * If none of to and back are present, button will be a simple button
 * @param props - additional props for the button
 */
export default function Button({children, primary, to, back, ...props}: ButtonProps) {
    const className = [style.button, primary ? style.primary : "", props.className].join(" ").trim();
    return to ? (
        <LinkButton {...props} to={to} className={className}>
            {children}
        </LinkButton>
    ) : back ? (
        <BackButton {...props} className={className}>
            {children}
        </BackButton>
    ) : (
        <SimpleButton {...props} className={className}>
            {children}
        </SimpleButton>
    );
}

export function LinkButton({children, ...props}: ButtonProps & {
    to: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
    return <Link {...props}>{children}</Link>;
}

export function SimpleButton({children, ...props}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return <button {...props}>{children}</button>;
}

export function BackButton({children, ...props}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const navigate = useNavigate();
    return <SimpleButton onClick={() => navigate(-1)} {...props}>{children}</SimpleButton>;
}

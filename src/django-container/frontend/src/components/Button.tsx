import style from "./Button.module.css";
import {Link} from "react-router-dom";
import React from "react";

type ButtonProps = {
    children: React.ReactNode;
    to?: string;
    primary?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Button({children, to, primary, ...props}: ButtonProps) {
    const className = [style.button, primary ? style.primary : "", props.className].join(" ").trim();
    return to ? (
        <Link to={to} {...props} className={className}>
            {children}
        </Link>
    ) : (
        <button {...props} className={className}>
            {children}
        </button>
    );
}

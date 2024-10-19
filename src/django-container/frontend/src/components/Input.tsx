import style from "./Input.module.css";
import React from "react";

type InputProps = {
    label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({label, ...props}: InputProps) {
    const className = [style.input, props.className].join(" ");
    return label ? (
        <label className={style.label}>
            {label}
            <input {...props} className={className}/>
        </label>
    ) : (
        <input {...props} className={className}/>
    );
}

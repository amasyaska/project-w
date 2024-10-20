import style from "./Input.module.css";
import React from "react";

type InputProps = {
    label?: string;
    text?:boolean;
    className?:string;
    [key:string]: unknown;
};

export default function Input({label, text, ...props}: InputProps) {
    const className = [style.input, props.className].join(" ");
    const inp = text ? <textarea {...props} className={className}/> : <input {...props} className={className}/>;
    return label ? (
        <label className={style.label}>
            {label}
            {inp}
        </label>
    ) : (
        inp
    );
}

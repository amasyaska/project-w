import style from "./Input.module.css";

export default function Input({
    label,
    ...props
}: Readonly<{ label?: string } & React.InputHTMLAttributes<HTMLInputElement>>) {
    const className = [style.input, props.className].join(" ");
    return label ? (
        <label className={style.label}>
            {label}
            <input {...props} className={className} />
        </label>
    ) : (
        <input {...props} className={className} />
    );
}

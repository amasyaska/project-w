import style from "./Button.module.css";
import { Link } from "react-router-dom";

export default function Button({
    children,
    to,
    primary,
    ...props
}: Readonly<{
    children?: React.ReactNode;
    to?: string;
    primary?: boolean;
    [key: string]: any;
}>) {
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

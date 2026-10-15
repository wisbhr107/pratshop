import clsx from "clsx";
import styles from "./Boto.module.css";

type Props = {
  children: string;
  type?: "button" | "submit";
  variant?: "principal" | "secundari";
  disabled?: boolean;
  onClick?: () => void;
};

export default function Boto({
  children,
  type = "button",
  variant = "principal",
  disabled = false,
  onClick,
}: Props) {
  return (
    <button
      type={type}
      className={clsx(styles.boto, styles[variant])}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

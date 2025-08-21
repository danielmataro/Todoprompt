import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "electric" | "outline-light";
  size?: "lg" | "xl";
};

const Button: React.FC<Props> = ({ variant="electric", size="lg", className="", children, ...props }) => {
  const v = variant === "electric" ? "electric" : "outline-light";
  const s = "btn";
  return <button {...props} className={`${s} ${v} ${className}`}>{children}</button>;
}

export { Button };
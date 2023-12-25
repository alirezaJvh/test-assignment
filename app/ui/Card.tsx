import React from "react";
import { Button } from "@/app/ui/Button";

export interface ButtonProps {
  size?: "medium" | "large";
  type?: "button" | "submit";
  variant?: "contained" | "tonal" | "outlined";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

interface CardProps {
  children?: Array<React.ReactNode & { type: React.ReactNode }>;
}

interface CardTitleProps {
  children?: React.ReactNode;
}

interface CardBodyProps extends CardTitleProps {
  className?: string;
}

const BASE_CARD_CLASSES =
  "w-full bg-white pt-4 px-4 sm:px-6 rounded-xl border border-slate-300";

export function Card({ children }: CardProps) {
  const title = children?.find(child => child?.type === Card.Title);
  const button = children?.find(child => child?.type === Card.Button);
  const body = children?.find(child => child?.type === Card.Body);
  return (
    <div className={`${BASE_CARD_CLASSES} ${body ? "pb-10" : "pb-4"}`}>
      <div className="flex items-center justify-between">
        {title}
        {button}
      </div>
      {body && <div className="w-full h-[1px] bg-slate-300 mt-3" />}
      {body}
    </div>
  );
}

Card.Title = function title({ children }: CardTitleProps) {
  return (
    <h2 className="text-xl font-semibold text-slate-700 leading-10">
      {children}
    </h2>
  );
};

Card.Body = function body({ children, className }: CardBodyProps) {
  return <div className={`pt-6 ${className && className}`}>{children}</div>;
};

Card.Button = function button({
  type = "button",
  variant = "outlined",
  disabled = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <div>
      <Button
        type={type}
        variant={variant}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </Button>
    </div>
  );
};

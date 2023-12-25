"use client";

import React, { useMemo } from "react";

export interface ButtonProps {
  size?: "medium" | "large";
  type?: "button" | "submit";
  variant?: "contained" | "tonal" | "outlined";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const BASE_BUTTON_CLASSES =
  "text-sm font-semibold flex justify-center items-center gap-2 rounded-lg transition-colors w-full";

export function Button({
  size = "medium",
  variant = "contained",
  disabled = false,
  type = "button",
  children,
  onClick,
}: ButtonProps) {
  const setPrimaryClass = () => {
    switch (variant) {
      case "tonal": {
        return "text-brand-500 bg-brand-50 hover:bg-brand-100";
      }
      case "outlined": {
        return "text-brand-500 border border-brand-500 hover:bg-brand-100";
      }
      default: {
        return "text-white bg-brand-500 hover:bg-brand-400";
      }
    }
  };

  const setDisabledClass = () => {
    switch (variant) {
      case "tonal": {
        return "text-neutral-500 bg-neutral-300 ";
      }
      case "outlined": {
        return "text-neutral-500 border border-neutral-500";
      }
      default: {
        return "text-neutral-400 bg-neutral-300";
      }
    }
  };

  const setClassByTypeAndVariant = () => {
    const styleType = !disabled ? "primary" : "disabled";
    switch (styleType) {
      case "disabled": {
        return setDisabledClass();
      }
      default: {
        return setPrimaryClass();
      }
    }
  };

  const computedClass = useMemo(() => {
    const sizeClass = size === "medium" ? "py-2 px-4" : "py-3 px-6";
    const modeClass = setClassByTypeAndVariant();
    return [modeClass, sizeClass].join(" ");
  }, [size, disabled, variant]);

  return (
    <button
      type={type === "button" ? "button" : "submit"}
      className={`${BASE_BUTTON_CLASSES} ${computedClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

'use client';

import React, { useMemo } from 'react';

export interface ButtonProps {
    size?: 'medium' | 'large';
    type?: 'button' | 'submit'
    variant?: 'contained' | 'tonal' | 'outlined';
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: () => void;
}


const BASE_BUTTON_CLASSES =
  'text-sm font-semibold flex justify-center items-center gap-2 rounded-lg transition-colors w-full';

export function Button({
  size = 'medium',
  variant = 'contained',
  disabled = false,
  type='button',
  children,
  onClick,
}: ButtonProps) {

    const setPrimaryClass = (variant: string) => {
        console.log(variant)
      switch (variant) {
        case 'tonal': {
          return 'text-brand-500 bg-brand-50 hover:bg-brand-100';
        }
        case 'outlined': {
          return 'text-brand-500 border border-brand-500 hover:bg-brand-100';
        }
        default: {
          return 'text-white bg-brand-500 hover:bg-brand-400';
        }
      }
    };
    
    const setDisabledClass = (variant: string) => {
      switch (variant) {
        case 'tonal': {
          return 'text-neutral-500 bg-neutral-300 ';
        }
        case 'outlined': {
          return 'text-neutral-500 border border-neutral-500';
        }
        default: {
          return 'text-neutral-400 bg-neutral-300';
        }
      }
    };

    const setClassByTypeAndVariant = (
        disabled: boolean,
        variant: string,
      ) => {
          
        const styleType = !disabled ? 'primary' : 'disabled';
        console.log('here')
        switch (styleType) {
          case 'disabled': {
            return setDisabledClass(variant);
          }
          default: {
            return setPrimaryClass(variant);
          }
        }
      };

  const computedClass = useMemo(() => {
    const sizeClass = size === 'medium' ? 'py-2 px-4' : 'py-3 px-6';
    const modeClass = setClassByTypeAndVariant(disabled, variant);
    return [modeClass, sizeClass].join(' ');
  }, [size, disabled, variant]);



  return (
    <button
      type={type}
      className={`${BASE_BUTTON_CLASSES} ${computedClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

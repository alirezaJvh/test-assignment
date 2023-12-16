'use client'

import { useRef, ChangeEvent, useState, useMemo, KeyboardEvent } from 'react';

export interface TextFieldProps {
    title?: string;
    placeholder?: string;
    hint?: string;
    error?: string;
    initValue?: string;
    onChange?: (value: string) => void;
    onClick?: (value: string) => void;
}


const BASE_CLASSES =
  'flex gap-2 py-3 px-4 w-full border rounded-lg transition-colors transition-shadow text-sm';
const INPUT_CLASSES = 'w-full appearance-none focus:outline-none';

export function TextField({
  title,
  placeholder,
  hint,
  error,
  onClick,
  initValue,
  onChange,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(initValue || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const containerClasses = ` ${
    isFocused
      ? 'border-brand-500 hover:border-brand-500 hover:shadow-focus'
      : 'border-slate-300 hover:border-slate-500 hover:shadow-field'
  }`;
  const errorClasses = 'border-red-600 hover:border-red-600 hover:shadow-error';

  const computedClass = useMemo(() => {
    return error ? errorClasses : containerClasses;
  }, [error, containerClasses]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      setValue(event.target.value);
      onChange(event.target.value);
    }
  };

  const handleContainerClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleOnClick = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (onClick) onClick(value);
    }
  };

  return (
    <div
      role="presentation"
      className="flex flex-col gap-2 w-full"
      onClick={handleContainerClick}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div className="text-sm font-medium">{title}</div>
      <div className={`${BASE_CLASSES} ${computedClass}`}>
        <input
          type="text"
          ref={inputRef}
          value={value}
          className={INPUT_CLASSES}
          placeholder={placeholder}
          onKeyDown={e => handleOnClick(e)}
          onChange={handleInputChange}
        />
      </div>
      {error ? (
        <div className="text-red-600 text-sm">{error}</div>
      ) : (
        <div className="text-slate-600 text-sm">{hint}</div>
      )}
    </div>
  );
}

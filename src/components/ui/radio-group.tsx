"use client";

import {
  HTMLAttributes,
  forwardRef,
  createContext,
  useContext,
  InputHTMLAttributes,
} from "react";

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  name: string;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(
  undefined
);

export interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      onValueChange,
      name = `radio-group-${Math.random().toString(36).substring(7)}`,
      disabled = false,
      orientation = "vertical",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      ${orientation === "vertical" ? "flex flex-col gap-4" : "flex flex-row flex-wrap gap-6"}
    `;

    return (
      <RadioGroupContext.Provider
        value={{ value, onChange: onValueChange, name, disabled }}
      >
        <div
          ref={ref}
          className={`${baseStyles} ${className}`}
          role="radiogroup"
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

export interface RadioGroupItemProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value: string;
  label?: string;
  disabled?: boolean;
}

const RadioGroupItem = forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ value, label, disabled: itemDisabled, className = "", id, ...props }, ref) => {
    const context = useContext(RadioGroupContext);

    if (!context) {
      throw new Error("RadioGroupItem must be used within RadioGroup");
    }

    const { value: groupValue, onChange, name, disabled: groupDisabled } = context;
    const isDisabled = groupDisabled || itemDisabled;
    const isChecked = groupValue === value;
    const radioId = id || `${name}-${value}`;

    const handleClick = () => {
      if (!isDisabled && onChange) {
        onChange(value);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleClick();
      }
    };

    const containerStyles = `
      flex items-center gap-3
      cursor-pointer
      ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

    const boxStyles = `
      relative
      w-7 h-7
      border-2 border-black
      shadow-[3px_3px_0_0_#000]
      transition-all duration-100 ease-out
      flex items-center justify-center
      ${
        !isDisabled
          ? "hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0_0_#000]"
          : ""
      }
      ${isChecked ? "bg-white" : "bg-white"}
    `;

    const innerBoxStyles = `
      w-4 h-4
      bg-black
      transition-all duration-100 ease-out
      ${isChecked ? "opacity-100 scale-100" : "opacity-0 scale-0"}
    `;

    const labelStyles = `
      font-bold
      uppercase
      tracking-wider
      text-base
      select-none
    `;

    return (
      <label className={`${containerStyles} ${className}`}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => handleClick()}
          className="sr-only"
          role="radio"
          aria-checked={isChecked}
          {...props}
        />
        <div
          className={boxStyles}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          tabIndex={isDisabled ? -1 : 0}
        >
          <div className={innerBoxStyles} />
        </div>
        {label && <span className={labelStyles}>{label}</span>}
      </label>
    );
  }
);

RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };

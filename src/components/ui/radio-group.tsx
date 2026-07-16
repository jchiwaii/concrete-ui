"use client";

import {
  HTMLAttributes,
  forwardRef,
  createContext,
  useContext,
  InputHTMLAttributes,
  useId,
  useState,
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
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      name,
      disabled = false,
      orientation = "vertical",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const generatedName = useId();
    const groupName = name || generatedName;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue = value ?? internalValue;

    const handleValueChange = (nextValue: string) => {
      if (value === undefined) setInternalValue(nextValue);
      onValueChange?.(nextValue);
    };

    const baseStyles = `
      ${orientation === "vertical" ? "flex flex-col gap-4" : "flex flex-row flex-wrap gap-6"}
    `;

    return (
      <RadioGroupContext.Provider
        value={{ value: currentValue, onChange: handleValueChange, name: groupName, disabled }}
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

    const containerStyles = `
      flex items-center gap-3
      cursor-pointer
      ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
    `;

    const boxStyles = `
      relative
      w-7 h-7
      border-2 border-black
      shadow-[var(--ui-shadow)]
      transition-all duration-100 ease-out
      flex items-center justify-center
      ${
        !isDisabled
          ? "hover:-translate-x-px hover:-translate-y-px hover:shadow-[var(--ui-shadow-md)]"
          : ""
      }
      ${isChecked ? "bg-[var(--ui-surface)]" : "bg-[var(--ui-surface)]"}
    `;

    const innerBoxStyles = `
      w-4 h-4
      bg-black
      transition-all duration-100 ease-out
      ${isChecked ? "opacity-100 scale-100" : "opacity-0 scale-0"}
    `;

    const labelStyles = `
      text-sm font-medium
      select-none
    `;

    return (
      <label htmlFor={radioId} className={`${containerStyles} ${className}`}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={isChecked}
          disabled={isDisabled}
          onChange={() => !isDisabled && onChange?.(value)}
          className="peer sr-only"
          {...props}
        />
        <div
          className={`${boxStyles} peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-3 peer-focus-visible:outline-black`}
          aria-hidden="true"
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

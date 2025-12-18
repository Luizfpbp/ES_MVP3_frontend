import React from "react";
import {
  SelectRoot,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./SelectItems";
import { cn } from "../../utils";

type option = {
  value: string;
  label: string;
};

interface SelectProps {
  options: option[];
  className?: string;
  placeholder?: string;
  selectTriggerClassName?: string;
  selectContentClassName?: string;
  onChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({
    options,
    className,
    placeholder = "Selecione",
    selectTriggerClassName,
    selectContentClassName,
    onChange,
    ...props
  }) => {
    return (
      <SelectRoot onValueChange={onChange} {...props}>
        <div className={cn("border border-black rounded-xl w-full", className)}>
          <SelectTrigger className={selectTriggerClassName}>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className={selectContentClassName}>
            {options.map((opt, index) => (
              <SelectItem key={`${opt.value}-${index}`} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </div>
      </SelectRoot>
    );
  }
);

export default Select;

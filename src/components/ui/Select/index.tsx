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
  placeholder?: string;
  options: option[];
  selectTriggerClassName?: string;
  selectContentClassName?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({
    placeholder = "Selecione",
    options,
    selectTriggerClassName,
    selectContentClassName,
    ...props
  }) => {
    return (
      <SelectRoot {...props}>
        <SelectTrigger
          className={cn("w-full md:w-[200px]", selectTriggerClassName)}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={selectContentClassName}>
          {options.map((opt, index) => (
            <SelectItem key={`${opt.value}-${index}`} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    );
  }
);

export default Select;

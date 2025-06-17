import React, { FC, ChangeEvent } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type InputComponentProp = {
  name: string;
  title?: string;
  placeHolder?: string;
  type: string;
  disabled?: boolean;
  value?: string | number; 
  accept?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void; 
};

const InputComponent: FC<InputComponentProp> = ({
  name,
  title,
  placeHolder,
  type,
  disabled,
  accept,
  value
}) => {
  return (
    <FormField
      name={name}
      render={({ field }) => (
        <FormItem className="text-start text-semibold">
          <FormLabel className="font-semibold">{title}:</FormLabel>
          <FormControl>
            <Input
              {...field} 
              placeholder={placeHolder}
              className="w-full"
              accept={accept}
              type={type}
              value={value} 
              onChange={field.onChange} 
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputComponent;
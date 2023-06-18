"use client";

import ReactSelect from "react-select";

interface SelectProps {
  disabled?: boolean;
  label: string;
  value: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
}

export default function Select({
  label,
  onChange,
  options,
  value,
  disabled,
}: SelectProps) {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        <div className="mt-2">
          <ReactSelect
            isDisabled={disabled}
            value={value}
            onChange={onChange}
            isMulti
            options={options}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
            classNames={{
              control: () => "text-sm",
            }}
          />
        </div>
      </label>
    </div>
  );
}

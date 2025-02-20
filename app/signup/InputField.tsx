import React from 'react';

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
  <div className="relative">
    <label htmlFor={name} className="block text-sm font-medium text-base-content mb-1">
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-dark" />
      </div>
      <input
        id={name}
        name={name}
        type={type}
        required
        className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 focus:ring-2 focus:ring-indigo-600 focus:border-transparent py-3 text-sm"
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

export default InputField;

import { useId } from "react";
import { ChevronDown } from "lucide-react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export function Select({ error, className = "", placeholder, id: externalId, options, ...props }: SelectProps) {
  const internalId = useId();
  const id = externalId || internalId;

  return (
    <div className="w-full relative mb-1">
      <div className="relative">
        <select
          {...props}
          id={id}
          className={`peer w-full px-4 pt-[24px] pb-2 min-h-[54px] bg-[#E5E7EB] border-none rounded-lg text-gray-800 appearance-none focus:outline-none focus:ring-2 transition-all duration-300 ${
            error ? "focus:ring-red-500 ring-2 ring-red-500/50" : "focus:ring-[#FF5A1F]"
          } ${className}`}
        >
          {placeholder && <option value="" disabled hidden>{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        
        {placeholder && (
          <label
            htmlFor={id}
            className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-focus:top-4 peer-focus:-translate-y-3 peer-focus:scale-75 pointer-events-none"
          >
            {placeholder}
          </label>
        )}

        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
          <ChevronDown size={20} />
        </div>
      </div>
      <span
        className={`absolute left-1 -bottom-4 text-[11px] font-medium text-red-500 transition-all duration-300 ${
          error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
        role="alert"
      >
        {error}
      </span>
    </div>
  );
}

import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, className = "", placeholder, type, id: externalId, ...props }: InputProps) {
  const internalId = useId();
  const id = externalId || internalId;
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const currentType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full relative mb-1">
      <div className="relative">
        <input
          {...props}
          type={currentType}
          id={id}
          placeholder=" "
          aria-invalid={error ? "true" : "false"}
          className={`peer w-full px-4 pt-[24px] pb-2 min-h-[54px] bg-[#E5E7EB] border-none rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:ring-2 transition-all duration-300 ${isPassword ? "pr-12" : ""} ${
            error ? "focus:ring-red-500 ring-2 ring-red-500/50" : "focus:ring-[#FF5A1F]"
          } ${className}`}
        />
        {placeholder && (
          <label
            htmlFor={id}
            className="absolute left-4 top-4 z-10 origin-[0] -translate-y-3 scale-75 transform text-gray-500 duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-4 peer-focus:-translate-y-3 peer-focus:scale-75 pointer-events-none"
          >
            {placeholder}
          </label>
        )}
        
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
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
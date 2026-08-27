import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  error?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
}

function Input({ className, type, error, prefixIcon, suffixIcon, ...props }: InputProps) {
  const hasError = Boolean(error);

  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        {prefixIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center justify-center text-muted-foreground z-10">
            {prefixIcon}
          </div>
        )}

        <input
          type={type}
          data-slot="input"
          aria-invalid={hasError ? "true" : undefined}
          className={cn(
            "h-10 w-full min-w-0 rounded-xl border border-transparent bg-input/50 px-3 text-base transition-[color,box-shadow] duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-3 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            prefixIcon && "pl-9",
            suffixIcon && "pr-10",
            hasError
              ? "border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20"
              : "focus-visible:border-ring focus-visible:ring-ring/30",
            className
          )}
          {...props}
        />

        {suffixIcon && (
          <div className="pointer-events-none absolute right-3 flex items-center justify-center text-muted-foreground z-10">
            {suffixIcon}
          </div>
        )}
      </div>

      <span
        className={cn(
          "absolute left-1 -bottom-4 text-[11px] font-medium text-destructive transition-all duration-200",
          hasError
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0"
        )}
        role="alert"
      >
        {error}
      </span>
    </div>
  );
}

export { Input };
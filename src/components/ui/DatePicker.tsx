"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerProps {
  date?: string;
  setDate: (date: string) => void;
  placeholder?: string;
  error?: string;
}

export function DatePicker({
  date,
  setDate,
  placeholder,
  error,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const today = React.useMemo(() => {
    const now = new Date();

    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }, []);

  const selectedDate = React.useMemo(() => {
    if (!date) return undefined;

    try {
      return parseISO(date);
    } catch {
      return undefined;
    }
  }, [date]);

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(format(newDate, "yyyy-MM-dd"));
      setIsOpen(false);
    }
  };

  const isFloating = !!date || isOpen;

  return (
    <div className="relative w-full">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            className={cn(
              "relative h-14 w-full justify-between rounded-lg border-2 bg-[#E5E7EB] px-4 pt-[24px] pb-2 text-left font-normal text-gray-800 shadow-none transition-all hover:bg-[#E5E7EB] focus:outline-none",
              error
                ? "border-red-500/60 focus:border-red-500"
                : "border-transparent focus:border-[#FF5A1F]",
              !date && "text-transparent",
            )}
          >
            <span
              className={cn(
                "truncate pr-8",
                date ? "text-gray-800" : "text-transparent",
              )}
            >
              {date && selectedDate ? format(selectedDate, "dd/MM/yyyy") : " "}
            </span>

            <CalendarIcon
              size={18}
              className="absolute right-4 text-gray-400"
            />

            {placeholder && (
              <span
                className={cn(
                  "pointer-events-none absolute left-4 z-10 origin-[0] transform text-gray-500 transition-all duration-200",
                  isFloating
                    ? "top-4 -translate-y-3 scale-75"
                    : "top-1/2 -translate-y-1/2 scale-100",
                )}
              >
                {placeholder}
              </span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            disabled={{ before: today }}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>

      <span
        className={cn(
          "absolute left-1 -bottom-4 text-[11px] font-medium text-red-500 transition-all duration-300",
          error
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
        role="alert"
      >
        {error}
      </span>
    </div>
  );
}

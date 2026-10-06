"use client";

import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    date?: string;
    setDate: (date: string) => void;
    placeholder?: string;
    error?: string;
}

export function DatePicker({ date, setDate, placeholder, error }: DatePickerProps) {
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
                            "flex h-10 w-full min-w-0 items-center justify-between border border-input bg-background px-3 text-left font-normal shadow-none outline-none transition-[color,box-shadow] duration-200 hover:bg-background focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 md:text-sm",
                            error
                                ? "border-destructive/60 focus-visible:border-destructive focus-visible:ring-destructive/20"
                                : "",
                            !date && "text-muted-foreground",
                        )}
                    >
                        <span className="truncate">
                            {date && selectedDate ? format(selectedDate, "dd/MM/yyyy") : placeholder}
                        </span>
                        <CalendarIcon className="h-4 w-4 shrink-0 text-muted-foreground opacity-50" />
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
                    error ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
                )}
                role="alert"
            >
                {error}
            </span>
        </div>
    );
}

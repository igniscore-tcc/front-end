"use client"

import * as React from "react"
import { format, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  date?: string
  setDate: (date: string) => void
  placeholder?: string
  error?: string
}

export function DatePicker({ date, setDate, placeholder, error }: DatePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const selectedDate = React.useMemo(() => {
    if (!date) return undefined
    try {
      return parseISO(date)
    } catch {
      return undefined
    }
  }, [date])

  const handleSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(format(newDate, "yyyy-MM-dd"))
      setIsOpen(false)
    }
  }

  const isFloating = !!date || isOpen

  return (
    <div className="w-full relative mb-1">
      <div className="relative">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              className={cn(
                "w-full flex items-center justify-between px-4 pt-[24px] pb-2 min-h-[54px] bg-[#E5E7EB] hover:bg-[#E5E7EB] border-none rounded-lg text-gray-800 focus:outline-none focus:ring-2 transition-all duration-300 text-left font-normal overflow-hidden shadow-none",
                error ? "focus:ring-red-500 ring-2 ring-red-500/50" : "focus:ring-[#FF5A1F]",
                !date && "text-transparent" 
              )}
            >
              <span className={cn(
                "truncate pr-8", 
                date ? "text-gray-800" : "text-transparent"
              )}>
                {date && format(selectedDate!, "dd/MM/yyyy")}
              </span>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <CalendarIcon size={18} />
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>

        {placeholder && (
          <label
            className={cn(
              "absolute left-4 z-10 origin-[0] transform text-gray-500 duration-200 pointer-events-none transition-all",
              isFloating 
                ? "top-4 -translate-y-3 scale-75" 
                : "top-1/2 -translate-y-1/2 scale-100"
            )}
          >
            {placeholder}
          </label>
        )}
      </div>

      <span
        className={cn(
          "absolute left-1 -bottom-4 text-[11px] font-medium text-red-500 transition-all duration-300",
          error ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        )}
        role="alert"
      >
        {error}
      </span>
    </div>
  )
}

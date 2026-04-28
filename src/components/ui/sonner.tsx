"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CheckCircle2, Info, AlertTriangle, XCircle, Loader2 } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      icons={{
        success: <CheckCircle2 className="size-5 text-emerald-500/80" />,
        info: <Info className="size-5 text-blue-500/80" />,
        warning: <AlertTriangle className="size-5 text-amber-500/80" />,
        error: <XCircle className="size-5 text-red-500/80" />,
        loading: <Loader2 className="size-5 text-[#FF5A1F]/80 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast: "group toast bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-xl px-5 py-3 flex items-center gap-4 font-sans animate-in fade-in slide-in-from-top-2 duration-300",
          title: "text-[13px] font-semibold tracking-tight",
          description: "text-xs font-medium opacity-70",
          success: "bg-green-50 text-green-700 border-green-200",
          error: "bg-red-50 text-red-700 border-red-200",
          info: "bg-blue-50 text-blue-700 border-blue-200",
          warning: "bg-amber-50 text-amber-700 border-amber-200",
          actionButton: "bg-[#FF5A1F] text-white font-bold rounded-lg px-3 py-1.5 text-xs hover:bg-[#E64D17] transition-all active:scale-95",
          cancelButton: "bg-gray-100 text-gray-600 font-bold rounded-lg px-3 py-1.5 text-xs hover:bg-gray-200 transition-all",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }

"use client";

import { useEffect } from "react";
import { Button } from "./ui/button";
import { X, Check } from "lucide-react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptAndContinue: () => void;
  isChecked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function TermsModal({
  isOpen,
  onClose,
  onAcceptAndContinue,
  isChecked,
  onCheckedChange,
}: TermsModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-900">
            Termos e condições
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100/50 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
          >
            <span className="sr-only">Fechar</span>
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">1. Introdução</h3>
            <p className="leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">2. Empresas</h3>
            <p className="leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus. Maecenas eget condimentum velit, sit amet
              feugiat lectus.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              3. Privacidade e Dados
            </h3>
            <p className="leading-relaxed">
              Curabitur nec elit ut erat condimentum venenatis in vel quam. Nam
              non dui et nisl viverra fringilla. Phasellus rhoncus, nulla at
              semper lacinia, sapien metus congue nulla, sed pellentesque metus
              felis sit amet justo.
            </p>
          </div>
        </div>

        <div className="p-6 pt-4 border-t border-gray-100 flex flex-col gap-5 bg-gray-50/50">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer appearance-none w-5 h-5 border border-gray-300 rounded-md checked:bg-[#FF5A1F] checked:border-[#FF5A1F] transition-all cursor-pointer outline-none focus:ring-2 focus:ring-[#FF5A1F]/30"
                checked={isChecked}
                onChange={(e) => onCheckedChange(e.target.checked)}
              />
              <Check
                className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                strokeWidth={3}
              />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              Li e aceito os termos de serviços
            </span>
          </label>

          <div className="flex items-center justify-between w-full">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2.5 h-auto text-sm font-semibold rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 border-none transition-colors cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onAcceptAndContinue}
              className="px-6 py-2.5 h-auto text-sm font-semibold rounded-lg bg-[#FF5A1F] text-white hover:bg-[#FF5A1F]/90 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
              disabled={!isChecked}
            >
              Aceitar e continuar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

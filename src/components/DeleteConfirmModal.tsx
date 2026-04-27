"use client";

import { X, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import type { Cliente } from "@/types/cliente";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  client: Cliente | null;
}

export function DeleteConfirmModal({ isOpen, onClose, onConfirm, client }: Props) {
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

  if (!isOpen || !client) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} />
            Confirmar exclusão
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="p-8 space-y-4">
          <p className="text-gray-600 leading-relaxed">
            Tem certeza que deseja excluir o cliente <span className="font-bold text-gray-900">"{client.nome}"</span>?
          </p>
          <p className="text-sm text-red-500 bg-red-50 p-3 rounded-lg border border-red-100">
            Esta ação não poderá ser desfeita e todos os dados associados serão removidos.
          </p>
        </div>

        <div className="p-6 bg-gray-50/50 border-t border-dashed border-gray-200 flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="px-6 py-2 h-auto text-sm font-bold rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 border-none transition-colors cursor-pointer"
          >
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            className="px-6 py-2 h-auto text-sm font-bold rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm cursor-pointer"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}

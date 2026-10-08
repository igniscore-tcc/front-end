"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useUserForm } from "@/hooks/useUserForm";
import type { User } from "@/types/user"; 

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  userToEdit?: User | null;
}

export function AddUserModal({
  isOpen,
  onClose,
  onSave,
  userToEdit,
}: UserModalProps) {
  const { form, setField, errors, isEditing, submitting, handleSubmit } =
    useUserForm({
      isOpen,
      userToEdit,
      onSave,
      onClose,
    });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          onClose();
        }
      }}
    >
      <DialogContent className="max-w-md p-0 gap-0 overflow-hidden">
        <DialogHeader className="border-b px-6 py-5 sm:px-8">
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Editar usuário" : "Adicionar usuário"}
          </DialogTitle>

          <DialogDescription>
            {isEditing
              ? "Atualize as informações do usuário."
              : "Preencha os dados abaixo para cadastrar um novo usuário."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 px-6 py-6 sm:px-8">
            <div className="flex flex-col space-y-2">
              <label htmlFor="user-name" className="text-sm font-medium">
                Nome
              </label>

              <Input
                id="user-name"
                placeholder="Nome completo"
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                error={errors.name}
                disabled={submitting}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="user-email" className="text-sm font-medium">
                E-mail
              </label>

              <Input
                id="user-email"
                type="email"
                placeholder="email@exemplo.com"
                value={form.email}
                onChange={(e) => setField("email", e.target.value)}
                error={errors.email}
                disabled={submitting}
              />
            </div>

            {!isEditing && (
              <div className="rounded-md border bg-muted/40 px-4 py-3">
                <p className="text-xs leading-5 text-muted-foreground">
                  Uma senha temporária será gerada automaticamente e enviada
                  para o e-mail informado. No primeiro acesso, o usuário deverá
                  definir uma nova senha.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="border-t bg-muted/30 px-6 py-4 sm:px-8">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={submitting}
              className="w-full sm:w-auto"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto"
            >
              {submitting
                ? "Salvando..."
                : isEditing
                  ? "Salvar alterações"
                  : "Adicionar usuário"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

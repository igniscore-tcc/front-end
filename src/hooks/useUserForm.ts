"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { User } from "@/types/user";

interface UseUserFormProps {
  isOpen: boolean;
  userToEdit?: User | null;
  onSave: () => void;
  onClose: () => void;
}

type UserForm = {
  name: string;
  email: string;
};

export function useUserForm({
  isOpen,
  userToEdit,
  onSave,
  onClose,
}: UseUserFormProps) {
  const [form, setForm] = useState<UserForm>({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!userToEdit;

  useEffect(() => {
    if (!isOpen) return;

    if (userToEdit) {
      setForm({
        name: userToEdit.name,
        email: userToEdit.email,
      });
    } else {
      setForm({
        name: "",
        email: "",
      });
    }

    setErrors({
      name: "",
      email: "",
    });
  }, [isOpen, userToEdit]);

  const setField = (field: keyof UserForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validate = () => {
    const newErrors = {
      name: "",
      email: "",
    };

    let valid = true;

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();

    if (!name) {
      newErrors.name = "Nome obrigatório";
      valid = false;
    }

    if (!email) {
      newErrors.email = "E-mail obrigatório";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "E-mail inválido";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSubmitting(true);

    try {
      const endpoint = isEditing ? "/api/auth/users/update" : "/api/auth/users";

      const response = await fetch(endpoint, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...(isEditing && {
            id: userToEdit.id,
          }),
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            (isEditing
              ? "Não foi possível atualizar o usuário"
              : "Não foi possível cadastrar o usuário"),
        );
      }

      toast.success(
        isEditing
          ? "Usuário atualizado com sucesso"
          : "Usuário cadastrado com sucesso. A senha temporária foi enviada por e-mail.",
      );

      onSave();
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao salvar usuário",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return {
    form,
    setField,
    errors,
    isEditing,
    submitting,
    handleSubmit,
  };
}

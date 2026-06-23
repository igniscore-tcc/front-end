"use client";

import { createContext, useContext } from "react";
import { Me } from "@/types/me";

type AuthContextType = {
  user: Me | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
});

export function AuthProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: Me | null;
}) {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

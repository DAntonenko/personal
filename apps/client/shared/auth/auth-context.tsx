"use client";

import { createContext, useContext } from "react";
import type { CurrentUser } from "./getCurrentUser";

const AuthContext = createContext<CurrentUser>(null);

export function AuthProvider({
  user,
  children
}: {
  user: CurrentUser;
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}

export function useCurrentUser() {
  return useContext(AuthContext);
}

import { useActor, useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext, useMemo } from "react";
import { createActor } from "../backend";

interface AuthContextValue {
  principal: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loginStatus: string;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { identity, login, clear, loginStatus } = useInternetIdentity();
  const { actor, isFetching } = useActor(createActor);

  const principal = useMemo(
    () => (identity ? identity.getPrincipal().toText() : null),
    [identity],
  );

  const isAuthenticated = loginStatus === "success" && !!principal;

  const { data: isAdminFromBackend = false } = useQuery<boolean>({
    queryKey: ["is-admin", principal],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  const isAdmin = isAuthenticated ? isAdminFromBackend : false;

  const signIn = async () => {
    await login();
  };

  const signOut = () => {
    clear();
  };

  return (
    <AuthContext.Provider
      value={{
        principal,
        isAuthenticated,
        isAdmin,
        loginStatus,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

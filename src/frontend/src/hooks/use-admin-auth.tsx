import { useActor } from "@caffeineai/core-infrastructure";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { createActor } from "../backend";

const STORAGE_KEY = "siraji_admin_token";
const STORAGE_EMAIL_KEY = "siraji_admin_email";

interface AdminAuthContextValue {
  adminToken: string | null;
  adminEmail: string | null;
  isAdminLoggedIn: boolean;
  isLoggingIn: boolean;
  loginError: string | null;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const { actor } = useActor(createActor);

  const [adminToken, setAdminToken] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_KEY),
  );
  const [adminEmail, setAdminEmail] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_EMAIL_KEY),
  );
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const isAdminLoggedIn = !!adminToken;

  // Validate stored token on mount
  useEffect(() => {
    if (!adminToken || !actor) return;
    actor.validateAdminSession(adminToken).then((valid) => {
      if (!valid) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_EMAIL_KEY);
        setAdminToken(null);
        setAdminEmail(null);
      }
    });
  }, [actor, adminToken]);

  const adminLogin = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      if (!actor) {
        setLoginError("Backend not connected. Try again shortly.");
        return false;
      }
      setIsLoggingIn(true);
      setLoginError(null);
      try {
        const session = await actor.adminLogin(email, password);
        if (session) {
          const token = session.token;
          localStorage.setItem(STORAGE_KEY, token);
          localStorage.setItem(STORAGE_EMAIL_KEY, session.adminEmail);
          setAdminToken(token);
          setAdminEmail(session.adminEmail);
          return true;
        }
        setLoginError("Invalid email or password.");
        return false;
      } catch {
        setLoginError("Login failed. Please try again.");
        return false;
      } finally {
        setIsLoggingIn(false);
      }
    },
    [actor],
  );

  const adminLogout = useCallback(async () => {
    if (actor && adminToken) {
      try {
        await actor.adminLogout(adminToken);
      } catch {
        // ignore
      }
    }
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_EMAIL_KEY);
    setAdminToken(null);
    setAdminEmail(null);
  }, [actor, adminToken]);

  return (
    <AdminAuthContext.Provider
      value={{
        adminToken,
        adminEmail,
        isAdminLoggedIn,
        isLoggingIn,
        loginError,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx)
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}

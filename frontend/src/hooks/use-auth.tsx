import React, { createContext, useCallback, useState, useContext } from "react";
import api from "@/http/api";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface IRegister {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  register(data: IRegister): Promise<void>;
  signOut(): void;
  requestResetPassword(email: string): Promise<void>;
  verifyCodeOTP(otp: string, email: string): Promise<{ resetToken: string }>;
  resetPasswordOTP(newPassword: string, resetToken: string): Promise<void>;
  logoutLoading: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export enum MessagesEnum {
  "User with this email already exists" = "Este e-mail já está em uso. Por favor, tente outro.",
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logoutLoading, setlogoutLoading] = useState(false);
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("@app:token");
    const user = localStorage.getItem("@app:user");

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const { data } = await api.post<{ accessToken: string }>("/auth/login", {
      email,
      password,
    });

    if (data?.accessToken) {
      const userProfile = await api.get<User>("/user/profile", {
        headers: {
          Authorization: `Bearer ${data?.accessToken}`,
        },
      });

      if (userProfile?.data?.id) {
        const user: User = {
          ...userProfile.data,
        };

        localStorage.setItem("@app:token", data.accessToken);
        localStorage.setItem("@app:user", JSON.stringify(user));

        api.defaults.headers.authorization = `Bearer ${data.accessToken}`;
        setData({ token: data.accessToken, user });
      }
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setlogoutLoading(true);
      await api.post("/auth/logout");
    } catch (err) {
      console.error(err);
    } finally {
      localStorage.removeItem("@app:token");
      localStorage.removeItem("@app:user");
      setData({} as AuthState);
      setlogoutLoading(false);
    }
  }, []);

  const requestResetPassword = useCallback(async (email: string) => {
    await api.post<{ accessToken: string }>(
      "/auth/request-password-reset-otp",
      {
        email,
      }
    );
  }, []);

  const verifyCodeOTP = useCallback(
    async (otp: string, email: string): Promise<{ resetToken: string }> => {
      const { data } = await api.post<{ result: { resetToken: string } }>(
        "/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      return data.result;
    },
    []
  );

  const resetPasswordOTP = useCallback(
    async (newPassword: string, resetToken: string): Promise<void> => {
      const { data } = await api.post("/auth/reset-password-with-otp", {
        newPassword,
        resetToken,
      });

      return data.result;
    },
    []
  );

  const register = useCallback(async (data: IRegister) => {
    await api.post("/auth/register", data);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        register,
        logoutLoading,
        requestResetPassword,
        verifyCodeOTP,
        resetPasswordOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

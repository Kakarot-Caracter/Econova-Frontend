import { create } from "zustand";

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthState {
  login: (
    loginData: LoginData,
  ) => Promise<{ success: boolean; message: string }>;
  register: (
    registerData: RegisterData,
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  register: async (registerData: RegisterData) => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(registerData),
      });

      // Si la respuesta no es OK (status 200-299)
      if (!res.ok) {
        const error = await res.json();
        return {
          success: false,
          message: error.message || "Error al registrar usuario",
        };
      }

      const response = await res.json();
      return response;
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión. Intenta nuevamente.",
      };
    }
  },

  login: async (loginData: LoginData) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginData),
      });

      // Si la respuesta no es OK (status 200-299)
      if (!res.ok) {
        const error = await res.json();
        return {
          success: false,
          message: error.message || "Error al iniciar sesión",
        };
      }

      const response = await res.json();
      return response;
    } catch (error) {
      return {
        success: false,
        message: "Error de conexión. Intenta nuevamente.",
      };
    }
  },

  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  },
}));

"use client";

import axios from "axios";
import { getCookie } from "cookies-next";
import React, { useState, createContext, SetStateAction, Dispatch, useEffect } from "react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string; 
}

type State = {
  loading: boolean;
  error: string | null;
  data: User | null; 
};

type AuthState = State & {
  setAuthState: Dispatch<SetStateAction<State>>
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false, 
  data: null, 
  error: null,
  setAuthState: () => {},
});

export default function AuthContext({children}: {children: React.ReactNode}) {
  const [authState, setAuthState] = useState<State>({
    loading: false, 
    data: null, 
    error: null,
  });

  const fetchUser = async () => {
    try {
      const jwt = getCookie("jwt");

      if (!jwt) {
        return setAuthState({ 
          data: null, 
          error: null, 
          loading: false,
        });
      }

      const response = await axios.get("http://localhost:3000/api/me", {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });

      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

      setAuthState({ 
        data: response.data, 
        error: null, 
        loading: false,
      });
    } catch (error: any) {
      setAuthState({ 
        data: null, 
        error: error.response.data.errorMessage, 
        loading: false,
      });
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{
      ...authState,
      setAuthState,
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
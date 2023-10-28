"use client";

import React, { useState, createContext, SetStateAction, Dispatch } from "react";

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
  
  return (
    <AuthenticationContext.Provider value={{
      ...authState,
      setAuthState,
    }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
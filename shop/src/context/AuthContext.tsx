import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserModel } from '../models';
import { login, logout, onUserStateChange } from '../api/firebase';

interface AuthContextType {
  initialized: boolean;

  user: UserModel | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState<UserModel | null>(null);

  useEffect(() => {
    onUserStateChange((user) => {
      setInitialized(true);
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, initialized }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext)!;
}

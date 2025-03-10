"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("data");

    if (storedData) {
      const parsedData = JSON.parse(storedData);

      if (parsedData.id) setUserId(parsedData.id);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

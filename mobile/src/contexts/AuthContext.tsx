import React, { createContext, useContext, useEffect, useState } from 'react';

const DEMO_MODE = true;

const createMockUser = (email: string) => ({
  uid: 'demo-user-123',
  email: email,
  displayName: 'Demo User',
  emailVerified: true,
});

const DEMO_CREDENTIALS = [
  { email: 'demo@fan.com', password: 'demo123' },
  { email: 'test@fan.com', password: 'test123' },
  { email: 'user@fan.com', password: 'user123' },
];

interface AuthContextType {
  user: any | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!DEMO_MODE) {
      throw new Error('Firebase authentication not configured');
    }

    const validCredential = DEMO_CREDENTIALS.find(
      cred => cred.email === email && cred.password === password
    );

    if (!validCredential) {
      throw new Error('Invalid email or password. Try: demo@fan.com / demo123');
    }

    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser = createMockUser(email);
    setUser(mockUser);
  };

  const signOut = async () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

import * as React from 'react';
import { Alert } from 'react-native';
import { getCurrentUser, login, logout } from './appwrite';
import { useAppwrite } from './useAppwrite';

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: () => Promise<void>;
  handleLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
}

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}

const GlobalContext = React.createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const {
    data: user,
    loading,
    refetch: originalRefetch,
  } = useAppwrite({
    fn: getCurrentUser,
    params: {},
  });

  const isLogged = !!user;

  // Wrapper function untuk refetch tanpa parameter
  const handleRefetch = React.useCallback(async (): Promise<void> => {
    try {
      await originalRefetch({});
    } catch (error) {
      console.error('Error refetching user:', error);
      Alert.alert('Error', 'Failed to refresh user data. Please try again.');
    }
  }, [originalRefetch]);

  // Handle login dengan proper error handling
  const handleLogin = React.useCallback(async (): Promise<void> => {
    try {
      const success = await login();
      if (success) {
        await handleRefetch();
      } else {
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  }, [handleRefetch]);

  // Handle logout dengan proper error handling
  const handleLogout = React.useCallback(async (): Promise<void> => {
    try {
      const success = await logout();
      if (success) {
        await handleRefetch();
      } else {
        Alert.alert('Error', 'Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'An error occurred during logout. Please try again.');
    }
  }, [handleRefetch]);

  const contextValue = React.useMemo(
    () => ({
      isLogged,
      user,
      loading,
      refetch: handleRefetch,
      handleLogin,
      handleLogout,
    }),
    [isLogged, user, loading, handleRefetch, handleLogin, handleLogout]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};

export default GlobalProvider;

import * as React from 'react';
import { View, ActivityIndicator, Text, Pressable, Alert } from 'react-native';
import { getUser } from "./appwrite";
import type { User } from "./types";
import { useAppwrite } from "./useAppwrite";

interface GlobalContextType {
  isLogged: boolean;
  user: User | null;
  loading: boolean;
  refetch: () => void;
}

const GlobalContext = React.createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const {
    data: user,
    loading,
    error,
    refetch,
  } = useAppwrite({
    fn: getUser,
  });

  const isLogged = !!user;

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    Alert.alert(
      "Error",
      "Terjadi kesalahan saat memuat data. Silakan coba lagi.",
      [
        {
          text: "Coba Lagi",
          onPress: () => refetch()
        }
      ]
    );
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center', marginBottom: 10 }}>
          Terjadi kesalahan saat memuat data
        </Text>
        <Pressable 
          onPress={() => refetch()}
          style={{ 
            backgroundColor: '#3b82f6',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 8
          }}
        >
          <Text style={{ color: 'white' }}>Coba Lagi</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        user,
        loading,
        refetch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext harus digunakan di dalam GlobalProvider');
  }
  return context;
};

export default GlobalProvider;

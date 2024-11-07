import { UserDTO } from '@/dtos/UserDTO';
import { api } from '@/services/api';
import {
  storageUserGet,
  storageUserRemove,
  storageUserSave
} from '@/storage/storageUser';
import { router } from 'expo-router';
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState,
  useEffect
} from 'react';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function useSession() {
  const value = useContext(AuthContext);
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function signIn(email: string, password: string) {
    const { data } = await api.post('/sessions', { email, password });

    if (data.user) {
      setUser(data.user);
      storageUserSave(data.user);
      router.navigate('/(app)');
    }
  }

  async function signOut() {
    setIsLoading(true);
    setUser({} as UserDTO);
    await storageUserRemove();
    setIsLoading(false);
  }

  async function loadUserData() {
    setIsLoading(true);

    const userLogged = await storageUserGet();

    if (userLogged) {
      setUser(userLogged);
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isLoading,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

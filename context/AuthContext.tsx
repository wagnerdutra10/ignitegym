import { UserDTO } from '@/dtos/UserDTO';
import {
  useContext,
  createContext,
  type PropsWithChildren,
  useState
} from 'react';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => void;
};

const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  // if (process.env.N ODE_ENV !== 'production') {
  //   if (!value) {
  //     throw new Error('useSession must be wrapped in a <SessionProvider />');
  //   }
  // }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // const [[isLoading, session], setSession] = useStorageState('session');
  const [user, setUser] = useState({
    nome: 'wagner',
    avatar: '',
    email: 'wagnerdutra1010@gmail.com',
    id: '123'
  });

  function signIn(email: string, password: string) {
    setUser({
      email,
      id: '',
      avatar: '',
      nome: ''
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

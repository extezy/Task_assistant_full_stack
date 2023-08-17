import {
  createContext,
  useState,
  FC,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";

export const enum Components {
  SignIn = 'SignIn',
  SignUp = 'SignUp',
  Forgot = 'Forgot',
  Reset = 'Reset',
}

type TypeContext = {
  authState: Components;
  setAuthState: Dispatch<SetStateAction<Components>>;
};

export const AuthComponentContext = createContext<TypeContext>({
  authState: Components.SignIn,
  setAuthState: () => {},
});

const AuthComponentProvider: FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<Components>(Components.SignIn);

  return (
    <AuthComponentContext.Provider value={{ authState, setAuthState }}>
      {children}
    </AuthComponentContext.Provider>
  );
};

export default AuthComponentProvider;

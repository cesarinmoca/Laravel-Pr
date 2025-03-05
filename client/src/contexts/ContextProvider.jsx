import { createContext, useContext, useState, useCallback } from "react";

export const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {}
});

export function ContextProvider({ children }) {
    const [user, setUser] = useState({
        name: 'John'
    });
    const [token, _setToken] = useState(null);

    const setToken = useCallback((token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }, []);

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
}

export function useStateContext() {
    return useContext(StateContext);
}

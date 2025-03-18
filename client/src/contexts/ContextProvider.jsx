import { createContext, useContext, useState, useCallback } from "react";

export const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {}
});

export function ContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState('');
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    function setNotification (message) {
        _setNotification(message);
        setTimeout(() => {
            _setNotification('')
        }, 5000)
    }

    const setToken = useCallback((token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }, []);

    return (
        <StateContext.Provider value={{ user, token, setUser, setToken, notification, setNotification }}>
            {children}
        </StateContext.Provider>
    );
}

export function useStateContext() {
    return useContext(StateContext);
}

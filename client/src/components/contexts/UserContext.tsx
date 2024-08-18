import { useContext, createContext } from "react";

import User from "@/views/User";

export const UserContext = createContext<User | null>(null)

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context)
        throw new Error("UserContext is uninitialized");
    return context;
}

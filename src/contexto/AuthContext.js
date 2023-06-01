// Importando useContext e o createContext
import { useContext, createContext } from "react";


const AuthContext = createContext()


// Esse de baixo é o Código que realmente vai ser utilizado na prática também importado la no app
export function AuthProvider({children, value}) {
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
 }

 

    export function useAuthvalue(){
        return useContext(AuthContext)
    }
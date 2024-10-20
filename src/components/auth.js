import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithPopup ,signOut} from "firebase/auth";
import { useState } from "react";
// authentification part
export const Auth = () =>{
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
   console.log(auth?.currentUser?.photoURL);
   
// Se connecter a l'aide email&password
    const signIn = async () => { 
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(err){
            console.error(err);
        }
    };
// Se connecter Avec Google
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider );
        } catch (err) {
            console.error(err);
        }
    };
    // Déconnexion
    const Logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return(
        <div className="col-lg-6 m-auto">
            <input placeholder="Email..." 
            className="form-control"
            onChange={(e)=>setEmail(e.target.value)}
             />
            <input  placeholder="Password..." 
                className="form-control mt-2"
             type="password" onChange={(e)=>setPassword(e.target.value)} 
             />
            <button onClick={signIn} className="btn btn-primary w-100 mt-2">Sign In</button>
            <button onClick={signInWithGoogle} className="btn btn-primary w-100   mt-2">Sign In With Google</button>
            <button onClick={Logout} className="btn btn-primary w-100  mt-2">Logout</button>
        </div>
    );
};
import React, { FC, useState } from "react";
import { auth, googleAuthProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const Auth: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"register" | "login">("register");

  const handleSignUp = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const handleSignIn = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "zur Registrierung" : "zum Login"}
      </button>

      <div>
        <h4>{mode === "login" ? "Login" : "Registrierung"}</h4>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {mode === "register" ? (
          <button onClick={handleSignUp}>Account Erstellen</button>
        ) : (
          <button onClick={handleSignIn}>Einloggen</button>
        )}

        {!auth.currentUser && (
          <button onClick={signInWithGoogle}>Sign In With Google</button>
        )}

        {auth.currentUser && <button onClick={handleSignOut}>Logout</button>}
      </div>

      <div>{auth.currentUser?.email}</div>
    </div>
  );
};

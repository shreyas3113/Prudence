import { auth, database } from './firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

export function loginUser(email, password, onSuccess, onError) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            if (onSuccess) onSuccess(userCredential);
        })
        .catch((error) => {
            if (onError) onError(error);
        });
}

export function signUpUser(email, password, onSuccess, onError) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            set(ref(database, 'users/' + userId), { email: email })
                .then(() => {
                    if (onSuccess) onSuccess(userCredential);
                })
                .catch((error) => {
                    if (onError) onError(error);
                });
        })
        .catch((error) => {
            if (onError) onError(error);
        });
}

export function logoutUser(onSuccess, onError) {
    signOut(auth)
        .then(() => {
            if (onSuccess) onSuccess();
        })
        .catch((error) => {
            if (onError) onError(error);
        });
}

export function checkAuthState(onChange) {
    onAuthStateChanged(auth, (user) => {
        if (onChange) onChange(user);
    });
} 
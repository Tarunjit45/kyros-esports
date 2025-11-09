import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const AdminContext = createContext();

export function useAdmin() {
  return useContext(AdminContext);
}

export function AdminProvider({ children }) {
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  const login = async (email, password) => {
    try {
      console.log('Attempting login with:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Firebase auth successful, UID:', userCredential.user.uid);
      
      // Check if user exists in the admins collection
      const adminDoc = await getDoc(doc(db, 'admins', userCredential.user.uid));
      console.log('Admin doc exists:', adminDoc.exists());
      
      if (adminDoc.exists()) {
        const adminData = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          ...adminDoc.data()
        };
        console.log('Setting admin data:', adminData);
        setCurrentAdmin(adminData);
        return { success: true };
      } else {
        console.log('No admin record found for user');
        await signOut(auth);
        return { success: false, error: 'Not authorized as admin' };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentAdmin(null);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'admins', user.uid));
        if (userDoc.exists()) {
          setCurrentAdmin({
            uid: user.uid,
            email: user.email,
            ...userDoc.data()
          });
        }
      } else {
        setCurrentAdmin(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [auth]);

  const value = {
    currentAdmin,
    login,
    logout,
    isAdmin: !!currentAdmin
  };

  return (
    <AdminContext.Provider value={value}>
      {!loading && children}
    </AdminContext.Provider>
  );
}

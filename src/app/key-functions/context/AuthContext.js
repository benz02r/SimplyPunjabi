"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);

    useEffect(() => {
        // Get initial session and user
        const initializeAuth = async () => {
            try {
                const { data: { session: initialSession }, error } = await supabase.auth.getSession();

                if (error) {
                    console.error("Error getting session:", error);
                    setUser(null);
                    setSession(null);
                } else {
                    setSession(initialSession);
                    setUser(initialSession?.user || null);
                }
            } catch (error) {
                console.error("Unexpected error during auth initialization:", error);
                setUser(null);
                setSession(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, currentSession) => {
                console.log("Auth event:", event);

                setSession(currentSession);
                setUser(currentSession?.user || null);

                // Handle specific auth events if needed
                if (event === 'SIGNED_IN') {
                    console.log("User signed in:", currentSession?.user?.email);
                }
                if (event === 'SIGNED_OUT') {
                    console.log("User signed out");
                }
                if (event === 'TOKEN_REFRESHED') {
                    console.log("Token refreshed");
                }
                if (event === 'USER_UPDATED') {
                    console.log("User updated");
                }

                setLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Helper function to sign out
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            setUser(null);
            setSession(null);
        } catch (error) {
            console.error("Error signing out:", error);
            throw error;
        }
    };

    // Helper function to refresh session
    const refreshSession = async () => {
        try {
            const { data: { session: newSession }, error } = await supabase.auth.refreshSession();
            if (error) throw error;
            setSession(newSession);
            setUser(newSession?.user || null);
            return newSession;
        } catch (error) {
            console.error("Error refreshing session:", error);
            throw error;
        }
    };

    const value = {
        user,
        session,
        loading,
        signOut,
        refreshSession,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
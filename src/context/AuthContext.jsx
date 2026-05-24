import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import usersData from '../data/users.json'; 

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [allUsers, setAllUsers] = useState([]); 
    const [user, setUser] = useState(null);       
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const initializeAuth = () => {
            try {
                const actualData = usersData.users ? usersData.users : (usersData.default?.users || usersData);
                const fetchedUsers = actualData || [];
                setAllUsers(fetchedUsers);

                const localUserId = localStorage.getItem("rememberedUser");
                const sessionUserId = sessionStorage.getItem("rememberedUser");
                const savedUserId = localUserId || sessionUserId;

                if (savedUserId && fetchedUsers.length > 0) {
                    // 🎯 الـ .trim() هنا عشان لو فيه مسافة خفية في الـ JSON أو الـ Storage ما تبوظش المقارنة
                    const found = fetchedUsers.find(u => String(u.id).trim() === String(savedUserId).trim());
                    if (found) {
                        setUser(found); 
                    }
                }
            } catch (error) {
                console.error("Auth initialization error:", error);
            } finally {
                setLoading(false); 
            }
        };

        initializeAuth();
    }, []);

    const getUserById = (id) => {
        return allUsers.find(u => String(u.id).trim() === String(id).trim()) || null;
    };

    const loginGlobal = (userData) => {
        setUser(userData);
    };

    const logoutGlobal = () => {
        try {
            setUser(null); 
            localStorage.removeItem("rememberedUser");
            sessionStorage.removeItem("rememberedUser");

            toast.success('Logged out successfully. See you soon!', {
                duration: 3500,
                position: 'top-right',
                style: {
                    borderRadius: '12px',
                    background: '#ffffff',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    fontWeight: '500'
                },
            });
        } catch (error) {
            console.error("Logout execution error:", error);
            localStorage.removeItem("rememberedUser");
            sessionStorage.removeItem("rememberedUser");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, allUsers, getUserById, loginGlobal, logoutGlobal, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
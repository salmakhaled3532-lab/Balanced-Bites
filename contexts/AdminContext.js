import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Admin credentials (in real app, this would be in a secure database)
  const ADMIN_CREDENTIALS = {
    email: 'admin@balancedbites.com',
    password: 'admin123',
    name: 'Admin User',
    role: 'super_admin'
  };

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const storedAdmin = localStorage.getItem('admin_user');
    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin);
        setAdmin(adminData);
        setIsAdminAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('admin_user');
      }
    }
    setIsLoading(false);
  }, []);

  const adminLogin = (email, password) => {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const adminData = {
        email: ADMIN_CREDENTIALS.email,
        name: ADMIN_CREDENTIALS.name,
        role: ADMIN_CREDENTIALS.role,
        loginTime: new Date().toISOString()
      };
      
      setAdmin(adminData);
      setIsAdminAuthenticated(true);
      localStorage.setItem('admin_user', JSON.stringify(adminData));
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials' };
  };

  const adminLogout = () => {
    setAdmin(null);
    setIsAdminAuthenticated(false);
    localStorage.removeItem('admin_user');
  };

  const value = {
    admin,
    isAdminAuthenticated,
    isLoading,
    adminLogin,
    adminLogout
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

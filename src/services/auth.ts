// Authentication service for handling login, signup, and logout

// User type definition
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

// Mock user data for development
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@shipdrop.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
};

// Store user in localStorage
const storeUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Get user from localStorage
export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (!userStr) return null;
  try {
    return JSON.parse(userStr) as User;
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
    return null;
  }
};

// Clear user from localStorage
const clearUser = () => {
  localStorage.removeItem("user");
};

// Login function
export const login = async (email: string, password: string): Promise<User> => {
  // This is a mock implementation
  // In a real app, this would make an API call to authenticate the user
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation for demo purposes
      if (email && password) {
        // For demo, we'll accept any non-empty email/password
        // and return our mock user
        storeUser(mockUser);
        resolve(mockUser);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000); // Simulate network delay
  });
};

// Signup function
export const signup = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  // This is a mock implementation
  // In a real app, this would make an API call to create a new user
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation for demo purposes
      if (name && email && password) {
        // Create a new user based on the mock user but with the provided name and email
        const newUser: User = {
          ...mockUser,
          name,
          email,
        };
        storeUser(newUser);
        resolve(newUser);
      } else {
        reject(new Error("Please fill in all required fields"));
      }
    }, 1000); // Simulate network delay
  });
};

// Logout function
export const logout = async (): Promise<void> => {
  // This is a mock implementation
  // In a real app, this might make an API call to invalidate the session
  return new Promise((resolve) => {
    setTimeout(() => {
      clearUser();
      resolve();
    }, 500); // Simulate network delay
  });
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getStoredUser() !== null;
};

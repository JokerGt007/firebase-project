export interface User {
    uid: string;
    name: string | null;  // Permite null
    email: string | null;  // Permite null
    isAdmin: boolean;
    photoUrl: string | null;  // Permite null
  }
  
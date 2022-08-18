export interface User {
  id?: string;
  email: string;
  displayName?: string;
  name?: string;
  surname?: string;
  birthData?: Date;
  isActive?: boolean;
  isBanned?: boolean;
  password?: string;
}

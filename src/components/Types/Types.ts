export interface ProfileType {
  id: number;
  name: string;
  email: string;
  avatar: string;
  password: string;
  role: string;
  creationAt: string;
  updatedAt: string;
}
export interface PlayerDataTypes {
  id: number; // Unique identifier for each player
  user: string;
  age: number;
  leagues: string[];
  status: string;
  height: string;
  position: string;
}

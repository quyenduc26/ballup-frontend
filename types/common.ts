export interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
}

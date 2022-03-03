export default interface IChangePasswordResponse {
  id: number;
  email: string;
  is_admin: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export type Me = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  onboarding: boolean;
  firstLogin: boolean;
  plan: string;
  companyId: number;
};

export enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  EMPLOYEE = "EMPLOYEE",
}

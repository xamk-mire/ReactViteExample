export interface ContactModel {
  contactId: number;
  firstName: string;
  lastName: string;
  twitter?: string;
  avatar?: string;
  notes?: string;
  favorite?: boolean;
}

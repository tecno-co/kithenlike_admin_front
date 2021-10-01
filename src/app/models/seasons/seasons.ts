export class Seasons {
  id!: number;
  code!: number;
  name: string;
  description: string;
  
  is_active: boolean;
  is_delete: boolean;
  // user_creates?: User;
  // user_deletes?: User;
  // user_updates?: User;   
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;

  constructor() {
      this.name = "";
      this.description = "";
      this.is_active = true;
      this.is_delete = false;
  }
}

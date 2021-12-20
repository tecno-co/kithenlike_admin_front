export class User {
  id: number;
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  password_confirmation?: string;  
  // semanal_hours!: number;
  // position?: Position;
  // profile_id!: number;
  // profile!: Profile;
  // position_area_id!: number;
  // position_area!: PositionArea;
  is_active?: boolean;
  is_delete?: boolean;
  user_creates?: string;
  user_updates?: string;
  authentication_token?: string;
  full_name?: string;
  avatar?: string;
  initials_name?: string;

  constructor(user: User) {
    this.id = 0 || user.id;
    this.first_name = "" || user.first_name;
    this.last_name = "" || user.last_name;
    this.email = "" || user.email;
    this.password = "" || user.password;
    this.is_active = true;
    this.is_delete = false;
    this.user_creates = "" || user.user_creates;
    this.user_updates = "" || user.user_updates;
    this.authentication_token = "" || user.authentication_token;
    this.is_active = true;
    this.is_delete = false;
    this.initials_name = user.initials_name;
    this.full_name = user.full_name;
    this.avatar=user.avatar;
  }
}

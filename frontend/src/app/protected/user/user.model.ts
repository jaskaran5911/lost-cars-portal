import {PageableModel} from '../../shared/model/pageable.model';

export class UserModel extends PageableModel {
  objects: Array<User>;
  constructor() {
    super();
    this.objects = new Array<User>();
  }
}

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  created_at: string;
  current_login_at: string;
  current_login_ip: string;
  last_login_ip: string;
  last_login_at: string;
  login_count: number;
  updated_at: string;
  last_updated_by: string;
  roles: Array<Role>;

  constructor() {
    this.roles = new Array<Role>();
  }
}

export class RoleModel extends PageableModel {
  objects: Array<Role>;
  constructor() {
    super();
    this.objects = new Array<Role>();
  }
}

export class Role {
  id: number;
  name: string;
  status: boolean;
  description: string;
}

export const userDisplayedColumns = [
  'id',
  'name',
  'email',
  'roles',
  'active',
  'updated_at',
  'action'
];

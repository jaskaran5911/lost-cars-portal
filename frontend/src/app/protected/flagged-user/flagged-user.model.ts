import {User} from "../user/user.model";
import {PageableModel} from "../../shared/model/pageable.model";


export class FlaggedUserModel extends PageableModel {
  objects: Array<FlaggedUser>;
  constructor() {
    super();
    this.objects = new Array<FlaggedUser>();
  }
}

export class FlaggedUser {
  id: number;
  user: number;
  text: string;
  action: string;
  flagged_by: number;
  flagged_user: User;
  flagged_user_by: User;
  status: boolean;
  created_at: string;
  updated_at: string;
  last_updated_by: string;
}

export const flaggedUserDisplayColumns = [
  'name',
  'email',
  'text',
  'count',
  'action',
  'flagged_by',
  'created_at',
  'action_menu'
];

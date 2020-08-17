import {User} from "../user/user.model";
import {Complaint} from "../complaint/complaint.model";
import {PageableModel} from "../../shared/model/pageable.model";


export class CommentsModel extends PageableModel {
  objects: Array<CommentModel>;
}

export class CommentModel {
  id: number;
  complaint: number;
  complaints: Complaint;
  text: string;
  users: User;
  sent_email: boolean;
  commented_by: number;
  status: string;
  created_at: string;
  updated_at: string;
  last_updated_by: string;
}

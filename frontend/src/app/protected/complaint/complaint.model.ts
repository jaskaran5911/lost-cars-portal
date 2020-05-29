import {PageableModel} from '../../shared/model/pageable.model';
import {User} from "../user/user.model";

export class ComplaintModel extends PageableModel {
  objects: Array<Complaint>;
  constructor() {
    super();
    this.objects = new Array<Complaint>();
  }
}

export class Complaint {
  id: number;
  title: string;
  text: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pin_code: number;
  vehicle_number: string;
  vehicle_details: string;
  file_name: string;
  complaint_status: string;
  complaint_by: number;
  complaint_user: User;
  responded_user: User;
  responded_by: number;
  response_details: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  last_updated_by: string;
}

export const myComplaintDisplayColumns = [
  'title',
  'text',
  'address',
  'vehicle_number',
  'vehicle_details',
  'complaint_status',
  'created_at',
  'action'
];

export const allComplaintDisplayColumns = [
  'name',
  'title',
  'text',
  'address',
  'vehicle_number',
  'complaint_status',
  'created_at',
  'action'
];

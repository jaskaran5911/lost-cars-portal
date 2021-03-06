import {OrderBy} from "./filter.model";

export class PageableModel {
  num_results: number;
  total_pages: number;
  page: number;
}

export class PageableQuery {
  results_per_page: number;
  page: number;
  order_by: OrderBy;
}

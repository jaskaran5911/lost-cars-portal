import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {Filter, FilterModel, OrderBy} from "../../../shared/model/filter.model";
import {SpinnerService} from "../../../shared/service/spinner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AppConfig} from "../../../app.config";
import {MatTableDataSource} from "@angular/material/table";
import {Complaint, myComplaintDisplayColumns, ComplaintModel} from "../complaint.model";
import {Constant} from "../../../shared/constant";
import {environment} from "../../../../environments/environment";
import {StorageService} from "../../../shared/service/storage.service";
import {ComplaintService} from "../complaint.service";
import {ResponseModalComponent} from "./response-modal/response-modal.component";
import {ViewComplaintDetailsModalComponent} from "../view-complaint-details-modal/view-complaint-details-modal.component";

@Component({
  selector: 'app-my-complaint',
  templateUrl: './my-complaint.component.html',
  styleUrls: ['./my-complaint.component.scss']
})
export class MyComplaintComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  dataSource: MatTableDataSource<Complaint>;
  displayedColumns = myComplaintDisplayColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  isFiltered = false;

  constructor(
    public spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private storageService: StorageService,
    private complaintService: ComplaintService
  ) {
    this.filterModel.order_by.push(new OrderBy());
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.get('q')) {
      this.isFiltered = true;
      this.filterModel.filters.push(JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('q')));
    }
    this.filterModel.filters.push(new Filter(Constant.COMPLAINT_BY, Constant.EQ, this.storageService.getUserId()));
    this.getFilteredComplaints();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.isFiltered = false;
    this.filterModel = new FilterModel();
    this.filterModel.order_by.push(new OrderBy());
    this.filterModel.filters.push(new Filter(Constant.COMPLAINT_BY, Constant.EQ, this.storageService.getUserId()));
    this.getFilteredComplaints();
    this.router.navigate([AppConfig.MY_COMPLAINT]).then();
  }

  getFilteredComplaints() {
    this.spinnerService.show();
    this.subscription.add(
      this.complaintService.getFilteredComplaints(this.filterModel).subscribe((res: ComplaintModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  openDetailsModal(complaint: Complaint) {
    this.dialog.open(ViewComplaintDetailsModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: complaint
    });
  }

  openResponseModal(complaint: Complaint) {
    this.dialog.open(ResponseModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: complaint
    });
  }

  downloadFile(complaint: Complaint) {
    window.location.href = environment.HOST + AppConfig.COMPLAINT_DOWNLOAD_API + complaint.file_name;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

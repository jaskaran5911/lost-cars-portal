import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Subscription} from "rxjs";
import {Filter, FilterModel, OrderBy} from "../../shared/model/filter.model";
import {MatTableDataSource} from "@angular/material/table";
import {Constant} from "../../shared/constant";
import {SpinnerService} from "../../shared/service/spinner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AppConfig} from "../../app.config";
import {FlaggedUser, flaggedUserDisplayColumns, FlaggedUserModel} from "./flagged-user.model";
import {FlaggedUserService} from "./flagged-user.service";
import {ViewFlagComponent} from "./view-flag/view-flag.component";
import {DeactivateModalComponent} from "./deactivate-modal/deactivate-modal.component";

@Component({
  selector: 'app-flagged-user',
  templateUrl: './flagged-user.component.html',
  styleUrls: ['./flagged-user.component.scss']
})
export class FlaggedUserComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  dataSource: MatTableDataSource<FlaggedUser>;
  displayedColumns = flaggedUserDisplayColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  userURL = AppConfig.USER;
  isFiltered = false;

  constructor(
    public spinnerService: SpinnerService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private flaggedUserService: FlaggedUserService
  ) {
    this.filterModel.order_by.push(new OrderBy());
  }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParamMap.get('q')) {
      this.isFiltered = true;
      this.filterModel.filters.push(JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('q')));
    }
    this.getFilteredFlaggedUsers();
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
    this.getFilteredFlaggedUsers();
    this.router.navigate([AppConfig.FLAGGED_USER]).then();
  }

  getFilteredFlaggedUsers() {
    this.spinnerService.show();
    this.subscription.add(
      this.flaggedUserService.getFilteredFlaggedUser(this.filterModel).subscribe((res: FlaggedUserModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  openDetailsModal(flaggedUser: FlaggedUser) {
    this.dialog.open(ViewFlagComponent, {
      width: Constant.MODAL_WIDTH,
      data: flaggedUser
    });
  }

  openDeactivateModal(userID: number) {
    this.dialog.open(DeactivateModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: userID
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getFilteredFlaggedUsers();
      }
    });
  }

  getUserURLForInactive() {
    return {q: JSON.stringify(new Filter(Constant.ACTIVE, Constant.EQ, false))};
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

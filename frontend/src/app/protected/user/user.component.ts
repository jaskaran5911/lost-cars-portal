import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from './user.service';
import {User, userDisplayedColumns, UserModel} from './user.model';
import {Constant, Messages} from '../../shared/constant';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {SaveUserModalComponent} from './save-user-modal/save-user-modal.component';
import {SpinnerService} from '../../shared/service/spinner.service';
import {ViewUserDetailModalComponent} from './view-user-detail-modal/view-user-detail-modal.component';
import {Active} from '../../shared/model/active.model';
import {ActivatedRoute, Router} from "@angular/router";
import {FilterModel} from "../../shared/model/filter.model";
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscription: Subscription = new Subscription();
  filterModel: FilterModel = new FilterModel();
  dataSource: MatTableDataSource<User>;
  displayedColumns = userDisplayedColumns;
  pageSize = Constant.PAGE_SIZE_LIST;
  isFiltered = false;

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public spinnerService: SpinnerService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.activatedRoute.snapshot.queryParamMap.get('q')) {
      this.isFiltered = true;
      this.filterModel.filters.push(JSON.parse(this.activatedRoute.snapshot.queryParamMap.get('q')));
    }
    this.getFilteredUsers();
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
    this.getFilteredUsers();
    this.router.navigate([AppConfig.USER]).then();
  }

  getFilteredUsers() {
    this.spinnerService.show();
    this.subscription.add(
      this.userService.getFilteredUsers(this.filterModel).subscribe((res: UserModel) => {
        this.dataSource = new MatTableDataSource(res.objects);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      })
    );
  }

  openAddUserModal(user: User = null) {
    const dialogRef = this.dialog.open(SaveUserModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getFilteredUsers();
      }
    });
  }

  openViewUserModal(user: User) {
    this.dialog.open(ViewUserDetailModalComponent, {
      width: Constant.MODAL_WIDTH,
      data: user
    });
  }

  toggleStatusUser(user: User) {
    this.subscription.add(
      this.userService.toggleStatusUser(user.id, new Active(!user.active)).subscribe(() => {
        this.snackBar.open(Messages.STATUS_CHANGED_SUCCESSFULLY);
        this.getFilteredUsers();
      }, () => {
        this.getFilteredUsers();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

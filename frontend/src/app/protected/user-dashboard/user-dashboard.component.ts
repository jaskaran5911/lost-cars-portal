import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Chart} from "angular-highcharts";
import {StorageService} from "../../shared/service/storage.service";
import {CountModel, NameCountModel} from "../dashboard/dashboard.model";
import {Constant} from "../../shared/constant";
import {UserDashboardService} from "./user-dashboard.service";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  pieChart = new Chart();
  userId: number;

  complaintCount = 0;
  complaintUnderInvestigationCount = 0;
  complaintClosedCount = 0;
  complaintAcceptedCount = 0;

  constructor(
    private dashboardService: UserDashboardService,
    private storageService: StorageService
  ) {
    this.userId = this.storageService.getUserId();
  }

  ngOnInit() {
    this.getComplaintCount();
    this.getComplaintUnderInvestigationCount();
    this.getComplaintClosedCount();
    this.getComplaintStatus();
    this.getComplaintAcceptedCount();
  }

  getComplaintCount() {
    this.subscription.add(
      this.dashboardService.getMyComplaintCount(this.userId).subscribe((res: CountModel) => {
        this.complaintCount = res.count__id;
      })
    );
  }

  getComplaintUnderInvestigationCount() {
    this.subscription.add(
      this.dashboardService.getComplaintStatusCount(
        this.userId, Constant.COMPLAINT_STATUS.UNDER_INVESTIGATION
      ).subscribe((res: CountModel) => {
        this.complaintUnderInvestigationCount = res.count__id;
      })
    );
  }

  getComplaintClosedCount() {
    this.subscription.add(
      this.dashboardService.getComplaintStatusCount(
        this.userId, Constant.COMPLAINT_STATUS.CLOSED
      ).subscribe((res: CountModel) => {
        this.complaintClosedCount = res.count__id;
      })
    );
  }

  getComplaintAcceptedCount() {
    this.subscription.add(
      this.dashboardService.getComplaintStatusCount(
        this.userId, Constant.COMPLAINT_STATUS.ACCEPTED
      ).subscribe((res: CountModel) => {
        this.complaintAcceptedCount = res.count__id;
      })
    );
  }

  getComplaintStatus() {
    this.subscription.add(
      this.dashboardService.getComplaintCount(this.userId).subscribe((res: NameCountModel[]) => {
        this.pieChart = new Chart({
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Complaint Status'
          },
          tooltip: {
            pointFormat: '<b>{point.y} ({point.percentage:.1f}%)</b>'
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f}%'
              }
            }
          },
          series: [{
            data: res
          }]
        } as any);
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

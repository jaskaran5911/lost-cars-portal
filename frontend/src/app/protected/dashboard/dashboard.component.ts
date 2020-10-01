import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FilterModel, FunctionModal} from "../../shared/model/filter.model";
import {Chart} from "angular-highcharts";
import {DashboardService} from "./dashboard.service";
import {Constant} from "../../shared/constant";
import {CountModel, NameCountModel} from "./dashboard.model";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  filterCount: FilterModel = new FilterModel();
  pieChart = new Chart();
  lineChart = new Chart();

  complaintCount = 0;
  commentCount = 0;
  userCount = 0;
  FlaggedUserCount = 0;

  constructor(
    private dashboardService: DashboardService
  ) {
    this.filterCount.functions.push(new FunctionModal(Constant.COUNT, Constant.ID));
  }

  ngOnInit() {
    this.getComplaintCount();
    this.getCommentCount();
    this.getUserCount();
    this.getFlaggedUserCount();
    this.getComplaintStatus();
    this.getUserRole();
  }

  getComplaintCount() {
    this.subscription.add(
      this.dashboardService.getComplaintEval(this.filterCount).subscribe((res: CountModel) => {
        this.complaintCount = res.count__id;
      })
    );
  }

  getCommentCount() {
    this.subscription.add(
      this.dashboardService.getCommentEval(this.filterCount).subscribe((res: CountModel) => {
        this.commentCount = res.count__id;
      })
    );
  }

  getUserCount() {
    this.subscription.add(
      this.dashboardService.getUserEval(this.filterCount).subscribe((res: CountModel) => {
        this.userCount = res.count__id;
      })
    );
  }

  getFlaggedUserCount() {
    this.subscription.add(
      this.dashboardService.getFlaggedUserEval(this.filterCount).subscribe((res: CountModel) => {
        this.FlaggedUserCount = res.count__id;
      })
    );
  }

  getComplaintStatus() {
    this.subscription.add(
      this.dashboardService.getComplaintCount().subscribe((res: NameCountModel[]) => {
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

  getUserRole() {
    this.subscription.add(
      this.dashboardService.getUserRoleCount().subscribe((res: NameCountModel[]) => {
        let categories = res.map(r => r.name);
        let data = res.map(r => r.y);

        this.lineChart = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Users'
          },
          xAxis: {
            categories: categories,
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Number of staffs'
            }
          },
          series: [{
            name: 'Count',
            data: data
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

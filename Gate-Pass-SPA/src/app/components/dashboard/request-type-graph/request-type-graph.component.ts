import { Component, OnInit } from "@angular/core";
import { GoogleChartInterface } from "ng2-google-charts/google-charts-interfaces";
import { RequestTypeStats } from "src/app/shared/models/dashboard/stats/requestStats";
import { UserTypeStats } from "src/app/shared/models/dashboard/stats/userStatistc";
import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-request-type-graph",
  templateUrl: "./request-type-graph.component.html",
  styleUrls: ["./request-type-graph.component.scss"],
})
export class RequestTypeGraphComponent implements OnInit {
  public pieChart: GoogleChartInterface = {
    chartType: "PieChart",
    dataTable: [["Type", "Total"]],
    options: {
      title: "Request Type Statistics  احصائيات نوع الطلبات",
      pieHole: 0.4,
      width: "100%",
      height: 400,
      colors: [
        "#4466f2",
        "#1ea6ec",
        "#22af47",
        "#007bff",
        "#FF5370",
        "#FF5370",
      ],
      backgroundColor: "transparent",
    },
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dashboardService
      .getRequestTypeStats()
      .subscribe((data: RequestTypeStats[]) => {
        let temp: any[] = [];
        data.forEach((element) => {
          temp.push([
            element.zRequestsTypeNameEn + " " + element.zRequestsTypeNameAr,
            element.total,
          ]);
        });
        temp.forEach((element) => {
          this.pieChart.dataTable.push(element);
        });
      });
  }
}

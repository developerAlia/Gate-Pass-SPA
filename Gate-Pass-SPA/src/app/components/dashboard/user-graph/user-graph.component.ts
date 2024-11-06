import { Component, OnInit } from "@angular/core";
import { GoogleChartInterface } from "ng2-google-charts/google-charts-interfaces";
import { UserTypeStats } from "src/app/shared/models/dashboard/stats/userStatistc";

import { DashboardService } from "src/app/shared/services/dashboard.service";

@Component({
  selector: "app-user-graph",
  templateUrl: "./user-graph.component.html",
  styleUrls: ["./user-graph.component.scss"],
})
export class UserGraphComponent implements OnInit {
  public pieChart: GoogleChartInterface = {
    chartType: "PieChart",
    dataTable: [["Type", "Total"]],
    options: {
      title: "User Statistics  احصائيات المستخدمين",
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
      .getUserTypeStats()
      .subscribe((data: UserTypeStats[]) => {
        let temp: any[] = [];
        data.forEach((element) => {
          temp.push([
            element.zUserTypeNameEn + " " + element.zUserTypeNameAr,
            element.total,
          ]);
        });
        temp.forEach((element) => {
          this.pieChart.dataTable.push(element);
        });
      });
  }
}

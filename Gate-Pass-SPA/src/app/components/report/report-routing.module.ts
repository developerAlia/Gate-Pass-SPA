import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { CheckedInReportComponent } from "./checked-in-report/checked-in-report.component";
import { RequestReportComponent } from "./request-report/request-report.component";

const routes: Routes = [
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AdminGuard],
    children: [
      {
        path: "RequestReport",
        component: RequestReportComponent,
        data: {
          roles: ["Admin", "Security Admin", "Security", "SysAdmin"],
          title: "RequestReport",
          breadcrumb: "RequestReport",
        },
      },
      {
        path: "CheckedInReport",
        component: CheckedInReportComponent,
        data: {
          roles: ["Admin", "Security Admin", "Security", "SysAdmin"],
          title: "Checked-InReport",
          breadcrumb: "Checked-InReport",
        },
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}

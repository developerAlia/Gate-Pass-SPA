import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { RequestListComponent } from "./request-list/request-list.component";
import { GateListComponent } from "./gate-list/gate-list.component";
import { QrScanVisitorComponent } from "./qr-scan-visitor/qr-scan-visitor.component";
import { VisitorQrResolver } from "src/app/shared/resolvers/check-in/visitor-qr.resolver";
import { FineListComponent } from "./fine-list/fine-list.component";

const routes: Routes = [
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AdminGuard],
    children: [
      {
        path: "requestlist",
        component: RequestListComponent,
        data: {
          roles: ["Admin", "Security Admin", "Security"],
          title: "Requests",
          breadcrumb: "Requests",
        },
      },
      {
        path: "gatelist",
        component: GateListComponent,
        data: {
          roles: ["Admin", "Security Admin", "Security"],
          title: "GateList",
          breadcrumb: "GateList",
        },
      },
      {
        path: "finelist",
        component: FineListComponent,
        data: {
          roles: ["Admin", "Security Admin", "Security"],
          title: "FineList",
          breadcrumb: "FineList",
        },
      },
      {
        path: "qr/:id",
        component: QrScanVisitorComponent,
        resolve: { data: VisitorQrResolver },
        data: {
          roles: ["Admin", "Security Admin", "Security"],
          title: "GateList",
          breadcrumb: "GateList",
          path: "Qr/:id"
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
export class SecurityRoutingModule {}

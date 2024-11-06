import { Routes } from "@angular/router";
import { AuthGuard } from "../guard/auth.guard";

export const content: Routes = [
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../components/dashboard/sample/sample.module").then(
        (m) => m.SampleModule
      ),
  },

  {
    path: "notification",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../components/notification/notification.module").then(
        (m) => m.NotificationModule
      ),
    data: {
      breadcrumb: "",
    },
  },

  {
    path: "gatepass",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../components/gatepass/gatepass.module").then(
        (m) => m.GatepassModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "security",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../components/security/security.module").then(
        (m) => m.SecurityModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "report",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../components/report/report.module").then(
        (m) => m.ReportModule
      ),
    data: {
      breadcrumb: "",
    },
  },
  {
    path: "administrations",
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("../../components/administrations/administrations.module").then(
        (m) => m.AdministrationsModule
      ),
    data: {
      breadcrumb: "Administration",
    },
  },
];

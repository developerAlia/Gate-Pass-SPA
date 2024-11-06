import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { NotificationComponent } from "./notification/notification.component";

const routes: Routes = [
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AdminGuard],
    children: [
      {
        path: "",
        component: NotificationComponent,
        data: {
          roles: ["Admin", "SysAdmin"],
          title: "Notification",
          breadcrumb: "Notification",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationRoutingModule {}

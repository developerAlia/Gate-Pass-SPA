import { MyvisitorsComponent } from "./user-profile/sections/visitor-section/myvisitors/myvisitors.component";
import { MyfinesComponent } from "./myfines/myfines.component";
import { MygatepassComponent } from "./user-profile/sections/gate-pass-section/mygatepass/mygatepass.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { UsersComponent } from "./users/users.component";
import { UsersCardResolver } from "src/app/shared/resolvers/user/UsersCard.resolver";

const routes: Routes = [
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AdminGuard],
    children: [
      {
        path: "myfines",
        component: MyfinesComponent,
        data: {
          roles: ["Admin", "Student", "Staff"],
          title: "My Fines",
          breadcrumb: "My Fines",
        },
      },
      {
        path: "myprofile/:id",
        component: UserProfileComponent,
        data: {
          roles: ["Admin", "Student", "Staff"],
          title: "My-Profile",
          breadcrumb: "My-Profile",
        },
      },
      {
        path: "users",
        component: UsersComponent,
        resolve: { researchers: UsersCardResolver },
        data: {
          roles: ["Admin", "SysAdmin", "Staff"],
          title: "Users",
          breadcrumb: "Users",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GatepassRoutingModule {}

import { ColorsListsComponent } from "./colors-lists/colors-lists.component";
import { NgModule } from "@angular/core";
import { AdminGuard } from "src/app/shared/guard/admin.guard";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    runGuardsAndResolvers: "always",
    canActivate: [AdminGuard],
    children: [
      {
        path: "colors",
        component: ColorsListsComponent,
        data: {
          roles: ["Admin", "SysAdmin", "Researcher"],
          title: "Colors",
          breadcrumb: "Colors",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationsRoutingModule {}

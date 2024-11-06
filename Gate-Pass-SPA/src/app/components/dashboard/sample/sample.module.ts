import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ColorVersionRoutingModule } from "./sample-routing.module";
import { SampleComponent } from "./sample-component/sample-component";
import { DashboardModule } from "../dashboard.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [SampleComponent],
  imports: [
    CommonModule,
    ColorVersionRoutingModule,
    DashboardModule,
    SharedModule,
  ],
})
export class SampleModule {}

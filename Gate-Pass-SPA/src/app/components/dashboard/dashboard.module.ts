import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserGraphComponent } from "./user-graph/user-graph.component";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { ChartistModule } from "ng-chartist";
import { CountToModule } from "angular-count-to";
import { RequestTypeGraphComponent } from './request-type-graph/request-type-graph.component';

@NgModule({
  declarations: [
    UserGraphComponent,
    RequestTypeGraphComponent,
  ],
  imports: [CommonModule, Ng2GoogleChartsModule, ChartistModule, CountToModule],
  exports: [
    UserGraphComponent,
    RequestTypeGraphComponent
  ],
})
export class DashboardModule {}

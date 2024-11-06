import {
  TranslateLoader,
  TranslateModule,
  TranslateStore,
} from "@ngx-translate/core";
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { ContentLayoutComponent } from "./components/layout/content-layout/content-layout.component";
import { FeatherIconsComponent } from "./components/feather-icons/feather-icons.component";
import { BreadcrumbComponent } from "./components/breadcrumb/breadcrumb.component";
import { ReactiveFormsModule } from "@angular/forms";
// services
import { NavService } from "./services/nav.service";

// Directives
import { ToggleFullscreenDirective } from "./directives/fullscreen.directive";
import { TextInputComponent } from "./components/_forms/text-input/text-input.component";
import { HrmsService } from "./services/hrms.service";
import { ZskService } from "./services/zsk.service";
import { SitsService } from "./services/sits.service";
import { UsersCardResolver } from "./resolvers/user/UsersCard.resolver";
import { TextAreaComponent } from "./components/_forms/text-area/text-area.component";
import { DatePickerComponent } from "./components/_forms/date-picker/date-picker.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminGuard } from "./guard/admin.guard";
import { HasRoleDirective } from "./directives/hasRole.directive";
import { TimeagoModule } from "ngx-timeago";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { WordSplitPipe } from "./pipes/word-split.pipe";
import { FirstWordPipe } from "./pipes/first-word.pipe";
import { BooleanFilterPipe } from "./pipes/boolean-filter.pipe";
import { NumberRangeFilterPipe } from "./pipes/number-range-filter.pipe";
import { DateRangeFilterPipe } from "./pipes/date-range-filter.pipe";
import { RangeDatePickerComponent } from "./components/_forms/range-date-picker/range-date-picker.component";
import { ExternalHrefPipe } from "./pipes/external-href.pipe";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { HttpClient } from "@angular/common/http";
import { NationalityAutoCompleteComponent } from "./components/_forms/nationality-autocomplete/nationality-autocomplete.component";
import { CarMakerAutocompleteComponent } from "./components/_forms/car-maker-autocomplete/car-maker-autocomplete.component";
import { CarModelAutocompleteComponent } from "./components/_forms/car-model-autocomplete/car-model-autocomplete.component";
import { ColorsAutocompleteComponent } from "./components/_forms/colors-autocomplete/colors-autocomplete.component";
import { PlateCodeAutocompleteComponent } from "./components/_forms/plate-code-autocomplete/plate-code-autocomplete.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { GenderSelectionComponent } from "./components/_forms/gender-selection/gender-selection.component";
import { UploadFileComponent } from "./components/_forms/upload-file/upload-file.component";
import { UploadImageComponent } from "./components/_forms/upload-image/upload-image.component";
import { RelationshipSelectionComponent } from "./components/_forms/relationship-selection/relationship-selection.component";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule, TimepickerConfig } from "ngx-bootstrap/timepicker";
import { YearPickerComponent } from "./components/_forms/year-picker/year-picker.component";
import { VisitTypeComponent } from "./components/_forms/visit-type/visit-type.component";
import { OwnerTypeSelectionComponent } from "./components/_forms/owner-type-selection/owner-type-selection.component";
import { DateExtendedPipe } from "./pipes/date-extended.pipe";
import { RequestTypeSelectionComponent } from "./components/_forms/request-type-selection/request-type-selection.component";
import { CarPlateComponent } from "./components/_forms/car-plate/car-plate.component";
import { MonthPickerComponent } from "./components/_forms/month-picker/month-picker.component";
import { CheckBoxComponent } from "./components/_forms/check-box/check-box.component";
import { RequestStatusSelectionComponent } from "./components/_forms/request-status-selection/request-status-selection.component";
import { UserTypeSelectionComponent } from "./components/_forms/user-type-selection/user-type-selection.component";
import { VisitorQrResolver } from "./resolvers/check-in/visitor-qr.resolver";
import { AuthGuard } from "./guard/auth.guard";
import { FineTypeSelectionComponent } from './components/_forms/fine-type-selection/fine-type-selection.component';
import { FineReasonSelectionComponent } from './components/_forms/fine-reason-selection/fine-reason-selection.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ContentLayoutComponent,
    FeatherIconsComponent,
    BreadcrumbComponent,
    ToggleFullscreenDirective,
    TextInputComponent,
    TextAreaComponent,
    HasRoleDirective,
    DatePickerComponent,
    WordSplitPipe,
    FirstWordPipe,
    BooleanFilterPipe,
    NumberRangeFilterPipe,
    DateRangeFilterPipe,
    DateExtendedPipe,
    RangeDatePickerComponent,
    ExternalHrefPipe,
    NationalityAutoCompleteComponent,
    CarMakerAutocompleteComponent,
    CarModelAutocompleteComponent,
    ColorsAutocompleteComponent,
    PlateCodeAutocompleteComponent,
    GenderSelectionComponent,
    UploadFileComponent,
    UploadImageComponent,
    RelationshipSelectionComponent,
    YearPickerComponent,
    VisitTypeComponent,
    OwnerTypeSelectionComponent,
    RequestTypeSelectionComponent,
    CarPlateComponent,
    MonthPickerComponent,
    CheckBoxComponent,
    RequestStatusSelectionComponent,
    UserTypeSelectionComponent,
    FineTypeSelectionComponent,
    FineReasonSelectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    TimeagoModule.forRoot(),
    TranslateModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  exports: [
    FeatherIconsComponent,
    TextInputComponent,
    TextAreaComponent,
    NationalityAutoCompleteComponent,
    UploadFileComponent,
    UploadImageComponent,
    GenderSelectionComponent,
    RelationshipSelectionComponent,
    DatePickerComponent,
    PlateCodeAutocompleteComponent,
    ColorsAutocompleteComponent,
    CarMakerAutocompleteComponent,
    CarModelAutocompleteComponent,
    RangeDatePickerComponent,
    YearPickerComponent,
    VisitTypeComponent,
    OwnerTypeSelectionComponent,
    RequestTypeSelectionComponent,
    RequestStatusSelectionComponent,
    UserTypeSelectionComponent,
    FineTypeSelectionComponent,
    FineReasonSelectionComponent,
    CarPlateComponent,
    MonthPickerComponent,
    CheckBoxComponent,
    HasRoleDirective,
    TimeagoModule,
    FirstWordPipe,
    BooleanFilterPipe,
    NumberRangeFilterPipe,
    DateRangeFilterPipe,
    WordSplitPipe,
    ExternalHrefPipe,
    TranslateModule,
    NgSelectModule,
    BsDatepickerModule,
    TimepickerModule,
    DateExtendedPipe,
    FooterComponent,
  ],
  providers: [
    NavService,
    HrmsService,
    SitsService,
    ZskService,
    AdminGuard,
    AuthGuard,
    UsersCardResolver,
    TranslateStore,
    HttpClient,
    VisitorQrResolver,
    {
      provide: DatePipe,
      useClass: DateExtendedPipe,
    },
  ],
})
export class SharedModule {}

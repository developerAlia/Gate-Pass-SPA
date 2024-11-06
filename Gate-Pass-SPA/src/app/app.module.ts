import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { ErrorInterceptor } from "./interceptors/error.interceptor";
import { AuthService } from "./auth/auth.service";
import { LoginComponent } from "./auth/login/login.component";
import { LoadingInterceptor } from "./interceptors/loading.interceptor";
import { MyNgbDateParserFormatter } from "./shared/dateParserFormatter";
import {
  NgbDateParserFormatter,
  NgbPaginationModule,
} from "@ng-bootstrap/ng-bootstrap";
import { NgxSpinnerModule } from "ngx-spinner";
import { NotificationModule } from "./components/notification/notification.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DatePipe } from "@angular/common";
import { DateExtendedPipe } from "./shared/pipes/date-extended.pipe";
import { PublicModule } from "./components/public/public.module";
import { JwtInterceptor } from "./interceptors/jwt.interceptor";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}
@NgModule({
  declarations: [AppComponent, LoginComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbPaginationModule,
    NotificationModule,
    PublicModule,
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: "en",
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    AuthService,
    {
      provide: NgbDateParserFormatter,
      useFactory: () => new MyNgbDateParserFormatter("longDate"),
    },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

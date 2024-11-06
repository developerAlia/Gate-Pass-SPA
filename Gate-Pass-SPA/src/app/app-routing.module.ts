import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./auth/login/login.component";
import { LandingComponent } from "./components/public/landing/landing.component";
import { ContentLayoutComponent } from "./shared/components/layout/content-layout/content-layout.component";
import { AuthGuard } from "./shared/guard/auth.guard";
import { QrReaderResolver } from "./shared/resolvers/public/qr-reader.resolver";
import { content } from "./shared/routes/content-routes";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard/dashboard-component",
    pathMatch: "full",
  },
  {
    path: "auth/login",
    component: LoginComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: "public/qr/:id",
    component: LandingComponent,
    resolve: { data: QrReaderResolver },
    data: { path: "public/qr/:id" },
  },
  {
    path: "",
    component: ContentLayoutComponent,
    children: content,
  },
  {
    path: "**",
    redirectTo: "/dashboard/dashboard-component",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

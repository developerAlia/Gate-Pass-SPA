import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { AuthService } from "./auth/auth.service";
import { Sys_userInfo } from "./shared/models/sys/sys_userInfo";
import { CustomizerService } from "./shared/services/customizer.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "endless-starterkit";

  constructor(
    private accountService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    // this.setCurrentUser();


  }

  setCurrentUser(): void {
    const user: Sys_userInfo = JSON.parse(localStorage.getItem("gatePassUser"));
    if (user) {
      if (this.accountService.tokenExpired(user.token)) {
        this.accountService.logout();
        this.router.navigate(["/auth/login"]);
      } else {
        // user.langPref = "en";
        this.accountService.setCurrentUser(user);
      }
    } else {
      this.router.navigate(["/auth/login"]);
    }
  }
}

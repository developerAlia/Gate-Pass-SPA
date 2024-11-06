import { HttpClient } from "@angular/common/http";
import { map, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { GatePass_userLogin } from "../shared/models/sys/GatePass_userLogin";
import { Sys_register } from "../shared/models/sys/sys_register";
import { Sys_changePassword } from "../shared/models/sys/sys_changePassword";
import { ReplaySubject } from "rxjs";
import { Sys_userInfo } from "../shared/models/sys/sys_userInfo";
import { LangPref } from "../shared/models/gatepass/GatePassUser";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.apiUrl + "auth/";
  private currentUserSource = new ReplaySubject<Sys_userInfo>(1); // 1  means the size of beffer
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) {}
  login(model: GatePass_userLogin) {
    return this.http.post(this.baseUrl + "login", model).pipe(
      // you have to write retune or
      map((response: Sys_userInfo) => {
        const user = response;
        if (user) {
          console.log(user);

          localStorage.setItem("gatePassUser", JSON.stringify(user));
          localStorage.setItem("selectedLanguage", user.langPref);
          this.setCurrentUser(user);
          // this for decode the token and send it to browser.
        }
      })
    );
  }
  tokenExpired(token: string): boolean {
    const expiry = JSON.parse(atob(token.split(".")[1])).exp;
    // tslint:disable-next-line: new-parens
    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
  logout(): void {
    localStorage.removeItem("gatePassUser");
    this.currentUserSource.next(null);
  }
  register(register: Sys_register) {
    return this.http.post(this.baseUrl + "register", register);
  }
  setCurrentUser(user: Sys_userInfo): void {
    this.currentUserSource.next(user);
  }
  loggedIn() {
    const token = localStorage.getItem("token");
    // to make sure the token is valid and not expaired
  }
  restPassword(userLogin: GatePass_userLogin) {
    return this.http.post(this.baseUrl + "RestPassword", userLogin);
  }
  changePassword(changePassword: Sys_changePassword) {
    return this.http.post(this.baseUrl + "ChangePassword", changePassword);
  }
  userExists(userName: string) {
    return this.http.get(this.baseUrl + "UserExists/" + userName);
  }
  roleMatch(allowedRoles): boolean {
    let isMatch = false;
    if (allowedRoles) {
      let userInfo: Sys_userInfo;
      this.currentUser$.pipe(take(1)).subscribe((user) => {
        userInfo = user;
        if (userInfo.token) {
          allowedRoles.forEach((r) => {
            if (user.roles.find((e) => e === r)) {
              isMatch = true;
            }
          });
        }
      });
    }
    return isMatch;
  }

  postChangeLanguage(data: LangPref) {
    this.currentUser$;
    return this.http.post(this.baseUrl + "changeLang", data);
  }

  updateLangPref(value: string) {
    let userInfo: Sys_userInfo;
    this.currentUser$.pipe(take(1)).subscribe((data) => {
      userInfo = { ...data };
    });
    userInfo.langPref = value;
    this.setCurrentUser(userInfo);
    localStorage.setItem("gatePassUser", JSON.stringify(userInfo));
  }
}

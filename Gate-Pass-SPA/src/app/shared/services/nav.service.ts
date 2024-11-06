import { Injectable, HostListener } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Sys_userInfo } from "../models/sys/sys_userInfo";

// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  badgeType?: string;
  badgeValue?: string;
  active?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  menuUsers?: string[];
  childrenUsers?: string[];
}

@Injectable({
  providedIn: "root",
})
export class NavService {
  public screenWidth: any;
  public collapseSidebar: boolean = false;

  constructor(
    private translate: TranslateService,
    private authService: AuthService
  ) {
    this.onResize();
    if (this.screenWidth < 991) {
      this.collapseSidebar = true;
    }
  }
  getUserId() {
    let userid;
    this.authService.currentUser$
      .pipe(take(1))
      .subscribe((user: Sys_userInfo) => {
        // console.log(user);
        userid = user.usersId;
      });
    return userid;
  }

  // Windows width
  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
  }

  MENUITEMS: Menu[] = [
    {
      title: "Dashboard",
      icon: "home",
      path: "/dashboard/dashboard-component",
      type: "link",
      menuUsers: ["Admin", "Student", "Security Admin", "SysAdmin", "Staff"],
      active: false,
    },
    {
      path: "/gatepass/myprofile/" + this.getUserId(),
      title: "My-Profile",
      icon: "user",
      type: "link",
      menuUsers: ["Admin", "Student", "Security Admin", "SysAdmin", "Staff"],
    },
    {
      path: "/gatepass/users",
      title: "Users",
      icon: "users",
      type: "link",
      menuUsers: ["Admin", "SysAdmin", "Security Admin", "Security"],
    },
    {
      title: "Security",
      icon: "clipboard",
      menuUsers: ["Admin", "SysAdmin", "Security Admin", "Security"],
      type: "sub",
      active: false,
      children: [
        {
          path: "/security/requestlist",
          childrenUsers: ["Admin", "SysAdmin", "Security Admin", "Security"],
          title: "Requests",
          type: "link",
        },
        {
          path: "/security/gatelist",
          childrenUsers: ["Admin", "SysAdmin", "Security Admin", "Security"],
          title: "GateList",
          type: "link",
        },
        {
          path: "/security/finelist",
          childrenUsers: ["Admin", "SysAdmin", "Security Admin", "Security"],
          title: "FineList",
          type: "link",
        },
      ],
    },
    {
      title: "Report",
      icon: "file-text",
      menuUsers: ["Admin", "Student", "Security Admin", "SysAdmin", "Staff"],
      type: "sub",
      active: false,
      children: [
        {
          path: "/report/RequestReport",
          childrenUsers: ["Admin", "Security Admin", "SysAdmin"],
          title: "RequestReport",
          type: "link",
        },
        {
          path: "/report/CheckedInReport",
          childrenUsers: ["Admin", "Security Admin", "SysAdmin"],
          title: "Checked-InReport",
          type: "link",
        },
      ],
    },
  ];
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}

import { HrmsService } from "src/app/shared/services/hrms.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Sys_userInfo } from "../../models/sys/sys_userInfo";
import { NavService, Menu } from "../../services/nav.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent implements OnInit {
  sysUserInfo: Sys_userInfo;

  public menuItems: Menu[];
  language = localStorage.getItem("selectedLanguage");
  public url: any;
  public fileurl: any;
  usersId: number;
  constructor(
    private router: Router,
    public navServices: NavService,
    private account: AuthService,
    private hrmsinfo: HrmsService,
    public translate: TranslateService
  ) {
    this.navServices.items.subscribe((menuItems) => {
      this.menuItems = menuItems;
      this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          menuItems.filter((items) => {
            if (items.path === event.url) this.setNavActive(items);
            if (!items.children) return false;
            items.children.filter((subItems) => {
              if (subItems.path === event.url) this.setNavActive(subItems);
              if (!subItems.children) return false;
              subItems.children.filter((subSubItems) => {
                if (subSubItems.path === event.url)
                  this.setNavActive(subSubItems);
              });
            });
          });
        }
      });
    });
  }
  ngOnInit() {
    this.account.currentUser$.pipe(take(1)).subscribe((user) => {
      this.sysUserInfo = user;
    });
  }
  // Active Nave state
  setNavActive(item) {
    this.menuItems.filter((menuItem) => {
      if (menuItem != item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
          }
        });
      }
    });
  }

  // Click Toggle menu
  toggletNavActive(item) {
    if (!item.active) {
      this.menuItems.forEach((a) => {
        if (this.menuItems.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
        });
      });
    }
    item.active = !item.active;
  }

  //Fileupload
  readUrl(event: any) {
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
  }
}

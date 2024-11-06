import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import { NavigationStart, Router } from "@angular/router";
import { take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { Sys_userInfo } from "../../models/sys/sys_userInfo";
import { NavService, Menu } from "../../services/nav.service";
import { NotificationInterface } from "../../models/notification/notification";
import { NotificationService } from "../../services/notification.service";
import { ToastService } from "../../services/toast.service";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { CustomizerService } from "../../services/customizer.service";
import { GatePassService } from "../../services/gatepass.service";
import { LangPref } from "../../models/gatepass/GatePassUser";

var body = document.getElementsByTagName("body")[0];

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  sysUserInfo: Sys_userInfo;
  public menuItems: Menu[];
  public items: Menu[];
  public notification: NotificationInterface[] = [];
  public openNav: boolean = false;
  public right_sidebar: boolean = false;
  public text: string;
  public mouseNotification: boolean = false;
  subscription: Subscription;

  @Output() rightSidebarEvent = new EventEmitter<boolean>();
  public layoutType: string = "ltr";
  url: string;
  constructor(
    public navServices: NavService,
    private authService: AuthService,
    private router: Router,
    public toastrService: ToastrService,
    public toastService: ToastService,
    private translate: TranslateService,
    public customize: CustomizerService,
    private gpService: GatePassService
  ) {}

  ngOnInit() {
    this.navServices.items.subscribe((menuItems) => {
      this.items = menuItems;
    });
    // if (JSON.parse(localStorage.getItem("selectedLanguage")) == null) {
    //   localStorage.setItem("selectedLanguage", JSON.stringify("ar"));
    //   localStorage.setItem("layout", JSON.stringify("rtl"));
    // }
    // this.changeLanguage(JSON.parse(localStorage.getItem("selectedLanguage")));

    this.customizeLayoutType(JSON.parse(localStorage.getItem("layout")));
    this.authService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.sysUserInfo = user;
      if(user.langPref){
        this.changeLanguage(user.langPref);
      }
      else{
        this.changeLanguage("en");
      }
    });
    /* Your code goes here on every router change
      --> For Getting Notification on each change of the Route to keeps it up to date
      */
    this.router.events.subscribe((ev) => {
      if (ev instanceof NavigationStart) {
      }
    });
  }
  changeLanguage(lang) {
    this.translate.use(lang);
    localStorage.setItem("selectedLanguage", JSON.stringify(lang));

    if (lang == "ar") {
      this.customizeLayoutType("rtl");
      localStorage.setItem("layout", JSON.stringify("rtl"));
    } else {
      this.customizeLayoutType("ltr");
      localStorage.setItem("layout", JSON.stringify("ltr"));
    }
  }
  customizeLayoutType(val) {
    this.customize.setLayoutType(val);
    this.layoutType = val;
  }
  callall(lang) {
    const langData: LangPref = {
      usersId: this.sysUserInfo.usersId,
      langPref: lang,
    };
    this.gpService.postChangeLanguage(langData).subscribe(),
      this.authService.updateLangPref(lang);

    this.changeLanguage(lang);
    // this.reload();
  }
  reload() {
    this.url = this.router.url.toString();
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([`/${this.url}`]).then(() => {});
    });
  }

  collapseSidebar() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
  }
  logout(): void {
    this.authService.logout();

    this.router.navigate(["/auth/login"]);
  }

  ngOnDestroy(): void {
    //this.subscription.unsubscribe();
  }
}

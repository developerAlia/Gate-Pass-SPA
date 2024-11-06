import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { AuthService } from "../auth.service";
import { GatePass_userLogin } from "src/app/shared/models/sys/GatePass_userLogin";
import { ToastrService } from "ngx-toastr";
import { Sys_userInfo } from "src/app/shared/models/sys/sys_userInfo";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  newUser = false;
  public user: GatePass_userLogin;
  public loginForm: FormGroup;
  public errorMessage: any;
  constructor(
    public authService: AuthService,
    private tostar: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.required]],
      password: ["", Validators.required],
    });
  }
  login() {
    this.user = {
      userName: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(this.user).subscribe(
      (next) => {
        this.tostar.success("Login successfully");
        console.log(next);
      },
      (error) => {},
      () => {
        let id;
        this.authService.currentUser$.subscribe((data: Sys_userInfo) => {
          if (data) {
            id = data.usersId;
          }
        });
        const returnUrl = this.route.snapshot.queryParams["returnUrl"];
        if (returnUrl) {
          this.router.navigateByUrl(returnUrl);
        } else {
          this.router.navigate(returnUrl || ["/gatepass/myprofile/" + id]);
        }
      }
    );
  }
}

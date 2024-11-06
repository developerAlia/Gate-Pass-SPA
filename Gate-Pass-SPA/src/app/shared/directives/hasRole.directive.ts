import { Directive, Input, ViewContainerRef, TemplateRef, OnInit } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Sys_userInfo } from '../models/sys/sys_userInfo';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  @Input() appHasRole: string[];
  isVisible = false;
  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService: AuthService) { }
  ngOnInit(): void {
    // clear the view if no roles
    let userInfo: Sys_userInfo;


    this.authService.currentUser$.pipe(take(1)).subscribe(
      user => {
        userInfo = user;
        if (userInfo.token) {

          this.appHasRole.forEach(r => {
            if (userInfo.roles.find(e => e === r)) {

              this.isVisible = true;
              this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
          });
        }
        else {
          this.isVisible = false;
          this.viewContainerRef.clear();
        }
      }


    );


  }
}



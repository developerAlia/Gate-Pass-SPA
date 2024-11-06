import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {

 names:any;
  constructor(private tostr:ToastrService) { }

  ngOnInit(): void {

  }

  changeRole(){


  }

}

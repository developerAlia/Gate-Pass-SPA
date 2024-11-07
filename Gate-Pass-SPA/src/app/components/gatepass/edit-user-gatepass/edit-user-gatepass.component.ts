import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-user-gatepass',
  templateUrl: './edit-user-gatepass.component.html',
  styleUrls: ['./edit-user-gatepass.component.scss']
})
export class EditUserGatepassComponent implements OnInit {
  //test
  public userDetailsForm : FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userDetailsForm = this.fb.group({
      idno: ['', [Validators.required, Validators.required]],
      password: ['', Validators.required],
      fineNote: ['']

    });
  }

}

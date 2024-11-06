import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-color-modal',
  templateUrl: './add-color-modal.component.html',
  styleUrls: ['./add-color-modal.component.scss']
})
export class AddColorModalComponent implements OnInit {
  public colorsForm : FormGroup;

  constructor( public fb : FormBuilder) { }

  ngOnInit(): void {
    this.colorsForm = this.fb.group({
      color: ['', Validators.required]
    });
  }

}

import { Component, OnInit } from '@angular/core';
import * as chartData from "../../google-chart";

@Component({
  selector: 'app-sample-component',
  templateUrl: './sample-component.html',
  styleUrls: ['./sample-component.scss']
})
export class SampleComponent implements OnInit {

  public pieChart2 = chartData.pieChart2;

  constructor() { }

  ngOnInit() { }

}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
  styleUrls: ["./landing.component.scss"],
})
export class LandingComponent implements OnInit {
  publicData: any;

  constructor(private route: ActivatedRoute, private toster: ToastrService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.route.data.subscribe(
      (data: { path: string; data: any }) => {
        if (data.data != null) {
          this.publicData = data.data;
          console.log(this.publicData);
        }
      },
      () => this.toster.error("error")
    );
  }
}

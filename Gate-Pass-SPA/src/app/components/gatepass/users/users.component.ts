import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { take } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";
import { UsersCard } from "src/app/shared/models/gatepass/GatePassUser";
import { Pagination, PaginatedResult } from "src/app/shared/models/pagination";
import { SitsInfo } from "src/app/shared/models/sits/sitsInfo";
import { StdResearcher2Post } from "src/app/shared/models/sits/stdResearcher2Post";
import { GatePassService } from "src/app/shared/services/gatepass.service";
import { SitsService } from "src/app/shared/services/sits.service";
import { StateService } from "src/app/shared/services/state.service";
import { fileSizeValidator } from "src/app/shared/validators/filesize.validator";
import { requiredFileType } from "src/app/shared/validators/filetype.validator";
import { Constants } from "src/app/shared/constants/constants";
import { AdminService } from "src/app/shared/services/admin.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  pagination: Pagination = {
    currentPage: 1,
    itemsPerPage: 8,
    totalItems: 0,
    totalPages: 0,
  };
  sitsInfo: SitsInfo;
  stdResearcher2Post: StdResearcher2Post;
  userParams: any = { fullName: "" };
  addStdForm: FormGroup;
  pageSize = 6;
  page = 1;
  userCard: UsersCard[];
  tempFileToUpload: File;
  tempURLImg;
  addExternalForm: FormGroup;
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private sitsSerive: SitsService,
    private toster: ToastrService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private stateService: StateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEmps();
    // this.stateService.state$.pipe(take(1)).subscribe(
    //   (data) => {
    //     if (data) {
    //       this.userCard = data[0].result;

    //       this.pagination = data[0].pagination;
    //       this.userParams = data[1];
    //     } else {
    //       this.route.data.subscribe(
    //         (data) => {
    //           this.userCard = data.researchers.result;
    //           this.pagination = data.researchers.pagination;
    //         },
    //         () => this.toster.error("error")
    //       );
    //     }
    //   },
    //   () => this.toster.error("error")
    // );
  }

  search() {
    this.loadEmps();
  }

  changePage(event: any) {
    this.pagination.currentPage = event;
    //To Scroll to top of page when page changes
    window.scroll(0, 0);
    this.loadEmps();
  }
  loadEmps(): void {
    this.adminService
      .getUsersCard(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe(
        (res: PaginatedResult<UsersCard[]>) => {
          this.userCard = res.result;
          this.pagination = res.pagination;
          // console.log(this.userCard);

          // const tempData = [res, this.userParams];
          // this.stateService.state$.next(tempData);
        },
        () => {
          this.toster.error("not working!");
        }
      );
  }
  addStdModelFun(addStdModel: any): void {
    this.sitsInfo = null;
    this.addStdForm = this.fb.group({
      stdId: ["", Validators.required],
    });
    this.addExternalForm = this.fb.group({
      externalResearcherId: [null],
      fullName: [null, Validators.required],
      workingPlace: [null, Validators.required],
      department: [null, Validators.required],
      Email: [null, [Validators.required, Validators.email]],
      mobile: [null, Validators.required],
      Designation: [null, Validators.required],
      University: [null, Validators.required],
      Degree: [null, Validators.required],
      img: [null],
    });
    const modal = this.modalService.open(addStdModel, {
      centered: true,
      ariaLabelledBy: "modal-basic-title",
    });
    // modal.dismiss(()=> {this.onDismissModalAndChange();})
    modal.result.then(
      () => {},
      () => {
        this.onDismissModalAndChange();
      }
    );
  }
  searchStd(): void {
    this.sitsInfo = null;
    this.sitsSerive.getSitsInfo(this.addStdForm.value.stdId).subscribe(
      (data) => {
        this.sitsInfo = data;
      },
      () => this.toster.warning("something went wrong!!"),
      () => {
        if (this.sitsInfo.userId === 0) {
          this.toster.warning("The student is not founded");
        }
      }
    );
  }
  submitted(): void {
    this.stdResearcher2Post = {
      userId: this.sitsInfo.userId,
      UserName: this.sitsInfo.userName,
    };
    // this.GpService
    //   .postStdResearcher(this.stdResearcher2Post)
    //   .subscribe((data) => {
    //     let x: UsersCard;
    //     x = {
    //       qrUsersId: data,
    //       systemId: this.sitsInfo.userId,
    //       img: this.sitsInfo.img,
    //       fullName: this.sitsInfo.fullName,
    //       email: this.sitsInfo.email,
    //       zUserTypeId: 2,
    //       publicationsNum: 0,
    //       moHERIResearchesNum: 0,
    //       suminarsNum: 0,
    //     };
    //     this.userCard.push(x);
    //     this.toster.success("Done!");
    //     this.modalService.dismissAll();
    //   });
  }

  checkFileSize(files: FileList) {
    if (files && files[0]) {
      this.addExternalForm.controls.img.setValidators([
        Validators.required,
        requiredFileType(Constants.FILE_TYPE_PHOTO),
        //It's passes the file info and the maxsize of allowed data
        fileSizeValidator(files, Constants.MAX_SIZE_IMG),
      ]);

      this.tempFileToUpload = files.item(0);
      this.addExternalForm.controls.img.updateValueAndValidity();

      //To read the Image and convert it to Base64
      var reader = new FileReader();
      reader.readAsDataURL(files[0]); // read file as data url
      reader.onload = (event) => {
        // called once readAsDataURL is completed
        // It will be set to Base64
        this.tempURLImg = event.target.result;
      };
    }
  }

  onDismissModalAndChange() {
    this.addStdForm.reset();
    this.tempURLImg = null;
    this.tempFileToUpload = null;
  }
}

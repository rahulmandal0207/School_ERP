import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';
declare var $: any;

@Component({
  selector: 'app-fee-registration-head',
  templateUrl: './fee-registration-head.component.html',
  styleUrls: ['./fee-registration-head.component.css']
})
export class FeeRegistrationHeadComponent {
  dataLoading: boolean = false
  FeeRegistrationHeadList: any = []
  FeeRegistrationHead: any = {}
  isSubmitted = false
  StatusList: any[] = []
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  ClassList: any[] = []
  filterClass: any[] = [];
  filterSession: any[] = [];
  PupilTypeList: any[] = [];
  filterPupilType: any[] = [];
  AdmissionTypeList: any[] = [];
  SessionList: any[] = [];
  StaffDetails: any = {};

  sort(key: any) {
    this.sortKey = key;
    this.reverse = !this.reverse;
  }

  onTableDataChange(p: any) {
    this.p = p
  }

  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private localService: LocalService

  ) { }

  ngOnInit(): void {
    //this.getFeeRegistrationHeadList();
    this.getStatusList();
    this.getClassList();
    this.getPupilTypeList();
    this.getAdmissionTypeList();
    this.getSessionList();
    this.StaffDetails = this.localService.getEmployeeDetail();
  }

  resetForm() {
    this.FeeRegistrationHead = {}
    this.isSubmitted = false
    this.FeeRegistrationHead.Status = 1
  }

  filterClassList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterClass = this.ClassList.filter((option: any) => option.ClassName.toLowerCase().includes(filterValue));
    } else {
      this.filterClass = this.ClassList;
    }
  }

  filterSessionList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterSession = this.SessionList.filter((option: any) => option.SessionName.toLowerCase().includes(filterValue));
    } else {
      this.filterSession = this.SessionList;
    }
  }

  filterPupilTypeList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterPupilType = this.PupilTypeList.filter((option: any) => option.PupilTypeName.toLowerCase().includes(filterValue));
    } else {
      this.filterPupilType = this.PupilTypeList;
    }
  }

  getClassList() {
    var obj = {}
    this.dataLoading = true
    this.service.getClassList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.ClassList = response.ClassList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  getSessionList() {
    var obj = {}
    this.dataLoading = true
    this.service.getSessionList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.SessionList = response.SessionList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  getPupilTypeList() {
    var obj = {}
    this.dataLoading = true
    this.service.getPupilTypeList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.PupilTypeList = response.PupilTypeList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  getAdmissionTypeList() {
    var obj = {}
    this.service.getAdmissionTypeList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AdmissionTypeList = response.AdmissionTypeList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching Admission records")
    }))
  }

  getStatusList() {
    var obj = {}
    this.service.getStatusList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.StatusList = response.StatusList
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error while fetching status records")
    }))
  }

  getFeeRegistrationHeadList() {
    this.dataLoading = true
    this.service.getFeeRegistrationHeadList(this.FeeRegistrationHead).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.FeeRegistrationHeadList = response.FeeRegistrationHeadList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveFeeRegistrationHead(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }

    var obj = {
      FeeRegistrationHeadList: this.FeeRegistrationHeadList,
      CreatedBy: this.StaffDetails.StaffLoginId
    }

    this.dataLoading = true;
    this.service.saveFeeRegistrationHead(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.FeeRegistrationHead.FeeRegistrationHeadId > 0) {
          this.toastr.success("FeeRegistrationHead Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("FeeRegistrationHead added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getFeeRegistrationHeadList()
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteFeeRegistrationHead(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteFeeRegistrationHead(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getFeeRegistrationHeadList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editFeeRegistrationHead(obj: any) {
    this.resetForm()
    this.FeeRegistrationHead = obj
  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';
declare var $: any;

@Component({
  selector: 'app-fee-admission-head',
  templateUrl: './fee-admission-head.component.html',
  styleUrls: ['./fee-admission-head.component.css']
})
export class FeeAdmissionHeadComponent {

  dataLoading: boolean = false
  FeeAdmissionHeadList: any = []
  FeeAdmissionHead: any = {}
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
    //this.getFeeAdmissionHeadList();
    this.getStatusList();
    this.getClassList();
    this.getPupilTypeList();
    this.getAdmissionTypeList();
    this.getSessionList();
    this.StaffDetails = this.localService.getEmployeeDetail();
  }

  resetForm() {
    this.FeeAdmissionHead = {}
    this.isSubmitted = false
    this.FeeAdmissionHead.Status = 1
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

  getFeeAdmissionHeadList() {
    this.dataLoading = true
    this.service.getFeeAdmissionHeadList(this.FeeAdmissionHead).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.FeeAdmissionHeadList = response.FeeAdmissionHeadList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveFeeAdmissionHead(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }

    var obj = {
      FeeAdmissionHeadList : this.FeeAdmissionHeadList,
      CreatedBy : this.StaffDetails.StaffLoginId
    }

    this.dataLoading = true;
    this.service.saveFeeAdmissionHead(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.FeeAdmissionHead.FeeAdmissionHeadId > 0) {
          this.toastr.success("FeeAdmissionHead Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("FeeAdmissionHead added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getFeeAdmissionHeadList()
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteFeeAdmissionHead(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteFeeAdmissionHead(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getFeeAdmissionHeadList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editFeeAdmissionHead(obj: any) {
    this.resetForm()
    this.FeeAdmissionHead = obj
  }

}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';
declare var $:any;

@Component({
  selector: 'app-fee-registration',
  templateUrl: './fee-registration.component.html',
  styleUrls: ['./fee-registration.component.css']
})
export class FeeRegistrationComponent {

  dataLoading: boolean = false
  FeeRegistrationList: any = []
  FeeRegistration: any = {}
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
    //this.getFeeRegistrationList();
    this.getStatusList();
    this.getClassList();
    this.getPupilTypeList();
    this.getAdmissionTypeList();
    this.getSessionList();
    this.StaffDetails = this.localService.getEmployeeDetail();
  }

  resetForm() {
    this.FeeRegistration = {}
    this.isSubmitted = false
    this.FeeRegistration.Status = 1
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

  getFeeRegistrationList() {
    this.dataLoading = true
    console.log(this.FeeRegistration)

    this.service.getFeeRegistrationList(this.FeeRegistration).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.FeeRegistrationList = response.FeeRegistrationList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveFeeRegistration(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.FeeRegistrationList.CreatedBy = this.StaffDetails.StaffLoginId;

    var obj = {
      FeeRegistrationList : this.FeeRegistrationList,
      StaffLoginId: this.StaffDetails.StaffLoginId,
    }
    this.dataLoading = true;
    this.service.saveFeeRegistration(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.FeeRegistration.FeeRegistrationId > 0) {
          this.toastr.success("FeeRegistration Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("FeeRegistration added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getFeeRegistrationList()
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

  deleteFeeRegistration(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteFeeRegistration(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getFeeRegistrationList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editFeeRegistration(obj: any) {
    this.resetForm()
    this.FeeRegistration = obj
  }

}

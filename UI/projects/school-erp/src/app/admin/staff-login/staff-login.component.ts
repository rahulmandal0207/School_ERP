import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';

declare var $: any;

@Component({
  selector: 'app-staff-login',
  templateUrl: './staff-login.component.html',
  styleUrls: ['./staff-login.component.css']
})
export class StaffLoginComponent {

  dataLoading: boolean = false
  StaffLoginList: any = []
  StaffLogin: any = {}
  displayedColumns: string[] = [
    'StaffName',
    'Status',
    'UserName',
    'LoginPassword',
    'SchoolName',
    'edit',
    'delete'
  ]
  isSubmitted = false
  StatusList: any[] = []
  StaffList: any[] = []
  SchoolList: any[] = []
  filterStaff: any[] = []
  filterSchool: any[] = []
  hide = true
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  StaffDetials:any = {}

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
    this.getStaffLoginList();
    this.getStatusList();
    this.getStaffList();
    this.getSchoolList();
    this.StaffDetials = this.localService.getEmployeeDetail();
  }


  filterStaffList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterStaff = this.StaffList.filter((option: any) => option.StaffName.toLowerCase().includes(filterValue));
    } else {
      this.filterStaff = this.StaffList;
    }
  }

  filterSchoolList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterSchool = this.SchoolList.filter((option: any) => option.SchoolName.toLowerCase().includes(filterValue));
    } else {
      this.filterSchool = this.SchoolList;
    }
  }

  resetForm() {
    this.StaffLogin = {}
    this.isSubmitted = false
    this.StaffLogin.Status = 1
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.StaffLoginList.filter = filterValue.trim().toLowerCase();
  }

  getSchoolList() {
    var obj = {}
    this.dataLoading = true
    this.service.getSchoolList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.SchoolList = response.SchoolList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  getStaffList() {
    var obj = {}
    this.dataLoading = true
    this.service.getStaffList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.StaffList = response.StaffList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
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

  getStaffLoginList() {
    var obj = {}
    this.dataLoading = true
    this.service.getStaffLoginList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.StaffLoginList = response.StaffLoginList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveStaffLogin(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.StaffLogin.UpdatedBy = this.StaffDetials.StaffLoginId
    this.StaffLogin.CreateBy = this.StaffDetials.StaffLoginId
    
    this.service.saveStaffLogin(this.StaffLogin).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.StaffLogin.StaffLoginId > 0) {
          this.toastr.success("StaffLogin Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("StaffLogin added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getStaffLoginList()
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
    }))
  }

  deleteStaffLogin(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteStaffLogin(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getStaffLoginList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editStaffLogin(obj: any) {
    this.resetForm()
    this.StaffLogin = obj

  }
}

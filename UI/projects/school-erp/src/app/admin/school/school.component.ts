import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';
declare var $: any

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent {
  dataLoading: boolean = false
  SchoolList: any = []
  School: any = {}
  isSubmitted = false
  StatusList: any[] = []
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  StaffDetials: any = {};


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
    this.getSchoolList();
    this.getStatusList();
    this.StaffDetials = this.localService.getEmployeeDetail();
  }

  resetForm() {
    this.School = {}
    this.isSubmitted = false

    this.School.Status = 1
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.SchoolList.filter = filterValue.trim().toLowerCase();
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

  getSchoolList() {
    var obj = {}
    this.dataLoading = true
    this.service.getSchoolList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.SchoolList = response.SchoolList
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveSchool(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }

    this.School.UpdatedBy = this.StaffDetials.StaffLoginId
    this.School.CreatedBy = this.StaffDetials.StaffLoginId

    this.service.saveSchool(this.School).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.School.SchoolId > 0) {
          this.toastr.success("School Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("School added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getSchoolList()
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
    }))
  }

  deleteSchool(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteSchool(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getSchoolList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editSchool(obj: any) {
    this.resetForm()
    this.School = obj

  }
}

import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';
declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  dataLoading: boolean = false
  RoleList: any = []
  Role: any = {}
  isSubmitted = false
  StatusList: any[] = []
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  StaffDetails:any = {}



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
    this.getRoleList();
    this.getStatusList();
    this.StaffDetails = this.localService.getEmployeeDetail();
  }

  resetForm() {
    this.Role = {}
    this.isSubmitted = false
    this.Role.Status = 1

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.RoleList.filter = filterValue.trim().toLowerCase();
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

  getRoleList() {
    var obj = {}
    this.dataLoading = true
    this.service.getRoleList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.RoleList = response.RoleList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveRole(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.Role.UpdatedBy = this.StaffDetails.StaffLoginId;
    this.service.saveRole(this.Role).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Role.RoleId > 0) {
          this.toastr.success("Role Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Role added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getRoleList()
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
    }))
  }

  deleteRole(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteRole(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getRoleList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editRole(obj: any) {
    this.resetForm()
    this.Role = obj

  }

}

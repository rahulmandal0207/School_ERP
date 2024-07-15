import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
declare var $: any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {
  dataLoading: boolean = false
  DepartmentList: any = []
  Department: any = {}
  displayedColumns: string[] = ['DepartmentName', 'Status', 'edit', 'delete']
  isSubmitted = false
  /*  isUpdate = false
    modalTitle: string
    modalSubmitBtn: string*/
  StatusList: any[] = []
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];



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
    private _liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit(): void {
    this.getDepartmentList();
    this.getStatusList();
  }

  resetForm() {
    this.Department = {}
    this.isSubmitted = false
    this.Department.Status = 1
  }

  //  applyFilter(event: Event) {
  //    const filterValue = (event.target as HTMLInputElement).value;
  //    this.DepartmentList.filter = filterValue.trim().toLowerCase();
  //  }

  //  announceSortChange(sortState: Sort) {
  //    if (sortState.direction) {
  //      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
  //    } else {
  //      this._liveAnnouncer.announce('Sorting cleared');
  //    }
  //  }

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

  getDepartmentList() {
    var obj = {}
    this.dataLoading = true
    this.service.getDepartmentList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.DepartmentList = response.DepartmentList;
        //this.DepartmentList.sort = this.sort;
        //this.DepartmentList.paginator = this.paginator;

      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveDepartment(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.service.saveDepartment(this.Department).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Department.DepartmentId > 0) {
          this.toastr.success("Department detail updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Department added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getDepartmentList()
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
    }))
  }

  deleteDepartment(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteDepartment(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getDepartmentList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editDepartment(obj: any) {
    this.resetForm()
    this.Department = obj

  }
}

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
declare var $:any

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css']
})
export class HeadComponent {

  dataLoading: boolean = false
  HeadList: any = []
  Head: any = {}
  isSubmitted = false
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
  ) { }

  ngOnInit(): void {
    this.getHeadList();
    this.getStatusList();
  }

  resetForm() {
    this.Head = {}
    this.isSubmitted = false
    this.Head.Status = 1
    this.Head.IsCompulsory = false;
  }

  selectChange(obj:any) {
    if (obj.IsSelected) {
      obj.IsCompulsory = true
    } else {
      obj.IsCompulsory = false;
    } 
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

  getHeadList() {
    var obj = {}
    this.dataLoading = true
    this.service.getHeadList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.HeadList = response.HeadList;

      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveHead(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.service.saveHead(this.Head).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Head.HeadId > 0) {
          this.toastr.success("Head Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Head added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getHeadList()
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
    }))
  }

  deleteHead(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteHead(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getHeadList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editHead(obj: any) {
    this.resetForm()
    this.Head = obj
  }
}

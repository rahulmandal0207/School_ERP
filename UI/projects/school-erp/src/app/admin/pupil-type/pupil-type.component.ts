import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
declare var $:any;

@Component({
  selector: 'app-pupil-type',
  templateUrl: './pupil-type.component.html',
  styleUrls: ['./pupil-type.component.css']
})
export class PupilTypeComponent {
  dataLoading: boolean = false
  PupilTypeList: any = []
  PupilType: any = {}
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
    this.getPupilTypeList();
    this.getStatusList();
  }

  resetForm() {
    this.PupilType = {}
    this.isSubmitted = false
    this.PupilType.Status = 1
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

  savePupilType(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.service.savePupilType(this.PupilType).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.PupilType.PupilTypeId > 0) {
          this.toastr.success("PupilType Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("PupilType added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getPupilTypeList()
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
    }))
  }

  deletePupilType(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deletePupilType(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getPupilTypeList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editPupilType(obj: any) {
    this.resetForm()
    this.PupilType = obj
  }

}

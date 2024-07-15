import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
declare var $: any;

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent {
  dataLoading: boolean = false
  SectionList: any = []
  Section: any = {}
  isSubmitted = false
  StatusList: any[] = []
  PageSize = ConstantData.PageSizes;
  p: number = 1;
  Search: string = '';
  reverse: boolean = false;
  sortKey: string = '';
  itemPerPage: number = this.PageSize[0];
  ClassList:any[] = []
  filterClass:any[] = []



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
    this.getSectionList();
    this.getStatusList();
    this.getClassList();
  }

  resetForm() {
    this.Section = {}
    this.isSubmitted = false
    this.Section.Status = 1
  }


  filterClassList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterClass = this.ClassList.filter((option: any) => option.ClassName.toLowerCase().includes(filterValue));
    } else {
      this.filterClass = this.ClassList;
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

  getSectionList() {
    var obj = {}
    this.dataLoading = true
    this.service.getSectionList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.SectionList = response.SectionList;
        //this.SectionList.sort = this.sort;
        //this.SectionList.paginator = this.paginator;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveSection(form: NgForm) {
    this.isSubmitted = true
    if (form.invalid) {
      this.toastr.error("Fill all the required fields !!")
      return
    }
    this.service.saveSection(this.Section).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.Section.SectionId > 0) {
          this.toastr.success("Section Updated successfully")
          $('#staticBackdrop').modal('hide')
        } else {
          this.toastr.success("Section added successfully")
        }
        this.resetForm()
        form.resetForm();
        this.getSectionList()
      } else {
        this.toastr.error(response.Message)
      }
    }, (err => {
      this.toastr.error("Error occured while submitting data")
    }))
  }

  deleteSection(obj: any) {
    if (confirm("Are your sure you want to delete this recored")) {

      this.service.deleteSection(obj).subscribe(r1 => {
        let response = r1 as any
        if (response.Message == ConstantData.SuccessMessage) {
          this.toastr.success("Record Deleted successfully")
          this.getSectionList()
        } else {
          this.toastr.error(response.Message)
        }
      }, (err => {
        this.toastr.error("Error occured while deleteing the recored")
      }))
    }
  }

  editSection(obj: any) {
    this.resetForm()
    this.Section = obj
  }
}

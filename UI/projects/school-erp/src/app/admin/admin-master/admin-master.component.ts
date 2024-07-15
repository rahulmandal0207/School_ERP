import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../utils/app.service';
declare var $: any;
import { LocalService } from "../../utils/local.service";
import { ConstantData } from "../../utils/constant-data";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-master',
  templateUrl: './admin-master.component.html'
})
export class AdminMasterComponent implements OnInit {
  IsMenuShow = true;
  dataLoading: boolean = false;
  employeeDetail: any = {};

  screenWidth: any;

  constructor(
    private localService: LocalService,
    private router: Router,
    private service:AppService,
    private toastr:ToastrService,
  ) { }

  ngOnInit(): void {
    this.employeeDetail = this.localService.getEmployeeDetail();
    this.screenWidth = window.innerWidth;
    this.getUserMenuList();

  }
  MenuList:any[]=[];
  getUserMenuList() {
    var obj = {
      StaffLoginId : this.employeeDetail.StaffLoginId,
    }
    this.dataLoading = true
    this.service.getUserMenuList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.MenuList = response.MenuList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;

  }

  checkSideNav() {
    if (this.screenWidth <= 500) {
      this.hideSideBar();
    }
  }

  hideSideBar() {
    if (this.IsMenuShow) {
      $('body').addClass('toggle-sidebar');
      this.IsMenuShow = false;
    }
    else {
      $('body').removeClass('toggle-sidebar');
      this.IsMenuShow = true;
    }

  }

  logOut() {
    this.localService.removeEmployeeDetail();
    this.router.navigate(['/admin-login']);
  }

}

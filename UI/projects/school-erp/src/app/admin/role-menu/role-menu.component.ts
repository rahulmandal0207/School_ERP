import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';
declare var $: any;

@Component({
  selector: 'app-role-menu',
  templateUrl: './role-menu.component.html',
  styleUrls: ['./role-menu.component.css']
})

export class RoleMenuComponent {

  dataLoading: boolean = false
  RoleMenu: any = {}
  isSubmitted = false
  StatusList: any[] = []
  PageSizes = ConstantData.PageSizes;
  RoleList: any[] = []
  AllRoleMenuList: any[] = []
  filterRole: any[] = []
  StaffDetials:any={};


  constructor(
    private service: AppService,
    private toastr: ToastrService,
    private localService:LocalService
  ) { }


  ngOnInit(): void {
    this.getRoleList();
    this.StaffDetials = this.localService.getEmployeeDetail();
  }

  filterRoleList(value: any) {
    if (value) {
      const filterValue = value.toLowerCase();
      this.filterRole = this.RoleList.filter((option: any) => option.RoleTitle.toLowerCase().includes(filterValue));
    } else {
      this.filterRole = this.RoleList;
    }
  }

  getRoleList() {
    var obj = {}
    this.dataLoading = true
    this.service.getRoleList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.RoleList = response.RoleList
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error whilte fetching Role list")
      this.dataLoading = false;
    }))
  }

  selectAllMenu(pageGroup: any) {
    pageGroup.RoleMenuList.forEach((e1: any) => {
      if (pageGroup.IsSelectAll) {
        e1.IsSelected = true;
        e1.CanEdit = true;
        e1.CanDelete = true;
        e1.CanCreate = true;
      } else {
        e1.IsSelected = false;
        e1.CanEdit = false;
        e1.CanDelete = false;
        e1.CanCreate = false;
      }
    });
  }

  selectMenu(e1: any) {
    if (e1.IsSelected) {
      e1.CanEdit = true;
      e1.CanDelete = true;
      e1.CanCreate = true;
    } else {
      e1.CanEdit = false;
      e1.CanDelete = false;
      e1.CanCreate = false;
    }
  }

  getRoleMenuList(option: any) {
    this.RoleMenu.RoleId = option.RoleId;
    var obj = {
      RoleId: this.RoleMenu.RoleId,
      Status: 1
    }
    this.dataLoading = true
    this.service.getRoleMenuList(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        this.AllRoleMenuList = response.AllRoleMenuList;
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false
    }, (err => {
      this.toastr.error("Error while fetching records")
    }))
  }

  saveRoleMenu() {
    var RoleMenuList:any[] = [];
    this.AllRoleMenuList.forEach((e1: any) => {
      e1.RoleMenuList.forEach((e2:any) => {
        RoleMenuList.push(e2);
      });
    });
    
    var obj = {
      RoleId: this.RoleMenu.RoleId,
      StaffLoginId : this.StaffDetials.StaffLoginId, 
      RoleMenuList: RoleMenuList,
    };

    this.dataLoading = true;
    this.service.saveRoleMenu(obj).subscribe(r1 => {
      let response = r1 as any
      if (response.Message == ConstantData.SuccessMessage) {
        if (this.RoleMenu.RoleMenuId > 0) {
          this.toastr.success("Role Menu Updated successfully")
        } else {
          this.toastr.success("Role Menu added successfully")
        }
        this.AllRoleMenuList = [];
      } else {
        this.toastr.error(response.Message)
      }
      this.dataLoading = false;
    }, (err => {
      this.toastr.error("Error occured while submitting data")
      this.dataLoading = false;
    }))
  }

}

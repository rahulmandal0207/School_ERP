import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AppService {
  private readonly baseUrl: string = "https://localhost:44334/api/";

  constructor(private http: HttpClient) {
    //this.baseUrl = "http://localhost:3776/";
  }

  // Status Type
  getStatusList(obj: any) {
    return this.http.post(this.baseUrl + "enum/StatusList", obj)
  }

  //  gender Type
  getGenderList(obj: any) {
    return this.http.post(this.baseUrl + "enum/GenderList", obj)
  }

  // Staff Type
  getStaffTypeList(obj: any) {
    return this.http.post(this.baseUrl + "enum/StaffTypeList", obj)
  }

  // Admission Type
  getAdmissionTypeList(obj: any) {
    return this.http.post(this.baseUrl + "enum/AdmissionTypeList", obj)
  }

  /* ---------------------------------------------------------------------- */

  // Designation 
  getDesignationList(obj: any) {
    return this.http.post(this.baseUrl + "Designation/DesignationList", obj)
  }

  saveDesignation(obj: any) {
    return this.http.post(this.baseUrl + "Designation/saveDesignation", obj)
  }

  deleteDesignation(obj: any) {
    return this.http.post(this.baseUrl + "Designation/deleteDesignation", obj)
  }

  /* ---------------------------------------------------------------------- */

  //Department
  getDepartmentList(obj: any) {
    return this.http.post(this.baseUrl + "Department/DepartmentList", obj)
  }

  saveDepartment(obj: any) {
    return this.http.post(this.baseUrl + "Department/saveDepartment", obj)
  }

  deleteDepartment(obj: any) {
    return this.http.post(this.baseUrl + "Department/deleteDepartment", obj)
  }

  /* ---------------------------------------------------------------------- */

  // Staff
  getStaffList(obj: any) {
    return this.http.post(this.baseUrl + "Staff/StaffList", obj)
  }

  saveStaff(obj: any) {
    return this.http.post(this.baseUrl + "Staff/saveStaff", obj)
  }

  deleteStaff(obj: any) {
    return this.http.post(this.baseUrl + "Staff/deleteStaff", obj)
  }

  /* ---------------------------------------------------------------------- */

  // Staff Login
  StaffLogin(obj: any) {
    return this.http.post(this.baseUrl + "StaffLogin/StaffLogin", obj)
  }

  getStaffLoginList(obj: any) {
    return this.http.post(this.baseUrl + "StaffLogin/StaffLoginList", obj)
  }

  saveStaffLogin(obj: any) {
    return this.http.post(this.baseUrl + "StaffLogin/saveStaffLogin", obj)
  }

  deleteStaffLogin(obj: any) {
    return this.http.post(this.baseUrl + "StaffLogin/deleteStaffLogin", obj)
  }

  /* ---------------------------------------------------------------------- */

  // School
  getSchoolList(obj: any) {
    return this.http.post(this.baseUrl + "School/SchoolList", obj)
  }

  saveSchool(obj: any) {
    return this.http.post(this.baseUrl + "School/saveSchool", obj)
  }

  deleteSchool(obj: any) {
    return this.http.post(this.baseUrl + "School/deleteSchool", obj)
  }

  /* ---------------------------------------------------------------------- */

  //PageGroup
  getPageGroupList(obj: any) {
    return this.http.post(this.baseUrl + "PageGroup/PageGroupList", obj)
  }

  savePageGroup(obj: any) {
    return this.http.post(this.baseUrl + "PageGroup/savePageGroup", obj)
  }

  deletePageGroup(obj: any) {
    return this.http.post(this.baseUrl + "PageGroup/deletePageGroup", obj)
  }

  /* ---------------------------------------------------------------------- */

  //Page
  getPageList(obj: any) {
    return this.http.post(this.baseUrl + "Page/PageList", obj)
  }

  savePage(obj: any) {
    return this.http.post(this.baseUrl + "Page/savePage", obj)
  }

  deletePage(obj: any) {
    return this.http.post(this.baseUrl + "Page/deletePage", obj)
  }

  /* ---------------------------------------------------------------------- */

  //Menu
  getUserMenuList(obj: any) {
    return this.http.post(this.baseUrl + "Menu/UserMenuList", obj)
  }
  getMenuList(obj: any) {
    return this.http.post(this.baseUrl + "Menu/MenuList", obj)
  }

  saveMenu(obj: any) {
    return this.http.post(this.baseUrl + "Menu/saveMenu", obj)
  }

  deleteMenu(obj: any) {
    return this.http.post(this.baseUrl + "Menu/deleteMenu", obj)
  }

  /* ---------------------------------------------------------------------- */

  //Role
  getRoleList(obj: any) {
    return this.http.post(this.baseUrl + "Role/RoleList", obj)
  }

  saveRole(obj: any) {
    return this.http.post(this.baseUrl + "Role/saveRole", obj)
  }

  deleteRole(obj: any) {
    return this.http.post(this.baseUrl + "Role/deleteRole", obj)
  }

  /* ---------------------------------------------------------------------- */

  //RoleMenu
  getRoleMenuList(obj: any) {
    return this.http.post(this.baseUrl + "RoleMenu/AllRoleMenuList", obj)
  }

  saveRoleMenu(obj: any) {
    return this.http.post(this.baseUrl + "RoleMenu/saveRoleMenu", obj)
  }

  /* ---------------------------------------------------------------------- */

  //StaffLoginRole
  getStaffLoginRoleList(obj: any) {
    return this.http.post(this.baseUrl + "StaffLoginRole/StaffLoginRoleList", obj)
  }

  saveStaffLoginRole(obj: any) {
    return this.http.post(this.baseUrl + "StaffLoginRole/saveStaffLoginRole", obj)
  }

  deleteStaffLoginRole(obj: any) {
    return this.http.post(this.baseUrl + "StaffLoginRole/deleteStaffLoginRole", obj)
  }

  /* ---------------------------------------------------------------------- */

  //Head
  getHeadList(obj: any) {
    return this.http.post(this.baseUrl + "Head/HeadList", obj)
  }

  saveHead(obj: any) {
    return this.http.post(this.baseUrl + "Head/saveHead", obj)
  }

  deleteHead(obj: any) {
    return this.http.post(this.baseUrl + "Head/deleteHead", obj)
  }

  /* ---------------------------------------------------------------------- */

  //Session
  getSessionList(obj: any) {
    return this.http.post(this.baseUrl + "Session/SessionList", obj)
  }

  saveSession(obj: any) {
    return this.http.post(this.baseUrl + "Session/saveSession", obj)
  }

  deleteSession(obj: any) {
    return this.http.post(this.baseUrl + "Session/deleteSession", obj)
  }

  /* ---------------------------------------------------------------------- */

  //State
  getStateList(obj: any) {
    return this.http.post(this.baseUrl + "State/StateList", obj)
  }

  saveState(obj: any) {
    return this.http.post(this.baseUrl + "State/saveState", obj)
  }

  deleteState(obj: any) {
    return this.http.post(this.baseUrl + "State/deleteState", obj)
  }

  /* ---------------------------------------------------------------------- */

  //City
  getCityList(obj: any) {
    return this.http.post(this.baseUrl + "City/CityList", obj)
  }

  saveCity(obj: any) {
    return this.http.post(this.baseUrl + "City/saveCity", obj)
  }

  deleteCity(obj: any) {
    return this.http.post(this.baseUrl + "City/deleteCity", obj)
  }

  /* ---------------------------------------------------------------------- */

  //Class
  getClassList(obj: any) {
    return this.http.post(this.baseUrl + "Class/ClassList", obj)
  }

  saveClass(obj: any) {
    return this.http.post(this.baseUrl + "Class/saveClass", obj)
  }

  deleteClass(obj: any) {
    return this.http.post(this.baseUrl + "Class/deleteClass", obj)
  }

  /* ---------------------------------------------------------------------- */

  //Section
  getSectionList(obj: any) {
    return this.http.post(this.baseUrl + "Section/SectionList", obj)
  }

  saveSection(obj: any) {
    return this.http.post(this.baseUrl + "Section/saveSection", obj)
  }

  deleteSection(obj: any) {
    return this.http.post(this.baseUrl + "Section/deleteSection", obj)
  }

  /* ---------------------------------------------------------------------- */

  //PupilType
  getPupilTypeList(obj: any) {
    return this.http.post(this.baseUrl + "PupilType/PupilTypeList", obj)
  }

  savePupilType(obj: any) {
    return this.http.post(this.baseUrl + "PupilType/savePupilType", obj)
  }

  deletePupilType(obj: any) {
    return this.http.post(this.baseUrl + "PupilType/deletePupilType", obj)
  }

  /* ---------------------------------------------------------------------- */

  //FeeAdmissionHead
  getFeeAdmissionHeadList(obj: any) {
    return this.http.post(this.baseUrl + "FeeAdmissionHead/FeeAdmissionHeadList", obj)
  }

  saveFeeAdmissionHead(obj: any) {
    return this.http.post(this.baseUrl + "FeeAdmissionHead/saveFeeAdmissionHead", obj)
  }

  deleteFeeAdmissionHead(obj: any) {
    return this.http.post(this.baseUrl + "FeeAdmissionHead/deleteFeeAdmissionHead", obj)
  }

  /* ---------------------------------------------------------------------- */

  //FeeAdmission
  getFeeAdmissionList(obj: any) {
    return this.http.post(this.baseUrl + "FeeAdmission/FeeAdmissionList", obj)
  }

  saveFeeAdmission(obj: any) {
    return this.http.post(this.baseUrl + "FeeAdmission/saveFeeAdmission", obj)
  }

  deleteFeeAdmission(obj: any) {
    return this.http.post(this.baseUrl + "FeeAdmission/deleteFeeAdmission", obj)
  }

  /* ---------------------------------------------------------------------- */

  //FeeRegistrationHead
  getFeeRegistrationHeadList(obj: any) {
    return this.http.post(this.baseUrl + "FeeRegistrationHead/FeeRegistrationHeadList", obj)
  }

  saveFeeRegistrationHead(obj: any) {
    return this.http.post(this.baseUrl + "FeeRegistrationHead/saveFeeRegistrationHead", obj)
  }

  deleteFeeRegistrationHead(obj: any) {
    return this.http.post(this.baseUrl + "FeeRegistrationHead/deleteFeeRegistrationHead", obj)
  }

    /* ---------------------------------------------------------------------- */

  //FeeRegistration
  getFeeRegistrationList(obj: any) {
    return this.http.post(this.baseUrl + "FeeRegistration/FeeRegistrationList", obj)
  }

  saveFeeRegistration(obj: any) {
    return this.http.post(this.baseUrl + "FeeRegistration/saveFeeRegistration", obj)
  }

  deleteFeeRegistration(obj: any) {
    return this.http.post(this.baseUrl + "FeeRegistration/deleteFeeRegistration", obj)
  }
}

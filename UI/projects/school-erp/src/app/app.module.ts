import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppService } from "./utils/app.service";
import { AppComponent } from './app.component';
import { AdminMasterComponent } from './admin/admin-master/admin-master.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { ProgressComponent } from './component/progress/progress.component';
import { DesignationComponent } from './admin/designation/designation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DepartmentComponent } from './admin/department/department.component';
import { StaffComponent } from './admin/staff/staff.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { StaffLoginComponent } from './admin/staff-login/staff-login.component';
import { SchoolComponent } from './admin/school/school.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageGroupComponent } from './admin/page-group/page-group.component';
import { PageComponent } from './admin/page/page.component';
import { MenuComponent } from './admin/menu/menu.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleMenuComponent } from './admin/role-menu/role-menu.component';
import { NgxPaginationModule } from "ngx-pagination";
import { OrderModule } from "ngx-order-pipe";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { StaffLoginRoleComponent } from './admin/staff-login-role/staff-login-role.component';
import { HeadComponent } from './admin/head/head.component';
import { SessionComponent } from './admin/session/session.component';
import { StateComponent } from './admin/state/state.component';
import { CityComponent } from './admin/city/city.component';
import { ClassComponent } from './admin/class/class.component';
import { SectionComponent } from './admin/section/section.component';
import { PupilTypeComponent } from './admin/pupil-type/pupil-type.component';
import { FeeAdmissionHeadComponent } from './admin/fee-admission-head/fee-admission-head.component';
import { FeeAdmissionComponent } from './admin/fee-admission/fee-admission.component';
import { FeeRegistrationHeadComponent } from './admin/fee-registration-head/fee-registration-head.component';
import { FeeRegistrationComponent } from './admin/fee-registration/fee-registration.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminMasterComponent,
    AdminDashboardComponent,
    PageNotFoundComponent,
    ProgressComponent,
    DesignationComponent,
    DepartmentComponent,
    StaffComponent,
    StaffLoginComponent,
    SchoolComponent,
    AdminLoginComponent,
    PageGroupComponent,
    PageComponent,
    MenuComponent,
    RoleComponent,
    RoleMenuComponent,
    StaffLoginRoleComponent,
    HeadComponent,
    SessionComponent,
    StateComponent,
    CityComponent,
    ClassComponent,
    SectionComponent,
    PupilTypeComponent,
    FeeAdmissionHeadComponent,
    FeeAdmissionComponent,
    FeeRegistrationHeadComponent,
    FeeRegistrationComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,
    OrderModule,
    Ng2SearchPipeModule,
  ],
  
  providers: [AppService, { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

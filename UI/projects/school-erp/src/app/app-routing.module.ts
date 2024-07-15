import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminMasterComponent } from './admin/admin-master/admin-master.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { PageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { DesignationComponent } from './admin/designation/designation.component';
import { DepartmentComponent } from './admin/department/department.component';
import { StaffComponent } from './admin/staff/staff.component';
import { StaffLoginComponent } from './admin/staff-login/staff-login.component';
import { SchoolComponent } from './admin/school/school.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { PageGroupComponent } from './admin/page-group/page-group.component';
import { PageComponent } from './admin/page/page.component';
import { MenuComponent } from './admin/menu/menu.component';
import { RoleComponent } from './admin/role/role.component';
import { RoleMenuComponent } from './admin/role-menu/role-menu.component';
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

const routes: Routes = [
  { path: '', redirectTo: "/admin-login", pathMatch: 'full' },
  { path: 'admin-login', component:AdminLoginComponent },
  {
    path: 'admin', component: AdminMasterComponent, children: [
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'designation', component: DesignationComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'staffLogin', component: StaffLoginComponent },
      { path: 'school', component: SchoolComponent },
      { path: 'page-group', component: PageGroupComponent },
      { path: 'page', component: PageComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'role', component: RoleComponent },
      { path: 'role-menu', component: RoleMenuComponent },
      { path: 'staff-login-role', component: StaffLoginRoleComponent },
      { path: 'head', component: HeadComponent },
      { path: 'session', component: SessionComponent },
      { path: 'state', component: StateComponent },
      { path: 'city', component: CityComponent },
      { path: 'class', component: ClassComponent },
      { path: 'section', component: SectionComponent },
      { path: 'pupil-type', component: PupilTypeComponent },
      { path: 'fee-admission-head', component: FeeAdmissionHeadComponent },
      { path: 'fee-admission', component: FeeAdmissionComponent },
      { path: 'fee-registration-head', component: FeeRegistrationHeadComponent },
      { path: 'fee-registration', component: FeeRegistrationComponent },

    ]
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

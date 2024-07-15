import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../utils/app.service';
import { ConstantData } from '../../utils/constant-data';
import { LocalService } from '../../utils/local.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  dataLoading: boolean;
  submitted: boolean;
  Staff: any = {};
  constructor(
    private toastr: ToastrService,
    private service: AppService,
    private localService: LocalService,
    private router: Router) { }

  ngOnInit(): void {

  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.Staff = {};
    this.submitted = false;
  }

  staffLogin(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      this.toastr.error("Fill all the Required Fields.", "Invailid Form")
      this.dataLoading = false;
      return;
    }

    this.dataLoading = true;
    this.service.StaffLogin(this.Staff).subscribe(r1 => {
      let response = r1 as any;
      if (response.Message == ConstantData.SuccessMessage) {
        this.toastr.success("Login Successful.")
        this.submitted = false;
        this.localService.setEmployeeDetail(response.UserDetail)
        this.router.navigate(['/admin/admin-dashboard']);
      } else {
        this.toastr.error(response.Message);
        this.dataLoading = false;
      }
    }, (err => {
      this.toastr.error("Error Occured while fetching data.");
      this.dataLoading = false;
    }));
  }
}

import { Component, Injectable, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDto } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,FormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
@Injectable({providedIn: 'root'})
export class RegisterComponent {

  phone: String;
  password: String;
  retypePassword: String;
  fullName:String;
  address:String;
  isAccepted: Boolean = false;
  dateOfBirth: Date;

  focusState: {[key:string ]:Boolean}={};
  constructor( private router: Router, private userService:UserService)  {
    
    this.phone = "";
    this.password = "";
    this.retypePassword = "";
    this.fullName="";
    this.address="";
    this.dateOfBirth=new Date();
  }

  onPhoneChange() {
    console.log(this.phone.length)
}

register() {
  this.setFocus("register");
  if(this.phone==""||this.password==""||this.retypePassword==""||this.fullName==""||this.address=="") {
    alert("Hãy điền đủ thông tin");;
    return;
  }
  if(this.phone.length!=10) {
    alert("Số điện thoại không hợp lệ");
    return;
  }
  if(this.retypePassword!=this.password) {
    alert("Mật khẩu không khớp");
    return;
  }
  if(this.isNotValidBirth(this.dateOfBirth)) {
    alert("Bạn chưa đủ 18 tuổi!");
    return;
  }
  if(this.isAccepted==false) {
    return;
  }
  const registerDto:RegisterDto={
    "phoneNumber":this.phone,
    "password":this.password,
    "retypePassword":this.retypePassword,
    "fullName":this.fullName,
    "address":this.address,
    "dateOfBirth":this.dateOfBirth,
    "facebookAccountId":0,
    "googleAccountId":0,
    "roleId":1

  }
  this.userService.register(registerDto).subscribe({
    next: (response:any) => {
        if(response.status.id!=null) {
        this.router.navigate(['/login']);
      }
    },
    error: (error) => {
      alert(error.error)
      console.log(error);
    },
    complete: () => {
    }

  })
}
setFocus(key:string) {
  this.focusState[key] = true;
}
getFocus(key:string) {
  return this.focusState[key];  
}
isNotValidBirth(dateOfBirth:Date) {
  const today = new Date();
  const birthday = new Date(dateOfBirth);
  var age = today.getFullYear() - birthday.getFullYear();
  if (today.getMonth() < birthday.getMonth()) {
    age--;
  }
  return age<18;
}
}
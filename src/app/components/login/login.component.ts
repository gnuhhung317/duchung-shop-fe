import { Component, Inject, Injectable } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { LoginDto } from '../../dtos/user/login.dto';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginResponse } from '../../responses/login.response';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FooterComponent, HeaderComponent,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
@Injectable({providedIn: 'root'})
export class LoginComponent {
phone: String;
password: String;
selectedRole: number;

  constructor(private http:HttpClient,
    private userService:UserService,
    private authService: AuthService) {
    
  
    this.password = "";
    this.phone="";
    this.selectedRole = 1; // hoặc 'admin', tùy theo yêu cầu của bạn

  }


  onRoleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRole = Number.parseInt(selectElement.value);
    console.log('Role changed to:', this.selectedRole);
  }

  login(){
    if(this.phone==""||this.password==""){
      // alert("Tên đăng nhập hoặc mật khẩu sai");
      return;
    }
    const loginDto: LoginDto={
      "phoneNumber":this.phone,
      "password":this.password,
      "roleId":this.selectedRole
    }
    this.userService.login(loginDto).subscribe({
      next:(response:LoginResponse)=>{
        if(response.token!=null) {
          console.log(response)
          this.authService.setToken(response.token)
          // this.userService.setToken(response.status.token)
          // this.userService.setUserId(response.status.id)
          // this.userService.setUserName(response.status.fullName)
          }
      },
      error(err) {
        console.log(err)
          // alert(err.error)
      },
      complete: () => {

      }
    })
  }
}


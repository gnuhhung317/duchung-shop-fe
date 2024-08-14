import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/components/home/home.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
import { OrderComponent } from './app/components/order/order.component';
import { OrderConfirmComponent } from './app/components/order-confirm/order-confirm.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { FormsModule } from '@angular/forms';
bootstrapApplication(LoginComponent, appConfig)
  .catch((err) => console.error(err));

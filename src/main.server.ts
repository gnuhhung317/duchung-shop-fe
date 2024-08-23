import { bootstrapApplication } from '@angular/platform-browser';
import { HomeComponent } from './app/components/home/home.component';
import { config } from './app/app.config.server';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
import { OrderComponent } from './app/components/order/order.component';
import { OrderConfirmComponent } from './app/components/order-confirm/order-confirm.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { FormsModule } from '@angular/forms';
import 'localstorage-polyfill'

global['localStorage'] = localStorage
const bootstrap = () => bootstrapApplication(OrderConfirmComponent, config);

export default bootstrap;

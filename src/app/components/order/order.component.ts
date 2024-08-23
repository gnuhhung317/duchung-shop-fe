import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { environment } from '../../env/environment';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
  cart:Map<number,number>;
  productList: Map<number, Product>;
  constructor( private cartService: CartService,  private productService: ProductService) {
    this.cart = new Map<number, number>();
    this.productList= new Map<number, Product>();
  }
  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    if(this.cart.size > 0){this.getProductsByIds()}
  }
  getCartItems(): [number, number][] {
    if (this.cart === undefined) {
      return []
    }
    return Array.from(this.cart.entries()); 
  }

  getProductsByIds() {
    let ids = Array.from(this.cart?.keys() || []).map(id => id);
     this.productService.getProductsByIds(ids).subscribe({
       next: (response) => {
         this.productList = new Map<number, Product>();
         response.forEach((product: Product) => {
           this.productList.set(product.id, product);
         })
       },
       complete: () => {
        this.generateLink();

       },
       error: (error) => {
         console.log(error)
       }
     })
  }
  generateLink() {
    if(this.productList !== undefined) 
    this.productList.forEach((product, id) => {
      if (!product.thumbnail.startsWith(environment.apiUrl)) {
        product.thumbnail = `${environment.apiUrl}/products/images/${product.thumbnail}`;
      }
    });
  }
  
  getTotal(id: number): number {
    const product = this.productList.get(id);
    const quantity = this.cart.get(id) || 0;
    const total = (product?.price || 0) * quantity;
    return Math.round(total * 100) / 100;
  }
  
  getTotalBill(){
    let total = 0;
    this.productList.forEach((product, id) => {
      total += this.getTotal(id);
    });
    return Math.round(total * 100) / 100;
  }
}

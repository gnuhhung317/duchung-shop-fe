import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { response, Router } from 'express';
import { ActivatedRoute } from '@angular/router';
import { debug, error } from 'console';
import { environment } from '../../env/environment';
import { CommonModule } from '@angular/common';
import { min } from 'class-validator';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent,CommonModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit{
  
  product?: Product ;
  images: String[]=[];
  productId : number=7;
  currentImageIndex: number=0;

  quantity: number = 1;
  readonly maxQuantity: number = 20;

  constructor (private productService:ProductService,
    private categoryService: CategoryService,
    private cartService: CartService,
    // private router:Router,
    // private activeRoute: ActivatedRoute
  ){
  
  }
  ngOnInit(): void {

    this.productService.getProduct(this.productId).subscribe({
      next:  (response:any) =>{
        this.product=response
      },complete: ()=>{
        this.getProductImages(this.productId)

        if(this.images&&this.images.length>0){
          this.generateImageLink(this.images);

        }
        console.log(this.images)
        this.showImage(0);
      }
      ,error: (error) =>{
        console.log(error)
      }
    })
  }

  getProductImages(id: number){
    this.productService.getProductImages(id).subscribe({
      next: (response:any) =>{
        this.images = response.map((image: any) => {
          return image.imageUrl;
        });
      }
    })

  }
  onThumbnailClick(index: number){
    this.currentImageIndex=index
  }
  generateImageLink(images: String[]): void {
    
    this.images = images.map(image => {
      if (!image.startsWith(environment.apiUrl)) {
        return `${environment.apiUrl}/products/images/${image}`;
      }
      return image;
    });
  }
  showImage(index: number) {
    if(this.product && this.images&& this.images.length>0){{
      index=Math.max(0,index);
      index=Math.min(this.images.length-1,index);
    }}
    this.currentImageIndex=index
  }
  nextImage(){
    this.showImage((this.currentImageIndex+1)%this.images.length);
  }
  previousImage(){
    this.showImage((this.currentImageIndex-1+this.images.length)%this.images.length);
  }
  increaseQuantity(){
    this.quantity=Math.min(++this.quantity, this.maxQuantity);
  }
  decreaseQuantity(){
    if(this.quantity>1){
      this.quantity--;
    }
  }
  addToCart(){
    this.cartService.addToCart(this.productId,this.quantity);
  }
}

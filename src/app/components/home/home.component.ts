import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { environment } from '../../env/environment';
import { ProductItemComponent } from "../product-item/product-item.component";
import { CommonModule } from '@angular/common';
import { KeyedRead } from '@angular/compiler';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, ProductItemComponent,CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products:Product[]=[]
  categories:any[]=[]
  currentPage:number=1
  itemsPerPage:number=12
  categoryId:number=-1;
  keyword:string='';
  pages:number=1;
  visibalePages:number[]=[]
 

  constructor(private productService: ProductService, private categoryService: CategoryService) { 
  }
  ngOnInit(): void {
    this.getProducts()
    this.getCategories()

  }
  generateThumbnailLink(products: Product[]): void {
    products.forEach((product: Product) => {
      if (!product.thumbnail.startsWith(environment.apiUrl)) {
        product.thumbnail = `${environment.apiUrl}/products/images/${product.thumbnail}`;
      }
    });

  }
  getProducts(){
    this.productService.getProducts(this.currentPage-1,this.itemsPerPage,this.categoryId,this.keyword).subscribe({
      next:(response:any)=>{

        this.products=response.products
        this.pages=response.totalPage
        this.generateVisibalePages()
        this.generateThumbnailLink(this.products)

      },
      complete: () => { 
        
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  getCategories(){
    this.categoryService.getCategories().subscribe({
      next:(response:any)=>{
        
        this.categories=response
      },
      complete: () => {
        
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
  generateVisibalePages(){
    this.visibalePages=[]
    console.log(this.pages)
    console.log(this.products)
    for(let i=Math.max(1,this.currentPage-3);i<=Math.min(this.currentPage+3,this.pages );i++){
      this.visibalePages.push(i)
    }

  }
  onPageChange(page:number){
    this.currentPage=page
    this.getProducts()
    // this.generateVisibalePages()
    // this.generateThumbnailLink(this.products)

  }
  onCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; 
    this.categoryId = Number.parseInt(selectElement.value);
    this.getProducts()
  }
  onImageError(event: Event) {
    const target = event.target as HTMLImageElement; 
    target.src = this.productService.getErrorImage();
  }
}

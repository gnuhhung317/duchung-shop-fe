import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() product!: Product; // Using the Product interface
  warranty: string = '12 tháng';
  // Generate array for star ratings
  constructor(private productService: ProductService) { }
  get fullStars() {
    return Array(Math.floor(4.5)).fill(0);
  }

  get halfStar() {
    return 4.5 % 1 !== 0;
  }
  onImageError(event: Event) {
    // const target = event.target as HTMLImageElement; 
    // target.src = this.productService.getErrorImage();
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  productsArray: Array<any>;
  @ViewChild('image') image: ElementRef;
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((cs) => {
      this.productsArray = cs.map((x) => {
        return {
          id: x.payload.doc.id,
          ...(x.payload.doc.data() as {}),
        };
      });
      console.log(this.productsArray);
    });
  }

  addNewProduct(f: NgForm) {
    let name = f.value.name,
      price = f.value.price,
      image = (this.image.nativeElement as HTMLInputElement).files[0];
    this.productService.addProduct(name, price, image);

    //console.log(f.value);
    //console.log((this.image.nativeElement as HTMLInputElement).files[0]);
  }

  updateProductPrice(index) {
    this.productService.updateProduct(
      this.productsArray[index].id,
      this.productsArray[index].price
    );
  }

  deleteProduct(index) {
    this.productService.deleteProducts(this.productsArray[index].id);
  }
}

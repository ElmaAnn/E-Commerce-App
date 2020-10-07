import { Component, OnInit } from '@angular/core';
import { Product } from './../../Interface/products.interface';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  add: number = -1;
  products: Array<any> = [
    // {
    //   name: 'Banana',
    //   price: 3,
    //   desc: 'Fruit',
    //   productPath: '../assets/pics/banana.jpeg',
    // },
    // {
    //   name: 'Kiwi',
    //   price: 13,
    //   desc: 'Fruit',
    //   productPath: '../assets/pics/kiwi.jpeg',
    // },
    // {
    //   name: 'Orange',
    //   price: 6,
    //   desc: 'Fruit',
    //   productPath: '../assets/pics/orange.jpeg',
    // },
    // {
    //   name: 'Strawberry',
    //   price: 10,
    //   desc: 'Fruit',
    //   productPath: '../assets/pics/strawberry.jpeg',
    // },
  ];

  constructor(
    private productService: ProductsService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productService
      .getAllProducts()
      .subscribe((data) => (this.products = data));
  }

  addToCart(index) {
    if (this.authService.user) this.add = +index;
    else this.router.navigate(['/login']);
    //console.log('added to cart..', this.products[index]);
  }

  buy(amount) {
    let selectedProduct = this.products[this.add];
    let data = {
      name: selectedProduct.name,
      price: selectedProduct.price,
      amount: +amount,
    };
    //console.log(data);
    this.cartService
      .addToCart(data)
      .then(() => (this.add = -1))
      .catch((err) => console.log(err));
  }
}

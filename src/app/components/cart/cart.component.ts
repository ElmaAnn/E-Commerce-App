import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shoppingCart: Array<any>;
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe((cs) => {
      this.shoppingCart = cs.map((x) => {
        return {
          id: x.payload.doc.id,
          ...(x.payload.doc.data() as {}),
        };
      });
      console.log(this.shoppingCart);
    });
  }

  deleteCart(index) {
    this.cartService.deleteProductFromCart(this.shoppingCart[index].id);
  }

  updateCart(index) {
    this.cartService.updateProductFromCart(
      this.shoppingCart[index].id,
      this.shoppingCart[index].amount
    );
  }
}

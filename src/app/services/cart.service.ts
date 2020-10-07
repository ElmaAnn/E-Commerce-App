import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private fs: AngularFirestore, private authService: AuthService) {}

  addToCart(product) {
    return this.fs
      .collection(`users/${this.authService.userId}/cart`)
      .add(product);
  }

  getCart() {
    return this.fs
      .collection(`users/${this.authService.userId}/cart`)
      .snapshotChanges();
  }

  deleteProductFromCart(id) {
    this.fs.doc(`users/${this.authService.userId}/cart/${id}`).delete();
  }

  updateProductFromCart(id, amount) {
    this.fs
      .doc(`users/${this.authService.userId}/cart/${id}`)
      .update({ amount });
  }
}

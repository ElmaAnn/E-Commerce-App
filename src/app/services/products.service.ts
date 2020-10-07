import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(
    private fireStore: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getAllProducts() {
    return this.fireStore.collection('Products').valueChanges();
  }

  addProduct(name: string, price: number, image: File) {
    let ref = this.storage.ref('Product_Images/' + image.name);
    ref.put(image).then(() => {
      ref.getDownloadURL().subscribe((productPath) => {
        this.fireStore.collection('Products').add({
          name,
          price,
          productPath,
        });
      });
    });
  }

  getProducts() {
    return this.fireStore.collection('Products').snapshotChanges();
  }
  updateProduct(id, price) {
    return this.fireStore.doc(`Products/${id}`).update({ price });
  }

  deleteProducts(id) {
    return this.fireStore.doc(`Products/${id}`).delete();
  }
}

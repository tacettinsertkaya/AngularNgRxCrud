import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { add } from './states/products/action/product.action';
import { AppState } from './states/products/product.state';
import { Observable } from 'rxjs';
import { selectProducts } from './states/products/selector/product.selector';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  products: Observable<Array<Product>> = this.store.pipe(select(selectProducts))

  title = 'angular-ngrx-sample';

  constructor(private store: Store<AppState>) {

  }

  addProduct() {
    let product: Product = {
      id: 1,
      name: 'Product 1',
      description: 'This is product 1',
      price: 100
    }

    this.store.dispatch(add({ product }));
  }


}

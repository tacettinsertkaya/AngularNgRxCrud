import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/states/products/product.state';
import { selectProducts } from 'src/app/states/products/selector/product.selector';
import { actions } from './table.action.configuration';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AddProductComponent } from '../add-product/add-product.component';
import { remove } from 'src/app/states/products/action/product.action';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    AddProductComponent,
    SplitButtonModule
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  id: number = 0;
  actions = actions
  products$: Observable<Array<Product>> = this.store.pipe(select(selectProducts))
  constructor(private store: Store<AppState>) {

  }

  editProduct(id: number) {
    console.log(id);
    this.id = id;
  }


  deleteProduct(product: Product) {
    console.log(product.id);
    this.store.dispatch(remove({ product: product }))
  }

}

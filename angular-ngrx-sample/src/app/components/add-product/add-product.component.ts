import { Component, Input, numberAttribute } from '@angular/core';
import { FieldsetModule } from 'primeng/fieldset';
import { EditorModule } from 'primeng/editor';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Product } from 'src/app/models/product';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/states/products/product.state';
import { add, update } from 'src/app/states/products/action/product.action';
import { selectProductById } from 'src/app/states/products/selector/product.selector';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FieldsetModule,
    EditorModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  private _id: number = 0;

  @Input({ transform: numberAttribute })
  set id(value: number) {
    this._id = value;
    if (value > 0) {
      console.log(this.store.pipe(select(selectProductById, { productId: value })))
      this.store.pipe(select(selectProductById, { productId: value })).subscribe((product) => {
        if (product == null) return;
        this.productForm.patchValue(product);
      })
    }
  }


  submitted: boolean = false;
  productForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {
    this.createForm();
  }


  createForm() {
    this.productForm = this.fb.group({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    })
  }

  saveProduct() {
    this.submitted = true;
    if (this.productForm.invalid) return;
    console.log(this.productForm.value);
    const product = this.productForm.value as Product;

    product.id = this._id ?? Math.floor(Math.random() * 100);
    if (this._id) {
      this.store.dispatch(update({ product }));
    }
    else {
      product.id = Math.floor(Math.random() * 100);
      this.store.dispatch(add({ product }));
    }

    this.clearForm()

  }

  get f() { return this.productForm.controls; }
  clearForm = () => {
    this.productForm.reset();
    this._id = 0;
  }
}

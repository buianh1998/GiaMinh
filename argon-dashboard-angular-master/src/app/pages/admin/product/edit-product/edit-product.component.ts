import { Component, OnInit, Input } from "@angular/core";
import { productService } from "../../../../services/product.service";
import { Product } from "./../../../../models/product.model";
import { categoryService } from "../../../../services/category.service";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from "@angular/forms";
@Component({
  selector: "app-edit-product",
  templateUrl: "./edit-product.component.html",
  styleUrls: ["./edit-product.component.css"],
})
export class EditProductComponent implements OnInit {
  formEditProduct: FormGroup;
  @Input() editProduct;
  Category: categoryService;
  File: File;
  constructor(
    private productService: productService,
    private categoryService: categoryService,
    private FormBuilder: FormBuilder
  ) {
    // this.creatForm();
  }

  ngOnInit(): void {}
  // creatForm() {
  //   this.formEditProduct = this.FormBuilder.group({
  //     Title: [
  //       this.editProduct.Title,
  //       [Validators.required, Validators.minLength(6)],
  //     ],
  //     Price: [
  //       this.editProduct.Price,
  //       [Validators.required, Validators.minLength(6)],
  //     ],
  //     Description: [
  //       this.editProduct.Description,
  //       [
  //         Validators.required,
  //         Validators.minLength(10),
  //         Validators.maxLength(400),
  //       ],
  //     ],
  //     Amount: [
  //       this.editProduct.Title,
  //       [Validators.required, Validators.minLength(1), Validators.maxLength(3)],
  //     ],
  //     idCate: "",
  //   });
  // }
  // getListCategory() {
  //   this.categoryService.getCategoryData().subscribe((data: any) => {
  //     console.log(data);

  //     this.Category = data.dataCate;
  //   });
  // }
  // selectImage(event) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.File = file;
  //   }
  // }
  // editDataProduct() {
  //   console.log("Hello");

  //   this.productService
  //     .editProductData(
  //       this.editProduct._id,
  //       (this.editProduct.Title = this.formEditProduct.value.Title),
  //       (this.editProduct.Price = this.formEditProduct.value.Price),
  //       (this.editProduct.Description = this.formEditProduct.value.Description),
  //       (this.editProduct.Amount = this.formEditProduct.value.Amount),
  //       (this.editProduct.Image = this.File),
  //       (this.editProduct.idCate = this.formEditProduct.value.idCate)
  //     )
  //     .subscribe((data) => {
  //       console.log(data);
  //     });
  // }
}

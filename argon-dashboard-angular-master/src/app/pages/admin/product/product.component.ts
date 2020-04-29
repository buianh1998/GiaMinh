import { Component, OnInit } from "@angular/core";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { productService } from "../../../services/product.service";
import { Product } from "./../../../models/product.model";
import { categoryService } from "./../../../services/category.service";
import { Category } from "./../../../models/category.model";
import { HttpClient } from "@angular/common/http";
// form group chứa  nhiều form control, form cantrol sẽ điều khiển 1 cái trường input của mình và no se validate của mình qua form control
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validator,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  constructor(
    private ProductService: productService,
    private categoryService: categoryService,
    private FormBuilder: FormBuilder //FormBuilder tạo ra formcontrol để chúng ta validates
  ) {
    this.createForm();
  }
  Product: Product[] = [];
  Category: Category[] = [];
  newProduct: Product = new Product();
  Image: File;
  productFormGroup: FormGroup;

  getListProduct() {
    this.ProductService.getDataProduct().subscribe((data: any) => {
      console.log(data);
      this.Product = data.dataProduct;
    });
  }
  getListCategory() {
    this.categoryService.getCategoryData().subscribe((data: any) => {
      console.log(data);

      this.Category = data.dataCate;
    });
  }
  deleteIdProduct(id) {
    this.ProductService.deleteProductIdData(id).subscribe(() => {
      this.Product = this.Product.filter(
        dataProductnotDelete => dataProductnotDelete._id !== id
      );
    });
  }
  ngOnInit(): void {
    this.getListProduct();
    this.getListCategory();
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.Image = file;
    }
  }
  // đối tượng kiểu form group, form group chứa nhiều form control
  createForm() {
    // khởi tạo formgroup thông qua formbuilder thông qua hàm group sẽ tạo ra các formcontrol
    this.productFormGroup = this.FormBuilder.group({
      Title: ["", [Validators.required, Validators.minLength(6)]],
      Price: ["", [Validators.required, Validators.minLength(6)]],
      Description: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(400)
        ]
      ],
      Amount: [
        "",
        [Validators.required, Validators.minLength(1), Validators.maxLength(3)]
      ],
      idCate: this.Category[0]
    });
  }
  dataIdProduct: Product;
  showEditFormPd(product: Product): void {
    this.dataIdProduct = product;
    console.log(product);
  }
  addDataProduct(f) {
    this.ProductService.addProductData(
      (this.newProduct.Title = this.productFormGroup.value.Title),
      (this.newProduct.Price = this.productFormGroup.value.Price),
      (this.newProduct.Description = this.productFormGroup.value.Description),
      (this.newProduct.Amount = this.productFormGroup.value.Amount),
      (this.newProduct.Image = this.Image),
      (this.newProduct.idCate = this.productFormGroup.value.idCate)
    ).subscribe(data => {
      console.log(data);
      this.Product.push(data.dataNewProduct);
    });
  }
}

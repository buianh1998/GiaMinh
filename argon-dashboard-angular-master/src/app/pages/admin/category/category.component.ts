import { Component, OnInit, Input } from "@angular/core";
import { Category } from "../../../models/category.model";
import { categoryService } from "../../../services/category.service";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  Category: Category[] = [];
  constructor(private cateogry: categoryService, private router: Router) {}
  getCateData() {
    this.cateogry.getCategoryData().subscribe((data: any) => {
      this.Category = data.dataCate;
    });
  }
  ngOnInit(): void {
    this.getCateData();
  }
  newDataCate(f) {
    const newCate: Category = new Category();

    console.log(f);
    this.cateogry
      .addCategotyData((newCate.Title = f.value.Title))
      .subscribe((data: any) => {
        console.log(data);
        this.Category.push(data.result);
      });
  }
  DeleteDataCate(id) {
    this.cateogry.deleteCategory(id).subscribe(_ => {
      this.Category = this.Category.filter(
        dataDeleCate => dataDeleCate._id !== id
      );
    });
  }
  Datacate: Category;

  showEditForm(data: Category): void {
    this.Datacate = data;
    console.log(this.Datacate);
  }
}

import { FileItem } from "ng2-file-upload";

export class Product {
  _id: String;
  Title: String;
  Price: Number;
  Description: String;
  Amount: Number;
  Image: String | any;
  DayAdded: Date;
  idCate: String;
}

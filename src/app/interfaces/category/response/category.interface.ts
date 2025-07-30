import { ICategory } from "../category.interface";

export interface CategoryResponse {
  categories: ICategory[];
  totalCategories: number;
  currentPage: number;
}

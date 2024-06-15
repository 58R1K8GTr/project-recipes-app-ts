import { ReactNode } from 'react';

export type MealRecipeType = {
  dateModified: string;
  idMeal: string;
  idDrink: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string;
  strDrinkAlternate: string;
  strImageSource: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strMeal: string;
  strDrink: string;
  strMealThumb: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strTags: string;
  strYoutube: string;
};

export type DrinkRecipeType = {
  dateModified: string;
  idDrink: string;
  strAlcoholic: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string;
  strDrink: string;
  strDrinkAlternate: string;
  strDrinkThumb: string;
  strGlass: string;
  strIBA: string;
  strImageAttribution: string;
  strImageSource: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strInstructions: string;
  strInstructionsDE: string;
  strInstructionsES: string;
  strInstructionsFR: string;
  strInstructionsIT: string;
  strInstructionsZH_HANS: string;
  strInstructionsZH_HANT: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strTags: string;
  strVideo: string;
};

export type CategoryType = {
  strCategory: string;
};

export type Recipe = {
  idMeal?: string;
  strMeal?: string;
  strMealThumb?: string;
  idDrink?: string;
  strDrink?: string;
  strDrinkThumb?: string;
  strCategory?: string;
  strAlcoholic?: string;
  strInstructions?: string;
  strYoutube?: string;
  [key: string]: any;
};

export type RecommendationType = {
  strMeal?: string;
  strDrink?: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
};

export type RecommendationProps = {
  item: RecommendationType;
  index: number;
};
export type DoneRecipeType = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string;
};

export type UrlsType = {
  ingredient: string;
  name: string;
  firstletter: string;
};

export type ChildrenProp = {
  children: ReactNode;
};

export type DataContextType = {
  meals: MealRecipeType[];
  setMeals(dataMeals: MealRecipeType[]): void;
  drinks: DrinkRecipeType[];
  setDrinks(dataDrinks: DrinkRecipeType[]): void;
  categories: CategoryType[];
  setCategories(categories: CategoryType[]): void;
};

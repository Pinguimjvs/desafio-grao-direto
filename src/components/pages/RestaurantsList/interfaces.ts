export interface IRestaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: string;
  deliveryTime: string;
  price: string;
  address: string;
  image: string;
  dishes: IDishes[];
  drinks: IDrinks[];
}

interface IDishes {
  name: string;
  image: string;
  description: string;
  price: string;
}

interface IDrinks {
  name: string;
  image: string;
  price: string;
}

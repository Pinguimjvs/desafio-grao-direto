import { useRouter } from "next/router";
import styles from "./RestaurantDetails.module.css";
import Header from "@/components/structure/Header";

// Mock de dados dos restaurantes
const mockRestaurants = [
  {
    id: 1,
    name: "Restaurante sem futuro",
    cuisine: "Comida brasileira",
    rating: "+45",
    deliveryTime: "30-40 min",
    price: "R$ 154,99",
    address: "Av Leopoldinho de Oliveira",
    image: "/restaurant1.jpeg",
    dishes: [
      {
        name: "Strogonoff",
        description: "Carne, arroz, batata frita",
        price: "R$ 21,21",
      },
      {
        name: "Bife à Cavalo",
        description: "Bife, ovo, arroz",
        price: "R$ 25,00",
      },
    ],
    drinks: [
      { name: "Água", price: "R$ 5,00" },
      { name: "Refrigerante", price: "R$ 7,00" },
    ],
  },
  {
    id: 2,
    name: "Ipanema Restaurant",
    cuisine: "Comida internacional",
    rating: "+40",
    deliveryTime: "20-30 min",
    price: "R$ 120,00",
    address: "Av Paulista",
    image: "/images/restaurant2.jpg",
    dishes: [
      {
        name: "Pizza Margherita",
        description: "Molho de tomate, mussarela, manjericão",
        price: "R$ 30,00",
      },
      {
        name: "Lasanha",
        description: "Carne, molho branco, queijo",
        price: "R$ 35,00",
      },
    ],
    drinks: [
      { name: "Suco de Laranja", price: "R$ 8,00" },
      { name: "Cerveja", price: "R$ 10,00" },
    ],
  },
  // Adicione mais restaurantes conforme necessário
];

const RestaurantDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const restaurant = mockRestaurants.find((r) => r.id === Number(id));

  if (!restaurant) {
    return <div>Restaurante não encontrado</div>;
  }

  return (
    <div className={styles.container}>
      <Header userName="Fred" address="Av Leopoldinho de Oliveira" />

      {/* Título com o nome e endereço do restaurante escolhido */}
      <div className={styles.restaurantHeader}>
        <h1 className={styles.restaurantTitle}>{restaurant.name}</h1>
        <p className={styles.restaurantAddress}>{restaurant.address}</p>
      </div>

      {/* Imagem do restaurante */}
      <div className={styles.imageContainer}>
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className={styles.image}
        />
      </div>

      {/* Listagem de pratos */}
      <div className={styles.section}>
        <h2>Pratos</h2>
        {restaurant.dishes.map((dish, index) => (
          <div key={index} className={styles.item}>
            <p className={styles.itemName}>{dish.name}</p>
            <p className={styles.itemDescription}>{dish.description}</p>
            <p className={styles.itemPrice}>{dish.price}</p>
          </div>
        ))}
      </div>

      {/* Listagem de bebidas */}
      <div className={styles.section}>
        <h2>Bebidas</h2>
        {restaurant.drinks.map((drink, index) => (
          <div key={index} className={styles.item}>
            <p className={styles.itemName}>{drink.name}</p>
            <p className={styles.itemPrice}>{drink.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetails;

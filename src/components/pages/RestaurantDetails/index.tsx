import { useRouter } from "next/router";
import styles from "./RestaurantDetails.module.css";
import Header from "@/components/structure/Header";
import { useEffect, useState } from "react";
import { IRestaurant } from "../RestaurantsList/interfaces";
import { getRestaurantById } from "@/services/restaurants";
import Image from "next/image";

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

  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      if (id) {
        try {
          const response = await getRestaurantById(id as string);
          setRestaurant(response.data);
        } catch (error) {
          setError("Erro ao carregar restaurante");
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!restaurant) {
    return <p>Restaurante não encontrado</p>;
  }

  return (
    <div className={styles.container}>
      <Header userName="Fred" address="Av Leopoldinho de Oliveira" />

      <div className={styles.card}>
        <div className={styles.restaurantHeader}>
          <h1 className={styles.restaurantTitle}>{restaurant.name}</h1>
          <p className={styles.restaurantAddress}>{restaurant.address}</p>
        </div>

        <div className={styles.imageContainer}>
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className={styles.image}
          />
        </div>

        <div className={styles.section}>
          <h2>Pratos</h2>
          {restaurant.dishes.map((dish, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemImage}>
                <Image
                  src="/dishes/dishes1.jpg"
                  alt={dish.name}
                  fill
                  quality={100}
                />
              </div>

              <div className={styles.column}>
                <p className={styles.itemName}>{dish.name}</p>
                <p className={styles.itemDescription}>{dish.description}</p>
                <p className={styles.itemPrice}>{dish.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.section}>
          <h2>Bebidas</h2>
          {restaurant.drinks.map((drink, index) => (
            <div key={index} className={styles.item}>
              <div className={styles.itemImage}>
                <Image
                  src="/drinks/drinks1.webp"
                  alt={drink.name}
                  fill
                  quality={100}
                />
              </div>

              <div className={styles.column}>
                <p className={styles.itemName}>{drink.name}</p>
                <p className={styles.itemPrice}>{drink.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;

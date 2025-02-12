import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./RestaurantList.module.css";
import Header from "@/components/structure/Header";
import { getRestaurants } from "@/services/restaurants";
import { IRestaurant } from "./interfaces";

const RestaurantList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await getRestaurants(searchTerm);
        setRestaurants(response.data);
      } catch (error) {
        setError("Erro ao carregar restaurantes");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const filteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setRestaurants(filteredRestaurants);
  };

  const handleRestaurantClick = (id: string) => {
    router.push(`/restaurant/${id}`);
  };

  const renderRestaurants = () => {
    if (loading) {
      return <p>Carregando...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (restaurants) {
      return restaurants.map((restaurant) => (
        <div
          key={restaurant.id}
          className={styles.restaurantCard}
          onClick={() => handleRestaurantClick(restaurant.id)}
        >
          <div className={styles.restaurantImage}>
            <Image
              src={restaurant.image}
              alt={restaurant.name}
              fill
              quality={100}
            />
          </div>
          <div className={styles.restaurantInfo}>
            <p className={styles.restaurantName}>{restaurant.name}</p>
            <p className={styles.cuisine}>{restaurant.cuisine}</p>
            <div className={styles.details}>
              <p className={styles.rating}>{restaurant.rating}</p>
              <p className={styles.deliveryTime}>{restaurant.deliveryTime}</p>
              <p className={styles.price}>{restaurant.price}</p>
            </div>
          </div>
        </div>
      ));
    }
  };

  return (
    <div className={styles.container}>
      <Header userName="Fred" address="Av Leopoldinho de Oliveira" />

      <div className={styles.card}>
        <input
          type="text"
          placeholder="Pesquisar restaurantes..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
        <div className={styles.restaurantsGrid}>{renderRestaurants()}</div>
      </div>
    </div>
  );
};

export default RestaurantList;

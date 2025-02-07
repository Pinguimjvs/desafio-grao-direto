import api from "./api";

export const getRestaurants = async (q?: string) => {
  try {
    const response = await api.get(`/restaurants?q=${q}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error);
    throw error;
  }
};

export const getRestaurantById = async (id: string) => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar restaurante:", error);
    throw error;
  }
};

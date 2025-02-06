import api from "./api";

// Função para buscar todos os restaurantes
export const getRestaurants = async (q?: string) => {
  try {
    const response = await api.get(`/restaurants?q=${q}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar restaurantes:", error);
    throw error;
  }
};

// Função para buscar um restaurante pelo ID
export const getRestaurantById = async (id: string) => {
  try {
    const response = await api.get(`/restaurants/${id}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar restaurante:", error);
    throw error;
  }
};

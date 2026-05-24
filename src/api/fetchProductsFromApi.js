// src/api/fetchProductsFromApi.js
import axios from 'axios'; // 👈 سيب السطر ده بس وامسح السطر التاني الزيادة

// 1. إنشاء الـ Instance المركزية
const apiInstance = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// 2. الفانكشن الفعلية اللي الـ Context مستنيها
export const fetchProductsFromApi = async () => {
  try {
    const response = await apiInstance.get('/products?limit=100');
    return response.data.products; 
  } catch (error) {
    console.error("Error inside API axios call:", error);
    throw error;
  }
};
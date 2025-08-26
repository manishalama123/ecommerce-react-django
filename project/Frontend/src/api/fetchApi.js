import { baseRequest } from "../utils/baseRequest";
import { useQuery } from "@tanstack/react-query";

export const useCategories = ()=>{
    return(
        useQuery({
            queryKey:['categories'],
            queryFn: async ()=>{
                const response = await baseRequest.get('/categories/')
                return response.data
            }
        })
    )
}

// fetching products
export const useProducts = (selectedCategory)=>{
    return(
        useQuery({
            queryKey: ['products', selectedCategory],
            queryFn: async()=>{
                const response = await baseRequest.get('/products/',{
                    params:{
                        category__name : selectedCategory || ""

                    }
                })
                return response.data
            }
        })
    )
}

// Add a new hook to fetch the user's cart
export const useCart = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const response = await baseRequest.get('/cart/');
            return response.data;
        }
    });
};
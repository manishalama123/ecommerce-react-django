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

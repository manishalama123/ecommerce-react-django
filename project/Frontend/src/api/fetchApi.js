import { baseRequest } from "../utils/baseRequest";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

// fetching cart 
export const useCart = ()=>{
    return(
        useQuery({
            queryKey:['cart'],
            queryFn: async()=>{
                const response = await baseRequest.get('/cart/')
                return response.data
            },
            enabled: !!localStorage.getItem('authToken') // only fetch if logged in
        })
    )
}

// add item to cart
export const useAddToCart = ()=> {
    const queryClient = useQueryClient();
    return (
        useMutation({
            mutationFn: async({ product_id, quantity = 1 }) => {
                console.log('🔥 useAddToCart called with:', { product_id, quantity });
                const response = await baseRequest.post('/cart/items/', {
                    product_id,
                    quantity
                })
                console.log('✅ Backend response:', response.data);
                return response.data
            },
            onSuccess: () => {
                console.log('✅ AddToCart success, invalidating queries');
                queryClient.invalidateQueries(['cart'])
            },
            onError: (error) => {
                console.log('❌ AddToCart error:', error);
            }
        })
    )
}

// update cart item quantity
export const useUpdateCartItem = ()=>{
    const queryClient = useQueryClient()
    return(
        useMutation({
            mutationFn: async({product_id, quantity})=>{
                const response = await baseRequest.put(`/cart/items/${product_id}/`,{
                    quantity
                })
                return response.data
            },
            onSuccess:()=>{
                queryClient.invalidateQueries(['cart'])
            }
        })
    )
}

// remove item from cart
export const useRemoveFromCart= ()=>{
    const queryClient = useQueryClient();
    return(
        useMutation({
            mutationFn: async({product_id})=>{
                const response = await baseRequest.delete(`/cart/remove/${product_id}/`)
                return response.data
            },
            onSuccess: ()=>{
                queryClient.invalidateQueries(['cart'])
            }
        })
    )
}

// clear entire cart
export const useClearCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: async () => {
        const response = await baseRequest.delete('/cart/');
        return response.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['cart']);
      },
    });
  };
  
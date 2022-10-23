import create from "zustand";

export const useStore = create(
    (set) => ({
        // maintaining cart
        cart : {
            fooditems : []
        },

        // adding the food items to cart
        addFooditem: (data)=> set((state) => ({ 
            cart : {
                fooditems : [...state.cart.fooditems,data]
            }
        })),

        // remove food item 
        removeFooditem: (index) => set((state) => ({
            cart : {
                fooditems : state.cart.fooditems.filter((_, i)=> i!= index)
            }
        })),

        // reset cart
        resetCart: () => set(()=>({
            cart: {
                fooditems: []
            }
        }))
    })
)
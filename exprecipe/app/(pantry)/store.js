import { create } from "zustand";   

// global storage for scannedIngredients
export const usePantryStore = create((set)=> ({
    scannedIngredients: [],
    removeItem: (itemName) => set((state) => ({ scannedIngredients: state.scannedIngredients.filter((item) => item !== itemName ) })),
    setScannedIngredients: (ingredients)=> set({scannedIngredients: ingredients})
}))


export default usePantryStore; 

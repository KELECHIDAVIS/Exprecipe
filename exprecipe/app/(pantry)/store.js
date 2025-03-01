import { create } from "zustand";   

// global storage for scannedIngredients
export const usePantryStore = create((set)=> ({
    scannedIngredients: [],
    removeScannedIngredient: (itemName) => set((state) => ({ scannedIngredients: state.scannedIngredients.filter((item) => item !== itemName ) })),
    clearScannedIngredients: () => set((state) => ({ scannedIngredients: []})),
    setScannedIngredients: (ingredients)=> set({scannedIngredients: ingredients})
}))


export default usePantryStore; 

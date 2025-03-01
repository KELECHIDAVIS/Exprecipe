import { create } from "zustand";   

// global storage for scannedIngredients
export const usePantryStore = create((set)=> ({
    scannedIngredients: [],
    setScannedIngredients: (ingredients)=> set({scannedIngredients: ingredients})
}))


export default usePantryStore; 

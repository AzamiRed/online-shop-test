import { defineStore } from 'pinia';
import type { Product } from '@/types/product'; 

interface State {
  basket: Product[];
}

export const useBasketStore = defineStore('basket', {
  state: (): State => ({ 
    basket: [],
  }),
  getters: {
    getBasket: (state) => state.basket
  },
  actions: {
    addToBasket(obj: any) {
      if (!this.basket.some((item: any) => item.id === obj.id)) {
        obj.count = 1;
        this.basket.push(obj);
      }
    },
    changeCount(id: number, count: number) {
      const index = this.basket.findIndex((obj: any) => obj.id === id);

      this.basket[index].count = count;
    },
    incrementCount(id: number) {
      const index = this.basket.findIndex((obj: any) => obj.id === id);

      this.basket[index].count++;
    },
    decrementCount(id: number) {
      const index = this.basket.findIndex((obj: any) => obj.id === id);

      this.basket[index].count--;
    },
    removeFromBasket(id: number) {
      this.basket = this.basket.filter((obj: any) => obj.id !== id);
    }
  },
})
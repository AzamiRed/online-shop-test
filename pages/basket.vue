<script setup lang="ts">
import { useBasketStore } from '@/store/basket';
import BasketProductCard from '@/components/BasketProductCard.vue';
import type { Product } from '@/types/product'; 
import type { Price } from '@/types/price';

const store = useBasketStore();
const basket = computed(() => store.getBasket);
const prices = ref<Price[]>([]);

const headers = ["Item", "Price", "Qty", "Total"];

onMounted(() => {
  basket.value.forEach((product: Product) => {
    if (product.count !== 0) {
      prices.value.push({
        id: product.id,
        price: product.regularPrice.value * product.count,
      })
    }
  })
});

const changeFullPrice = (e: Price) => {
  if (!prices.value.some((obj) => obj.id === e.id)) {
    prices.value.push(e);
  } else {
    const index = prices.value.findIndex((obj) => obj.id === e.id);
    prices.value[index].price = e.price;
  }
}

const fullPrice = computed(() => {
  return prices.value.reduce((acc, obj) => {
    acc += obj.price;
    return acc ? Number(acc.toFixed(2)) : 0;
  }, 0)
});
</script>

<template>
  <div class="basket">
    <h1 class="basket__title">Shopping Cart</h1>

    <div class="basket__products" v-if="basket.length">
      <div class="basket__headlines">
        <div class="basket__head" v-for="title in headers" :key="title" v-html="title"/>
      </div>
      <BasketProductCard 
        v-for="{ id, image, brandName, title, regularPrice, count, length } in basket" 
        :key="id" 
        :id="id"
        :image="image"
        :title="title"
        :brandName="brandName"
        :regularPrice="regularPrice"
        :count="count"
        :length="length"
        @update:price="changeFullPrice"
      />
    </div>

    <div v-else class="basket__empty">
      Ваша корзина пуста!
    </div>

    <div class="basket__fullPrice">
      Subtotal: ${{ fullPrice }}
    </div>

    <button class="basket__send" :disabled="!basket.length">
      Checkout
    </button>
  </div>
</template>

<style lang="scss" scoped>
.basket {
  width: 60rem;
  margin: 0 auto;

  &__title {
    font: 700 30px/36px 'Nunito Sans', sans-serif;
    margin-top: 1rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  &__headlines {
    display: grid;
    grid-template-columns: 1.5fr 1fr 0.5fr 0.5fr 0.2fr;
  } 

  &__head {
    text-align: center;
    font: 700 20px/34px 'Nunito Sans', sans-serif;
  }

  &__empty {
    text-align: center;
    font: 700 20px/24px 'Nunito Sans', sans-serif;
  }

  &__fullPrice {
    margin-top: 1rem;
    text-align: end;
    font: 700 20px/24px 'Nunito Sans', sans-serif;
  }

  &__send {
    margin-top: 1rem;
    outline: none;
    float: right;
    background: transparent;
    border: 1px solid #000;
    padding: 0.5rem 1rem;
    font: 700 16px/20px 'Nunito Sans', sans-serif;
  }

  @media screen and (max-width: 964px) {
    width: 100%;
    margin: 0;

    &__fullPrice,
    &__send {
      margin-right: 2rem;
    }
  };

  @media screen and (max-width: 480px) {
    &__headlines {
      display: grid;
      grid-template-columns: 1.5fr 1fr 0.5fr 0.5fr 0.4fr;
    }

    &__head {
      text-align: center;
      font: 700 16px/18px 'Nunito Sans', sans-serif;
    }

  };
}
</style>

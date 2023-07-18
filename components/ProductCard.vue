<script lang="ts" setup>
import { useBasketStore } from '@/store/basket';

import type { RegularPriceType, Product } from '@/types/product'; 

const props = defineProps<{
  type: string;
  title: string;
  sku: string;
  image: string;
  brand: string;
  id: number;
  regularPrice: RegularPriceType;
  length: number;
  count: number;
}>();

const store = useBasketStore();
const basket = computed(() => store.getBasket);

const isShowChangeLength = ref(false);

const emits = defineEmits<{
  (e: 'update:addToBasket'): void;
}>();

const toBasket = () => {
  isShowChangeLength.value = true
  emits('update:addToBasket');
};

const warning = computed(() => {
  const words = ['штука', 'штуки', 'штук'];
  const lastDigit = props.length % 10;
  const secondToLastDigit = Math.floor((props.length % 100) / 10);
  let result;
  
  if (secondToLastDigit === 1) {
    result = `Осталось ${props.length} ${words[2]}!`;
  } else if (lastDigit === 1) {
    result = `Осталось ${props.length} ${words[0]}!`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    result = `Осталось ${props.length} ${words[1]}!`;
  } else {
    result = `Осталось ${props.length} ${words[2]}!`;
  }

  return result;
})

</script>

<template>
  <div 
    class="productCard">
    <div class="productCard__image">
      <img :src="image" :alt="title" />
    </div>

    <div class="productCard__info">
      <div>
        <h2 class="productCard__title">{{ title }}</h2>
        <span class="productCard__brand"> {{ brand }}</span>
        <div class="productCard__currency">
          {{ `${regularPrice.currency} ${regularPrice.value}`  }}
        </div>
      </div>

      <div v-if="length !== 0">
        <button class="productCard__addBasketButton" @click="toBasket">
          <div class="productCard__addBasketButtonText">В корзину</div>
          <div class="productCard__addBasketButtonIcon">
            <img src="/assets/icons/add-to-basket.png" alt="Добавить в корзину" />
          </div>
        </button>
      </div>
    </div>

    <div v-if="length <= 10" class="productCard__warning">{{ props.length > 0 ? warning : 'Товара нет в наличии' }}</div>
  </div>
</template>

<style lang="scss" scoped>
.productCard {
  background: #fff;
  padding: 2rem 0;
  border-radius: 1rem;
  border: none;
  transition: background 0.3s ease;

  &__image {
    width: fit-content;
  }

  &__image img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title,
  &__brand,
  &__currency {
    font: 700 18px/20px 'Nunito Sans', sans-serif;
    margin-bottom: 0.5rem;
    margin-left: 1rem;
  }

  &__warning {
    margin-left: 1rem;
    font: 400 14px/16px 'Nunito Sans', sans-serif;
    color: red;
  }

  &__addBasketButton {
    margin-right: 1rem;
    height: 3rem;
    width: 8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #cfcfcf;
    background: #cfcfcf;
    outline: none;
    font: 700 12px/14px 'Nunito Sans', sans-serif;

    &--disabled {
      background: #ebebeb;
      color:#a8a8a8;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__addBasketButtonIcon {
    width: 2rem;
    height: 2rem;
    transition: width 0.3s ease, height 0.3s ease;
  }

  &__addBasketButtonIcon img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__value {
    padding: 0 1rem;
    font: 700 12px/14px 'Nunito Sans', sans-serif;
  }

  &:hover {
    background: #e4e4e4;
  }
}
</style>
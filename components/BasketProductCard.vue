<script setup lang="ts">
import { useBasketStore } from '@/store/basket';

const store = useBasketStore();

type RegularPriceType = {
  currency: string;
  value: number;
}

type Price = {
  id: number;
  price: number;
}

const props = defineProps<{
  id: number;
  image: string;
  title: string;
  brandName: string | undefined;
  regularPrice: RegularPriceType;
  count: number;
  length: number;
}>();

const price = computed(() => {
  if (!props.count) return 0;
  
  return (props.regularPrice.value * props.count).toFixed(2);
});

const emits = defineEmits<{
  (e: 'update:price', item: Price ): void;
}>();

watch(price, () => {
  emits('update:price', {
    price: Number(price.value),
    id: props.id,
  })
});

watch(props, () => {
    if (!props.count) {
      store.removeFromBasket(props.id)
    }
  }, 
  {
    deep: true,
  }
)
</script>

<template>
  <div class="basketItem">
    <div class="basketItem__info">
      <div class="basketItem__image">
        <img :src="image" :alt="title" />
      </div>
      <div>
        <div class="basketItem__title">{{ title }}</div>
        <div class="basketItem__brand">{{ brandName }}</div>
      </div>
    </div>

    <div class="basketItem__currency">{{ `$${regularPrice.value}`  }}</div>

    <div class="basketItem__counter">
      <div class="basketItem__counterValue">{{ count ?? 0 }}</div>
      
      <div class="basketItem__counterActions">
        <button class="basketItem__action" :disabled="count === length" @click="store.incrementCount(id)">+</button>
        <button class="basketItem__action" :disabled="count === 0" @click="store.decrementCount(id)">-</button>
      </div>
    </div>

    <div class="basketItem__currency">{{`$${price}`  }}</div>

    <div class="basketItem__remove">
      <button class="basketItem__removeAction" @click="store.removeFromBasket(id)">
        <img src="/assets/icons/remove.png" alt="remove" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.basketItem {
  display: grid;
  grid-template-columns: 1.5fr 1fr 0.5fr 0.5fr 0.2fr;
  align-items: center;
  border-bottom: 2px solid #000;

  &__info {
    display: flex;
    align-items: center;
  }

  &__image {
    width: 10rem;
    height: fit-content;
  }

  &__image img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__removeAction {
    width:2.5rem;
    height: 2.5rem;
    outline: none;
    background: transparent;
    border: none;

    &:hover {
      cursor: pointer;
    }
  }

  &__removeAction img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  &__title {
    font: 700 18px/20px 'Nunito Sans', sans-serif;
  }


  &__brand {
    font: 700 16px/18px 'Nunito Sans', sans-serif;
  }

  &__currency {
    font: 500 16px/28px 'Nunito Sans', sans-serif;
    text-align: center;
  }

  &__counter {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__counterActions {
    display: flex;
    flex-direction: column;
  }

  &__action {
    border: 1px solid #000;
    width: 1.5rem;
    height: 1.5rem;
    background: #cfcfcf;
    outline: none;
    font: 700 14px/16px 'Nunito Sans', sans-serif;

    &:hover {
      cursor: pointer;
    }
  }

  &__counterValue {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 1.5rem;
    height: 3rem;
    font: 700 14px/16px 'Nunito Sans', sans-serif;
  }

  @media screen and (max-width: 634px) {
    &__image {
      width: 8rem;
    }

    &__title {
      font: 700 14px/16px 'Nunito Sans', sans-serif;
    }

    &__brand {
      font: 700 12px/14px 'Nunito Sans', sans-serif;
    }

    &__currency {
      font: 500 12px/14px 'Nunito Sans', sans-serif;
    }

    &__removeAction {
      width: 2rem;
      height: 2rem;
    }
  };

  @media screen and (max-width: 480px) {
    &__image {
      width: 4rem;
    }

    &__title {
      font: 700 12px/14px 'Nunito Sans', sans-serif;
    }

    &__brand {
      font: 700 10px/12px 'Nunito Sans', sans-serif;
    }

    &__currency {
      font: 500 10px/12px 'Nunito Sans', sans-serif;
    }


    &__action {
      width: 1rem;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font: 700 12px/14px 'Nunito Sans', sans-serif;
    }

    &__counterValue {
      width: 1rem;
      height: 2rem;
      font: 700 12px/14px 'Nunito Sans', sans-serif;
    }
  };
}

</style>
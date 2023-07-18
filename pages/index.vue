<script setup lang="ts">
import ProductCard from '@/components/ProductCard.vue';
import FilterPanel from '@/components/FilterPanel.vue';
import { useBasketStore } from '@/store/basket';
import type { Product } from '@/types/product'; 
import type { Brand } from '@/types/brands';

const { addToBasket } = useBasketStore();

const filters = ref<number[]>([]);

const { data: products } = await useFetch('/api/products');

const { data: brands } = await useFetch('/api/brands');

const filteredProducts = computed(() => {
  const arr = products.value?.map((product => {
    const brandIndex = brands.value?.findIndex(brand => brand.id === product.brand);

    return {
      ...product,
      brandName: (brands.value as Brand[])[brandIndex as number].title ?? '',
    }
  }));

  if (filters.value.includes(0) || !filters.value.length) return arr;

  return arr?.filter((product: Product) => filters.value.includes(product.brand));
})

const setFilters = (arr: number[]) => {
  filters.value = arr;
};

</script>

<template>
  <div class="catalog">
    <h1 class="catalog__title">Catalog</h1>

    <div class="catalog__container">
      <FilterPanel :brands="brands" @update:filters="setFilters"/>
      <div class="catalog__list">
        <ProductCard 
          v-for="product in filteredProducts" 
          :key="product.id"
          :brand="product.brandName"
          :id="product.id"
          :image="product.image"
          :regularPrice="product.regularPrice"
          :sku="product.sku"
          :title="product.title"
          :type="product.type"
          :length="product.length"
          :count="product.count"
          @update:addToBasket="addToBasket(product)"
        />
      </div>
    </div>


  </div>
</template>


<style lang="scss" scoped>
.catalog {
  &__title {
    font: 700 30px/36px 'Nunito Sans', sans-serif;
    margin-top: 1rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  &__container {
    display: flex;
  }

  &__list {
    width: 100%;
    grid-gap: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (max-width: 964px) {
    &__list {
      grid-template-columns: 1fr 1fr;
    }
  };

  @media screen and (max-width: 634px) {
    &__container {
      display: block;
    }
  };

  @media screen and (max-width: 480px) {
    &__list {
      grid-template-columns: 1fr;
    }
  };



}
</style>
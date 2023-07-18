<script setup lang="ts">

type Brand = {
  id: number;
  title: string;
  sort: string;
  code: string;
};

const props = defineProps<{
  brands: Brand[] | null;
}>();

const activeFilters = ref<number[]>([0]);

const setActiveFilters = (id: number) => {
  const filters = activeFilters.value.filter((filter: number) => filter !== id);
  if (!id) {
    activeFilters.value = []
  };

  if (!activeFilters.value.includes(id)) {  
    activeFilters.value = activeFilters.value.filter((filter: number) => filter !== 0)
    activeFilters.value.push(id);
  } else {
    activeFilters.value = filters;
  }

  if (filters.length === 0) {
    activeFilters.value.push(0);
  } 
}

const emits = defineEmits<{
  (e: 'update:filters', item: number[]): void;
}>();

watch(activeFilters, (val) => {
  emits('update:filters' , val)
})
</script>

<template>
  <div class="filterBrandList">
    <ol>
      <li>
        <button :class="[{
          'filterBrandList__button--active': activeFilters.includes(0),
        }, 'filterBrandList__button']" @click="setActiveFilters(0)">All brands</button>
      </li>
      <li v-for="{ id, title, sort, code} in brands" :key="id">
        <button :class="[{
          'filterBrandList__button--active':  activeFilters.includes(id),
        }, 'filterBrandList__button']" @click="setActiveFilters(id)" >
          {{ title }}
        </button>
      </li>
    </ol>
  </div>
</template>

<style lang="scss" scoped>
.filterBrandList {
  background: #fff;
  padding: 2rem 1rem;
  margin-right: 1rem;
  border-radius: 1rem;
  height: fit-content;

  &__button {
    border: none;
    background: transparent;
    outline: none;
    width: max-content;
    font: 500 14px/16px 'Nunito Sans', sans-serif;
    margin-bottom: 0.5rem;
    transition: background 0.3s ease,
                color 0.3s ease;

    &--active {
      background: #000;
      color: #fff;
    }
  }

  @media screen and (max-width: 634px) {
    margin-right: 0;
    margin-bottom: 1rem;
    display: flex;
    justify-content: center;
  };
}
</style>
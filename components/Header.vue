<script lang="ts" setup>
import { useBasketStore } from '@/store/basket';

const route = useRoute();
const router = useRouter()

const store = useBasketStore();

const basket = computed(() => store.getBasket);
const isShowBasketPreview = ref(false);

const toBasket = () => {
  router.push('/basket');
};

const isBasketPath = computed(() => {
  return route.name === 'basket';
});

</script>

<template>
  <nav :class="['navbar', { 'navbar--basket': isBasketPath }]">
    <NuxtLink class="navbar__logo" to="/">
      <img src="https://raw.githubusercontent.com/fe-side/vue-test/master/assets/images/logo.png" alt="logo" /> 
    </NuxtLink>
    <div class="navbar__basket" v-if="!isBasketPath">
      <button class="navbar__basketButton" @click="toBasket">
        <img src="/assets/icons/basket.png" alt="корзина">
        <div v-if="basket.length" class="navbar__basketLength">
          {{ basket.length }}
        </div>
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 3px solid #000;

  &--basket {
    justify-content: center;
  }

  &__basketButton {
    border: none;
    background: transparent;
    outline: none;
    position: relative;

    &:hover {
      cursor: pointer;
    }
  }

  &__basketLength {
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: 0;
    right: 0;
    padding: 3px;
    background: #80b8ce;
    border-radius: 10px;
    font: 700 14px/16px 'Nunito Sans', sans-serif;
    color: #fff;
    text-align: center;
  }

  &__basketButton img {
    width: 40px
  }

  &__basket {
    position: relative;
  }


  &__basketPreviewContent {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    border-bottom: 3px solid black;
  }

  &__basketPreviewInfo {
    display: flex;
    align-items: center;
  }

  &__basketPreviewImage {
    width: 6rem;
    height: 6rem;
  }

  &__basketPreviewImage img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  &__basketPreviewCounter {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  &__basketPreviewCounterAction {
    border: 1px solid #cfcfcf;
    width: 2rem;
    height: 2rem;
    background: #cfcfcf;
    outline: none;
    font: 700 14px/16px 'Nunito Sans', sans-serif;

    &:hover {
      cursor: pointer;
    }
  }

  &__basketPreviewCounterValue {
    padding: 0 1rem;
    font: 700 14px/16px 'Nunito Sans', sans-serif;
  }

  &__basketPreviewRemoveAction {
    border: none;
    background: transparent;
    outline: none;
    width: 2.5rem;
    height: 2.5rem;
  }

  &__basketPreviewRemoveAction img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  &__basketLink {
    width: 100%;
    padding-top: 1rem;
    display: flex;
    justify-content: flex-end;
  }

  &__basketLink a {
    outline: none;
    text-decoration: none;
    font: 500 14px/16px 'Nunito Sans', sans-serif;
  }
}
</style>
<template>
  <div class="container">
    <div class="d-flex flex-column justify-content-center">
      <div class="mx-auto">
        <router-link to="/">Home</router-link> |
        <router-link to="/login">Login</router-link>
      </div>
      <h5 class="text-center my-3 text-danger">Your are logged out!</h5>
      <p class="text-center mt-3">Bye!</p>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import axios from 'axios';
import { onMounted } from 'vue';

onMounted(async () => {
  await axios.post('/api/logout');
  useUserStore((store) => {
    store.logout();
  });
});
</script>

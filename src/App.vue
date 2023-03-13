<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="border m-1 p-3 flex justify-center">
      <nav>
        <RouterLink to="/ipl"
          class="border p-2 rounded">IPL Convert</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style></style>

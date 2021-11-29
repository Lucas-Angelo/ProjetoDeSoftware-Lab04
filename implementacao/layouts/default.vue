<template>
  <div class="pucoins">
    <div class="pucoins-container">
      <Nuxt />
    </div>
  </div>
</template>

<style>
  body{
    background: #25202b;
  }
  .pucoins-container{
    padding: 20px;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(255, 255, 255, 0.856);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.125);
    height: 97.5vh;
    overflow-y: auto;
  }
</style>

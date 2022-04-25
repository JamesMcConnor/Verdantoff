<template>
<div :style = "background" class = "relative bg-fixed opacity-90 w-screen h-screen">
<p class="pt-40 underline text-center mx-auto  text-4xl text-green-500 italic font-serif">Welcome to Verdantoff</p>
<p class="pt-3 underline text-center mx-auto  text-4xl text-green-500 italic font-serif">A green office online</p>
</div>
</template>

<script>
export default {
    data(){
      return {
        background: {
          backgroundImage: 'url(' + require('../ocean.jpg') + ')',
          backgroundRepeat:'no-repeat',
          backgroundSize: 'cover',
          backgoundPosition: 'center'
        }
      }
    }
};
</script>

<style>

</style>
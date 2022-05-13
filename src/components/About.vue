<template>
  <div :style="background" class="relative bg-fixed opacity-90 w-full h-screen">
    <h1
      class="pt-40 font-bold text-center mx-auto text-5xl text-white font-serif"
    >
      Welcome to Verdantoff
    </h1>
    <p
      class="pt-5 font-bold text-center mx-auto text-5xl text-white font-serif"
    >
      Your virtual office online
    </p>
    <p class="pt-40 text-center mx-auto text-3xl text-white font-serif">
      Please Sign Up or Sign In to use the services on this site
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      background: {
        backgroundImage: "url(" + require("../ocean.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgoundPosition: "center",
      },
    };
  },

  components: {},
};
</script>

<style>
</style>
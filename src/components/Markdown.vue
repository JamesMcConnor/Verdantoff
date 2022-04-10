<template>
<h1 class="text-center">Mark Down App</h1>
  <section class="flex w-full h-screen">
      <article class="w-1/2 border"><textarea class="w-full h-full" v-model.lazy="text"></textarea></article>
      <article class="w-1/2 border" v-html="markedText"></article>
  </section>
</template>

<script>
import marked from 'marked';
export default {
    data(){
        return {
            text:""
        };
    },
    computed:{
        markedText(){
            return marked(this.text)
        }
    }
}
</script>

<style>

</style>
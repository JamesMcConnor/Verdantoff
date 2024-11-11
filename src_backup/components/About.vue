<!---
  This is the file for about page, which is the main page of the website
--->

<template>
<div class="front">
  <!--- Add a condition to change background image --->
  <div v-if="isFern" :style="background_leaf_dark" class="relative bg-fixed opacity-90 w-full h-screen"> 
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

    <!--- Select box for switching background --->
    <div class="absolute bottom-0 right-0">
      <select @click="changeBG($event.target.value)" name="bg" class="bg-green-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-l ">
      <option value="err">Select Background</option>
      <option value="fern">Fern</option>
      <option value="leaf" >Leaf</option>
      <option value="mountain" >Mountain</option>
      </select>
    </div>
  </div>

  <!--- Leaf background--->
  <div v-if="isLeaf" :style="background_leaf_mid" class="relative bg-fixed opacity-90 w-full h-screen"> 
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

    <div class="absolute bottom-0 right-0">
      <select @click="changeBG($event.target.value)" name="bg" class="bg-green-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-l ">
      <option value="err">Select Background</option>
      <option value="fern">Fern</option>
      <option value="leaf" >Leaf</option>
      <option value="mountain" >Mountain</option>
      </select>
    </div>
  </div>

  <!--- Mountain background--->
  <div v-if="isMountain" :style="background_mountain_bright" class="relative bg-fixed opacity-90 w-full h-screen"> 
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
    
    <div class="absolute bottom-0 right-0">
      <select @click="changeBG($event.target.value)" name="bg" class="bg-green-700 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded-l ">
      <option value="err">Select Background</option>
      <option value="fern">Fern</option>
      <option value="leaf" >Leaf</option>
      <option value="mountain" >Mountain</option>
      </select>
    </div>
  </div>

                    
</div>
  
</template>

<script>
export default {

  data() {
    return {
      //initialize
      isFern : true,
      isLeaf : false,
      isMountain : false,
      selectedOption : "",
      background_leaf_dark: {
        backgroundImage: [
        "url(" + require("../assets/alterBG9.jpg") + ")",     
        ],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgoundPosition: "center",
      },

      background_leaf_mid: {
        backgroundImage: [
        "url(" + require("../assets/alterBG3.jpg") + ")",    
        ],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgoundPosition: "center",
      },

      background_mountain_bright: {
        backgroundImage: [
        "url(" + require("../assets/alterBG1.jpg") + ")",      
        ],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgoundPosition: "center",
      },
    };
  },

methods: {
  //Function to change boolean value for backgrounds
  changeBG(arg){
    this.selectedOption  = arg;
    if (this.selectedOption =="fern" ){
      this.isFern = true;
      this.isLeaf = false;
      this.isMountain = false;
    }else if (this.selectedOption == "leaf"){
      this.isFern = false;
      this.isLeaf = true;
      this.isMountain = false;
    }else if (this.selectedOption=="mountain"){
      this.isFern = false;
      this.isLeaf = false;
      this.isMountain = true;
    }
  },

},

  components: {},
};
</script>

<style>
</style>
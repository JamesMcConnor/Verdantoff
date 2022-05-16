<template>
    <div :style="background" class="relative bg-fixed opacity-90 w-full h-screen">
        

    
    </div>
</template>

<script>

export default {
    name: 'contactUs',

data(){
    return{
        background: {
        backgroundImage: [
        "url(" + require("../assets/alterBG7.jpg") + ")",     
        ],
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgoundPosition: "center",
        },

    };
},
}

</script>
<style scoped lang='less'>
</style>
<template>
    <div :style="background" class="relative bg-fixed opacity-90 w-full h-screen">
        <div class="p-10 font-serif text-4xl subpixel-antialiased font-bold leading-relaxed text-center text-white">
            <h1 class="text-6xl">Contact Us</h1>
            <br>
                <p>FronTech NZ</p>
                <br>
            <p>
            616 Glenbrook Rd, RD4 Pukekohe
            Auckland 2679, New Zealand.
            <br>
            Email: jamesfrontechcorp@gmail.com
            </p>            
        </div>    
    </div>
</template>

<script>

export default {
    name: 'contactUs',

data(){
    return{
        background: {
        backgroundImage: [
        "url(" + require("../assets/alterBG6.jpg") + ")",     
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
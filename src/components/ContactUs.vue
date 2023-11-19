<!---
    This is the file for contact us page. 
 --->
<template>
    <div :style="background" class="relative bg-fixed opacity-90 w-full h-screen  gold-text-light">
        <div class="p-10 font-serif text-4xl subpixel-antialiased font-bold leading-relaxed text-center gold-text-light">
            <h1 class="text-6xl">Contact Us</h1>
            <br>
            <p>FronTech NZ</p>
            <br>
            <p>Email: jamesfrontechcorp@gmail.com
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contactUs',

    data() {
        return {
            //CSS setting
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
<style scoped lang='less'></style>
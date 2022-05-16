<!--
 * @Author: Tai Zhang
-->
<template>

    <div class="pt-0">
        <footer v-if= "!$route.meta.showNav" id="footer" class="bg-blue-200 relative z-50 dark:bg-gray-900">
            
                <div class="mx-auto container px-4 xl:px-12 2xl:px-4">
                    <div class="lg:flex pt-3">
                        <div class="w-full lg:w-1/2 mb-16 lg:mb-0 flex">                         
                            <div class="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li>                                       
                                        <router-link to="/AboutUs" class="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-600 dark:text-white">About Us</router-link>
                                        
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 flex">
                            <div class="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li>
                                        <router-link to="/term" target = "_blank " class="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-600 dark:text-white">Terms and Conditions</router-link>
                                    
                                    </li>                                   

                                </ul>
                            </div>
                            
                        </div>

                        <div class="w-full lg:w-1/2 flex">
                            <div class="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li>
                                        <router-link to="/ContactUs" class="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-600 dark:text-white">Contact Us</router-link>
                                    </li>
                                </ul>
                            </div>
                            
                        </div>                       
                    </div>
                </div>
            
            
        </footer>
    </div>   
</template>

<script>
export default {
    name: "footer",


    data() {
        return {

        };
    },

    methods: {

    },

    
    mounted() {},
    
};
</script>

<style scoped>
@import url("https://cdn.tuk.dev/dist/css/tailwind-v2.2.11.min.css");
</style>

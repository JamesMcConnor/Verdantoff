<template>
    <div class="pt-1">
        <footer id="footer" class="relative z-50 dark:bg-gray-900 pt-4">
            
                <div class="mx-auto container px-4 xl:px-12 2xl:px-4">
                    <div class="lg:flex">
                        <div class="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                           
                            <div class="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li>                                       
                                        <router-link to="/AboutUs" class="text-xs lg:text-xl leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">About Us</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="w-full lg:w-1/2 flex">
                            <div class="w-full lg:w-1/2 px-6">
                                <ul>
                                    <li>
                                        <router-link to="/term" class="text-xs lg:text-xl leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Privacy Policy</router-link>
                                    </li>
                                   
                                </ul>
                            </div>
                            <div class="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                                <div class="flex items-center mb-6">
                                    <a href="https://github.com/EririMaki/RND_VOIP2" alt="Our GitHub Repo">
                                        <div class="text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand">
                                            <svg class="footer-icon feather feather-github" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                                            </svg>
                                        </div>
                                    </a>
                                    
                                </div>
                                <div class="relative w-36">
                                    <svg id="auto" v-if="auto" xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 m-auto ml-3 text-gray-700 dark:text-gray-50 icon icon-tabler icon-tabler-device-laptop" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1="3" y1="19" x2="21" y2="19" />
                                        <rect x="5" y="6" width="14" height="10" rx="1" />
                                    </svg>
                                    <svg id="light" v-if="light" xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 m-auto ml-3 text-gray-700 dark:text-gray-50 icon icon-tabler icon-tabler-brightness-up" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <circle cx="12" cy="12" r="3" />
                                        <line x1="12" y1="5" x2="12" y2="3" />
                                        <line x1="17" y1="7" x2="18.4" y2="5.6" />
                                        <line x1="19" y1="12" x2="21" y2="12" />
                                        <line x1="17" y1="17" x2="18.4" y2="18.4" />
                                        <line x1="12" y1="19" x2="12" y2="21" />
                                        <line x1="7" y1="17" x2="5.6" y2="18.4" />
                                        <line x1="6" y1="12" x2="4" y2="12" />
                                        <line x1="7" y1="7" x2="5.6" y2="5.6" />
                                    </svg>
                                    <svg id="dark" v-if="dark" xmlns="http://www.w3.org/2000/svg" class="absolute inset-0 m-auto ml-3 text-gray-700 dark:text-gray-50 icon icon-tabler icon-tabler-moon" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                                    </svg>

                                    <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute inset-0 m-auto mr-3 text-gray-700 dark:text-gray-50 icon icon-tabler icon-tabler-chevron-down" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                    <select @change="toggle($event)" class="w-full focus:outline-none pl-10 py-2 appearance-none flex items-center h-12 border rounded border-gray-700 dark:border-gray-50 text-sm leading-5 dark:bg-gray-900 dark:text-gray-50">
                                        <option value="auto">Auto</option>
                                        <option value="light">Light</option>
                                        <option value="dark">Dark</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
            <div class="py-1 flex flex-col justify-center items-center">
                <a href="Please input the link of the ICON">
                    <img src="../assets/VerdantoffIcon.svg" alt="Verdantoff">
                </a>
                <p class="mt-6 text-xs lg:text-sm leading-none text-gray-400 dark:text-gray-50">Verdantoff</p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            auto: true,
            light: false,
            dark: false,
        };
    },
    mounted() {},
    methods: {
        toggle(event) {
            if (event.target.value === "auto") {
                this.auto = true;
                this.light = false;
                this.dark = false;
            }
            if (event.target.value === "light") {
                this.auto = false;
                this.light = true;
                this.dark = false;
            }
            if (event.target.value === "dark") {
                this.auto = false;
                this.light = false;
                this.dark = true;
            }
        },
    },
};
</script>

<style scoped>
@import url("https://cdn.tuk.dev/dist/css/tailwind-v2.2.11.min.css");
</style>

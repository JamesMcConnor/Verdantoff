<template>
  <div class="m-auto bg-blue-100">
      <h1 class="text-center">Vue Calendar</h1>
      <h2 class="text-center">{{ currentMonthName }}</h2>
      <h3 class="text-center">{{ currentYear }}</h3>
      <section class="flex">
          <!-- <p class="w-40 h-10 text-center" v-for="day in days" :key = "day">{{ day }}</p> -->
          <p class="text-center" style="width: 14.28%" v-for="day in days" :key = "day">{{ day }}</p>
      </section>
      <section class="flex flex-wrap">
          <p class="text-center" style="width: 14.28%" v-for="num in startDay()" :key="num"></p>
          <p class="text-center" style="width: 14.28%" v-for="num in daysInMonth(currentMonth,currentYear)" :key="num">{{num}}</p>
      </section>
      <section class="flex justify-between">
          <button class="px-3 border rounded bg-green-300" @click="prev">Prev</button>
          <button class="px-3 border rounded bg-green-300" @click="next">Next</button>
      </section>
  </div>
</template>

<script>
export default {
    data(){
        return {
            // currentMonthName: new Date().toLocaleDateString('default',{month:'long'}),
            currentMonth: new Date().getMonth() ,
            currentYear: new Date().getFullYear(),
            days: ['Sunday ','Monday ','Tuesday ','Wednesday ','Thursday ','Friday ','Saturday ']
        }
    },
    methods: {
        daysInMonth(month,year){
            return new Date(year,month + 1,0).getDate();
        },
        startDay(){
            return new Date(this.currentYear,this.currentMonth , 1).getDay();
        },
        next(){
            this.currentMonth++;
        },
        prev(){
            this.currentMonth--;
        },
        
    },
    computed: {
        currentMonthName(){
            return new Date(this.currentYear,this.currentMonth).toLocaleDateString('default',{month:'long'});
        },
    },
}
</script>

<style>

</style>
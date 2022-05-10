<template>
  <div
    :style="background"
    class="
      isPc?'pcPage':'mobilePage'
      relative
      bg-fixed
      w-full
      h-full
      margin:auto
    "
  >
    <div class="ml-9 mr-9">
      <div class="container">
        <div class="md-layout">
          <div
            class="
              md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100
              text-white
              font-serif
            "
          >
            <h1 class="pt-40 text-center mx-auto text-4xl smooth=1">
              Your Story Starts With Verdantoff
            </h1>

            <h2 class="pt-20 text-center mx-auto text-2xl">About Us</h2>

            <div class="">
              <h4 class="leading-8 break-normal pt-10 mx-auto text-xl">
                <p>
                  Verdantoff seeks to migrate office workers from the physical
                  environment to virtual environments via the Internet. This
                  will cut carbon emissions, reduce over-dependence on fossil
                  fuel and help freshen up the environment. The skills and
                  competence of office workers are in their minds, which means
                  they can perform their tasks wherever they are located,
                  including their homes, using laptops and desktops.
                </p>

                <p class="pt-5">
                  Up to 92% of GDP in developed nations come from the service
                  sector. If this sector learns to migrate to virtual offices,
                  most of the problems of modern society will be solved,
                  especially traffic gridlock and housing shortages.
                </p>
              </h4>
            </div>

            <br />

            <h2 class="pt-20 text-center mx-auto text-2xl">Our Services</h2>

            <div class="">
              <h4 class="leading-8 break-normal pt-10 mx-auto text-xl">
                <p>
                  Verdantoff enables employers to maintain real-time
                  communication contact with their staff using VoIP and other
                  communication technologies. By using our site to connect to
                  your staff working remotely, you will save on rent,
                  electricity, insurance, rates and other outgoings that
                  employers have to pay to maintain an office It means you can
                  pay your staff more to motivate them to work harder for your
                  business. In return, you are able to monitor and manage your
                  human resources remotely.
                </p>
                <br />
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'

export default {
  data() {
    return {
      //Background is for a future function: Night Mode
      background: {
        backgroundImage: "url(" + require("../assets/bg.jpg") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgoundPosition: "center",
      },
      //Verify the devices, PC / Phone
      isPc: true,
    };
  },

  computed: {
    backgroundStyle() {
      return {
        backgroundImage: "url(" + require("../assets/bg.jpg") + ")",
      };
    },
  },

  methods: {
    IsPC() {
      var userAgentInfo = navigator.userAgent;
      var Agents = [
        "Android",
        "iPhone",
        "SymbianOS",
        "Windows Phone",
        "iPad",
        "iPod",
      ];
      var flag = true;
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          flag = false;
          break;
        }
      }
      return flag;
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      //The "vm" is the instance of current module.
      vm.isPc = vm.IsPC();
      console.log("IsPC", vm.IsPC());
    });
  },
};
</script>
<style scoped lang='less'>
</style>
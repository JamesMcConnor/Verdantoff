<template>
  <div class="slider-container">
    <transition-group name="fade" tag="div">
      <div :key="currentIndex" class="slide">
        <img :src="currentImg" />
      </div>
    </transition-group>
    <a class="prev gold-text-light" @click="prev" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
    </a>
    <a class="next gold-text-light" @click="next" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-right"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'Slider',
  data() {
    return {
      images: [
        './images/banner-1.jpg',
        './images/banner-2.jpg',
        './images/banner-3.jpg',
      ],
      timer: null,
      isTransitioning: false,
      currentIndex: 0,
    };
  },

  mounted() {
    this.startSlide();
  },

  methods: {
    startSlide() {
      this.timer = setInterval(this.next, 4000);
    },

    next() {
      if (!this.isTransitioning) {
        this.isTransitioning = true;
        this.currentIndex += 1;
        setTimeout(() => {
          this.isTransitioning = false;
        }, 1000);
      }
    },

    prev() {
      if (!this.isTransitioning) {
        this.isTransitioning = true;
        this.currentIndex -= 1;
        setTimeout(() => {
          this.isTransitioning = false;
        }, 1000);
      }
    },
  },

  computed: {
    currentImg() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
  },

  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.slider-container {
  position: relative;
  height: calc(100vw * 9 / 16);
  overflow: hidden;
}

.slide {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.7s ease;
  text-decoration: none;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.9);
}

.next {
  right: 0;
  border-radius: 4px 0 0 4px;
}

.prev {
  left: 0;
  border-radius: 0 4px 4px 0;
}
</style>

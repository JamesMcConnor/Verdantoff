<template>
  <div class="slider-container">
    <transition-group name="fade" tag="div">
      <div :key="currentIndex" class="slide">
        <img :src="currentImg" />
        <div class="slider-text">
          <p>
            Discover the freedom and flexibility of remote work with VerdantOff. Join a growing
            community of remote workers and experience the advantages of a flexible work schedule,
            increased productivity, and a better work-life balance. Remote work isn't just a trend; it's a
            sustainable choice that can positively impact our planet. Explore the possibilities of remote
            work and be part of a movement that's shaping the future of work.
          </p>
        </div>
      </div>
    </transition-group>
    <a class="prev" @click="prev" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
    </a>
    <a class="next" @click="next" href="#">
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
        './images/banner-4.jpg',
        './images/banner-5.jpg',
        './images/banner-6.jpg',
      ],
      timer: null,
      transitionTimeout: null,
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
      this.clearTimer();
      if (!this.isTransitioning) {
        this.isTransitioning = true;
        this.currentIndex += 1;
        this.clearTransitionTimeout();
        this.transitionTimeout = setTimeout(() => {
          this.isTransitioning = false;
        }, 500);
      }
    },

    prev() {
      this.clearTimer();
      if (!this.isTransitioning) {
        this.isTransitioning = true;
        this.currentIndex -= 1;
        this.clearTransitionTimeout();
        this.transitionTimeout = setTimeout(() => {
          this.isTransitioning = false;
        }, 500);
      }
    },

    clearTimer() {
      clearInterval(this.timer);
      this.startSlide();
    },

    clearTransitionTimeout() {
      clearTimeout(this.transitionTimeout);
      this.transitionTimeout = null;
    },
  },

  computed: {
    currentImg() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
  },

  beforeUnmount() {
    clearInterval(this.timer);
    this.clearTransitionTimeout();
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
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -60%);
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--font-color-gold-light);
  max-width: 80%;
}

.slider-text p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  text-align: center;
  font-weight: 500;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: auto;
  padding: 16px;
  font-weight: bold;
  font-size: 18px;
  transition: 0.5s ease;
  text-decoration: none;
  user-select: none;
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--font-color-gold-light);
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

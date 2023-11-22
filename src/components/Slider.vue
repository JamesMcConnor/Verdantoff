<template>
  <div class="slider-container">
    <transition-group name="fade" tag="div">
      <div :key="currentIndex" class="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div class="slider-text">
          <p class="large-font">{{ currentText }}</p>
        </div>
        <img :src="currentImg" />
      </div>
    </transition-group>
    <a class="prev" @click="navigate(-1)" href="#">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-chevron-left"
        viewBox="0 0 16 16">
        <path fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
      </svg>
    </a>
    <a class="next" @click="navigate(1)" href="#">
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
        './images/banner-7.jpg',
        './images/banner-8.jpg',
        './images/banner-9.jpg',
      ],
      sentences: [
        "Discover the freedom and flexibility of remote work with VerdantOff.",
        "Join a growing community of remote workers and experience the advantages of a flexible work schedule.",
        "Increased productivity and a better work-life balance await you.",
        "Remote work isn't just a trend; it's a sustainable choice that can positively impact our planet.",
        "Explore the possibilities of remote work and be part of a movement that's shaping the future of work.",
        "Why continue to operate service businesses like 19th-century factories, when 21st-century technology enables remote work and online collaboration?"
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
      this.timer = setInterval(this.next, 12000);
    },

    navigate(direction) {
      this.clearTimer();
      this.currentIndex += direction;
    },

    clearTimer() {
      clearInterval(this.timer);
      this.startSlide();
    },

    beforeEnter(el) {
      el.style.opacity = 0;
    },

    enter(el, done) {
      const delay = el.dataset.index * 100;
      setTimeout(() => {
        el.offsetHeight;
        el.style.transition = "opacity 0.5s ease";
        el.style.opacity = 1;
        done();
      }, delay);
    },

    leave(el, done) {
      el.style.transition = "opacity 0.5s ease";
      el.style.opacity = 0;
      done();
    },

    next() {
      if (!this.isTransitioning) {
        this.isTransitioning = true;
        this.currentIndex += 1;
        this.isTransitioning = false;
      }
    },
  },

  computed: {
    currentImg() {
      return this.images[Math.abs(this.currentIndex) % this.images.length];
    },
    currentText() {
      return this.sentences[Math.abs(this.currentIndex) % this.sentences.length];
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
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.5s ease, transform 1s cubic-bezier(0.47, 0, 0.745, 0.715);
  transform: translateX(0);
}

.slider-text {
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px;
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--font-color-gold-light);
  max-width: 80%;
  text-align: center;
  font-size: 2.4rem;
  font-weight: 700;
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 1s cubic-bezier(0.47, 0, 0.745, 0.715);
}

.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
}

@media (max-width: 768px) {
  .slider-text {
    font-size: .8rem;
    padding: 2px;
  }

  .prev,
  .next {
    padding: 2px;
    font-size: 10px;
  }

  .bi .bi-chevron-left,
  .bi-chevron-right {
    height: 25px;
  }
}
</style>

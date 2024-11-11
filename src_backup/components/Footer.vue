<template>
  <div class="pt-0">
    <footer v-if="!$route.meta.showNav" class="sticky-footer dark:bg-gray-900">
      <div class="container footer-container">
        <div class="footer-column">
          <ul>
            <li>
              <router-link key="about-link" to="/aboutus"
                class="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-600 gold-text">
                About Us
              </router-link>
            </li>
            <li v-if="isLoggedIn">
              <router-link key="mycontacts-link" to="/mycontacts"
                class="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-600 gold-text">
                My Contacts
              </router-link>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <ul>
            <li>
              <router-link to="/term" key="terms-link"
                class="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-600 gold-text">
                Terms and Conditions
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "footer",

  props: {
    isLoggedIn: Boolean,
  },
};
</script>

<style scoped>
@import url("https://cdn.tuk.dev/dist/css/tailwind-v2.2.11.min.css");

.footer-container {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}

@media (max-width: 768px) {
  .sticky-footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    background-color: var(--background-color);
    z-index: 1;
  }

  .footer-container {
    justify-content: space-between;
  }

  .footer-column {
    flex: 0 0 48%;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  .gold-text {
    color: var(--font-color-gold);
  }
}
</style>


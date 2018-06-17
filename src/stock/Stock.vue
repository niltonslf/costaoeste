<script>
import AppTitle from "../shared/title/Title.vue";
import _ from "lodash";

/*Components*/
import AppSidebar from "../shared/navbar/Navbar.vue";
import AppTopMenu from "../shared/menu/Menu.vue";
import AppButton from "../shared/button/Button.vue";

export default {
  props: {
  },

  components: {
    "app-button": AppButton,
    "app-title": AppTitle,
    "app-sidebar": AppSidebar,
    "app-top-menu": AppTopMenu,
  },

  data() {
    return {
      filterTerm: "",
    };
  },
};
</script>

<template>
  <div class="container">
    <app-sidebar></app-sidebar>
    <section class="content-main">
      <app-top-menu></app-top-menu>
      <app-title>{{this.$route.meta.title}}</app-title>
      <router-view></router-view>
    </section>
  </div>
</template>

  <style lang="sass" scoped>
    </style>

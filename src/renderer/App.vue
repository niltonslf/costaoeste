<template>
  <v-app id="inspire">
    <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue darken-3" dark app fixed>

    <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
      <v-btn icon @click="gotoPage('/')">
        <v-icon>home</v-icon>
      </v-btn>
      <span class="hidden-sm-and-down">Hotel Costa oeste</span>
    </v-toolbar-title>
    <v-text-field
    flat
    solo-inverted
    prepend-icon="search"
    label="Buscar"
    class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>

  <v-content>
    <v-container fluid >
      <!--  Load pages -->
      <router-view></router-view>
    </v-container>
  </v-content>
</v-app>
</template>

<script>
export default {
  data: () => ({
  }),
}
</script>

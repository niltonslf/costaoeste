<template>
  <v-app id="inspire">
    <v-navigation-drawer
    :mini-variant.sync="mini" v-model="drawer" stateless hide-overlay
    :clipped="$vuetify.breakpoint.lgAndUp"
    app
    >
    <v-toolbar flat class="transparent">
      <v-list class="pa-0">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/35.jpg" >
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title >Costa Oeste</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.native.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.text" @click="gotoPage(item.router)">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.text }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <v-toolbar
  :clipped-left="$vuetify.breakpoint.lgAndUp"
  color="blue darken-3" dark app fixed>

  <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
    <v-toolbar-side-icon @click.stop="mini = !mini"></v-toolbar-side-icon>
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
    // navigation bar
    drawer: true,
    mini: true,
    right: null,

    items: [
      { icon: 'home', text: 'Página inicial', router:'/' },
      { icon: 'room', text: 'Quartos', router:'rooms' },
    ]
  }),
  props: {
    source: String
  },
  methods:{
    gotoPage(routerName){
      this.$router.replace(routerName)
    }
  }
}
</script>

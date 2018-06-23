<template>
  <div id="app">
    <nav class="navbar navbar-dark fixed-top bg-panel flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Costa Oeste</a>
      <input class="form-control form-control-dark w-100" type="text" placeholder="Buscar" aria-label="Search">
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#">Sair</a>
        </li>
      </ul>
    </nav>

    <div class="container-fluid">
      <div class="row">
        <nav class="col-md-2 d-none d-md-block bg-light sidebar">
          <div class="sidebar-sticky">
            <ul class="nav flex-column">
              <li class="nav-item">
                <router-link :to="{ name: 'home'}" class="nav-link" >
                  <home-icon class="custom-class"></home-icon>
                  Dashboard
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'location'}" class="nav-link" >
                  <dollar-sign-icon class="custom-class"></dollar-sign-icon>
                  Locações
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'rooms'}" class="nav-link" >
                  <dollar-sign-icon class="custom-class"></dollar-sign-icon>
                  Quartos
                </router-link>
              </li>
              <li class="nav-item">
                <router-link :to="{ name: 'location'}" class="nav-link" >
                  <dollar-sign-icon class="custom-class"></dollar-sign-icon>
                  Histórico de locações
                </router-link>
              </li>
            </ul>

          </div>
        </nav>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">

          <div class="col-12">
            <div class="d-flex justify-content-between flex-wrap flex-md-wrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <h1 class="h2">Dashboard</h1>
              <div class="btn-toolbar mb-2 mb-md-0">
                <div class="btn-group mr-2">
                  <button class="btn btn-sm btn-outline-secondary">Share</button>
                  <button class="btn btn-sm btn-outline-secondary">Export</button>
                </div>
                <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
                  <span data-feather="calendar"></span>
                  This week
                </button>
              </div>
            </div>
          </div>

          <div class="col-12 main-content">
            <router-view></router-view>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import { DollarSignIcon,HomeIcon } from 'vue-feather-icons'

export default {
  components: {
    DollarSignIcon,
    HomeIcon
  },
  name: 'costaoeste',
}
</script>

<style>
body {
  font-size: .875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
* Sidebar
*/

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

.sidebar-sticky {
  background: #2e112d;
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  margin: 5px 10px;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: white;
}

.sidebar .nav-link.active {
  color: white;
  font-weight: bold;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
* Content
*/

[role="main"] {
  padding-top: 48px; /* Space for fixed navbar */
}

/*
* Navbar
*/

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.bg-panel{
  background-color: #5c0033;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}

/*
* Utilities
*/

.border-top { border-top: 1px solid #e5e5e5; }
.border-bottom { border-bottom: 1px solid #e5e5e5; }

/*
* Main content
*/
.main-content{
  flex: 1;
  width: 100%;
}
</style>

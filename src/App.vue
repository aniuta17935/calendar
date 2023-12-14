<template>
  <div id="app">
    <header>
      <figure>
        <img
          class="logo"
          src="./assets/images/logo.png" />
      </figure>
      <router-link
        to="/login"
        v-if="role === 'viewer'">
        <h3 class="last">Enter</h3>
      </router-link>
      <router-link
        to="/login"
        v-if="role !== 'viewer'">
        <h3
          class="last"
          v-on:click="handleLogout">
          Exit
        </h3>
      </router-link>
    </header>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      role: localStorage.getItem("role"),
    };
  },
  watch: {
    $route() {
      this.role = localStorage.getItem("role");
    },
  },
  mounted() {
    document.title = "Calendar";
    this.role = localStorage.getItem("role");
  },
  methods: {
    handleLogout() {
      localStorage.clear();
      localStorage.setItem("role", "viewer");
      this.$router.push("/login");
      this.role = "viewer";
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
#app,
input {
  font-family: "Gill Sans", serif;
}
.content {
  top: 70px;
  position: relative;
  padding-bottom: 30px;
  min-height: calc(100vh - 100px);
  background-color: #d4f3ff;
  overflow-x: hidden;
}
select {
  background-color: white;
}
header {
  position: fixed;
  z-index: 2;
  width: 100%;
  padding: 0 30px;
  height: 80px;
  background-color: #00273e;
  display: flex;
  flex-direction: row;
  justify-content: left;
}
header figure {
  height: 70px;
  margin: 5px 20px;
  padding: 0 30px;
  border-radius: 20px;
}
header figure .logo {
  height: 60px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
header a:last-of-type {
  margin-left: auto;
}
header a {
  text-decoration: none;
}
header h3 {
  margin: 0;
  color: white;
  padding-right: 30px;
  padding-left: 30px;
  line-height: 80px;
  transition: background-color 0.5s ease-out 50ms;
  max-width: fit-content;
}

header h3.last {
  padding-right: 60px;
  padding-left: 30px;
}

header h3:hover,
ul:hover {
  background-color: #004c79;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes disappear {
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}
</style>

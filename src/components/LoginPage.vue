<template>
  <div class="login">
    <form method="POST" v-on:submit="handleSubmitForm">
      <h2>Login</h2>
      <label>Email</label>
      <input type="text" v-model="email" />
      <label>Password</label>
      <input type="password" v-model="password" />
      <div class="error" v-if="error">
        {{ error }}
      </div>
      <input type="submit" value="Log In" />
      <h4>Not registered yet?</h4>
      <h4><u v-on:click="handleLinkClick">Register now!</u></h4>
    </form>
  </div>
</template>

<script>
import { INITIAL_USERS } from "../assets/users";

export default {
  name: "loginPage",
  data() {
    return {
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    handleSubmitForm(e) {
      e.preventDefault();
      if (this.email && this.password) {
        const user = INITIAL_USERS.find(
          (u) => u.email === this.email && u.password === this.password
        );
        if (!user) {
          this.error = "Введено неправильний логін або пароль.";
        } else {
          localStorage.setItem("role", user.id);
          this.$router.push({ path: "/" });
        }
      }
    },
    handleLinkClick() {
      this.$router.push({ path: "/registration" });
    },
  },
};
</script>

<style>
.login form {
  width: 400px;
  background-color: white;
  padding: 30px;
  margin: 10px;
  position: absolute;
  top: 20%;
  left: 50%;
  border-radius: 20px;
  transform: translateX(-50%);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
.login h2 {
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
}

.login label {
  font-size: 20px;
}

.login .error {
  color: red;
  font-size: 12px;
  margin-top: -15px;
}
.login input {
  width: 100%;
  border-radius: 6px;
  box-sizing: border-box;
}
.login input:not([type="submit"]) {
  border: 1px solid grey;
  padding: 3px;
  margin: 10px 0;
}
.login input:not([type="submit"]):focus {
  border: 2px solid #005f97;
  outline: none;
  background-clip: #d4f3ff;
}
.login input[type="password"] {
  margin-bottom: 20px;
}
.login input[type="submit"] {
  color: white;
  border: none;
  font-size: 20px;
  margin: 10px 0;
  width: 100%;
  height: 36px;
  display: inline-block;
  font-weight: bold;
  background-color: #00273e;
  border-radius: 10px;
  transition: color 0.5s ease-out 50ms, border 0.5s ease-out 50ms;
}
.login input[type="submit"]:hover {
  color: #d4f3ff;
  cursor: pointer;
}
.login h4 {
  margin: 0;
  padding: 5px 0;
  text-align: center;
}
.login u {
  color: #00273e;
}
.login u:hover {
  cursor: pointer;
}
</style>
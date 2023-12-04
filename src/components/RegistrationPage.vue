<template>
  <div class="registration-request">
    <form method="POST" v-on:submit="handleSubmitForm">
      <h2>Registration</h2>
      <div class="person-info">
        <label>Email</label>
        <input
          type="text"
          class="valid"
          ref="emailInput"
          v-model="email"
          v-on:focusout="handleFocusoutEmail"
        />
        <div
          class="error"
          v-if="checkEmail && validateInputEmail('Email', email, 'emailInput')"
        >
          {{ validateInputEmail("Email", email, "emailInput").message }}
        </div>
      </div>
      <label>Password</label>
      <input
        type="password"
        class="valid"
        ref="passwordInput"
        v-model="password"
        v-on:focusout="handleFocusoutPassword"
      />
      <label>Confirm Password</label>
      <input
        type="password"
        class="valid"
        ref="password2Input"
        v-model="password2"
        v-on:focusout="handleFocusoutPassword2"
      />
      <div class="error" v-if="checkPasswordMatch && !isPasswordMatchValid">
        {{ validateInputPasswordMatch() }}
      </div>
      <input type="submit" value="Register" />
    </form>
  </div>
</template>

<script>
import Validation from "./../assets/validation.js";
import { createUser } from "../assets/users";

export default {
  name: "RegistrationPage",
  data() {
    return {
      email: null,
      checkEmail: false,
      isEmailValid: false,
      error: "",
      role: null,
      isPasswordMatchValid: false,
      checkPasswordMatch: false,
    };
  },
  mounted() {
    this.role = localStorage.getItem("role");
  },
  methods: {
    validateInputEmail(field, name, elementName) {
      const message = Validation.validateEmail(
        field,
        name,
        this.$refs[elementName]
      );
      this.isEmailValid = message ? false : true;
      return message;
    },
    validateInputPasswordMatch() {
      const message = "Паролі не збігаються";
      return message;
    },
    handleSubmitForm(e) {
      e.preventDefault();
      this.checkEmail = true;
      this.checkPasswordMatch = true;

      if (this.isEmailValid) {
        createUser(this.email, this.password);
        this.$router.push("/login");
      }
    },
    handleFocusoutPassword2() {
      this.checkPasswordMatch = true;
      if (this.password !== this.password2) {
        this.isPasswordMatchValid = false;
      } else {
        this.isPasswordMatchValid = true;
      }
    },
  },
};
</script>

<style>
.registration-request h2 {
  margin: 0;
  padding-bottom: 20px;
  text-align: center;
}

.registration-request form {
  width: 500px;
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

.registration-request input[type="submit"] {
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
.registration-request input[type="submit"]:hover {
  color: #d4f3ff;
  cursor: pointer;
}

.registration-request .error {
  color: red;
  font-size: 12px;
  margin-top: -15px;
}
.registration-request .valid {
  border: 1px solid grey;
}
.registration-request .valid:focus {
  border: 2px solid #005f97;
}
.registration-request .invalid {
  border: 1px solid salmon;
}
.registration-request .invalid:focus {
  border: 2px solid red;
}
.registration-request input[type="text"],
.registration-request input[type="password"] {
  padding: 3px;
  box-sizing: border-box;
  border-radius: 5px;
}
.registration-request input[type="text"]:focus,
.registration-request input[type="password"] {
  outline: none;
  padding: 2px;
}
.registration-request input {
  margin-bottom: 15px;
  margin-top: 5px;
  width: 100%;
}

.registration-request label {
  font-size: 20px;
}
</style>
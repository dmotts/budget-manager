<template>
    <div class="l-auth-container">
        <div class="l-auth">
            <v-form v-model="validLogin">
                <v-text-field label="Username"
                              v-model="credentials.username"
                              prepend-icon="account_box"
                              :rules="rules"
                              required
                              color="light-blue lighten-1">
                </v-text-field>
                <v-text-field label="Password"
                              v-model="credentials.password"
                              prepend-icon="lock"
                              :rules="rules"
                              :append-icon="loginPasswordVisible ? 'visibility' : 'visibility_off'"
                              @click:append="() => (loginPasswordVisible = !loginPasswordVisible)"
                              :type="loginPasswordVisible ? 'text' : 'password'"
                              color="light-blue lighten-1"
                              required></v-text-field>
                <v-btn flat color="light-blue lighten-1" @click.native="signUpVisible = true">Create account</v-btn>
                <v-btn color="light-blue lighten-1" @click.native="submitAuthentication()">Login</v-btn>
            </v-form>
        </div>
        <div class="l-signup" v-if="signUpVisible">
            <v-form v-model="validSignUp">
                <v-text-field label="Username"
                              v-model="newUser.username"
                              prepend-icon="account_box"
                              :rules="rules"
                              required
                              color="light-blue lighten-1">
                </v-text-field>
                <v-text-field label="Password"
                              v-model="newUser.password"
                              prepend-icon="lock"
                              :rules="rules"
                              :append-icon="signUpPasswordVisiblity ? 'visibility' : 'visibility_off' "
                              @click:append="() => (signUpPasswordVisiblity = !signUpPasswordVisiblity)"
                              :type="signUpPasswordVisiblity ? 'text' : 'password'"
                              color="light-blue lighten-1"
                              required>
                </v-text-field>
                <v-btn block color="light-blue lighten-1" @click.native="submitSignUp()">Sign Up</v-btn>
            </v-form>
        </div>
        <v-snackbar :timeout="timeout"
                    bottom="bottom"
                    color="red lighten-1"
                    v-model="snackbar">
            {{ message }}
        </v-snackbar>
    </div>
</template>

<script>
import Authentication from '@/components/pages/Authentication'
export default {
  data () {
    return {
      timeout: 6000,
      snackbar: false,
      validLogin: false,
      validSignUp: false,
      signUpVisible: false,
      loginPasswordVisible: false,
      signUpPasswordVisiblity: false,
      rules: [ (value) => !!value || 'This field is required' ],
      credentials: {
        username: '',
        password: ''
      },
      newUser: {
        username: '',
        password: ''
      },
      message: ''
    }
  },
  methods: {
    submitAuthentication () {
      Authentication.authenticate(this, this.credentials, '/')
    },
    submitSignUp () {
      Authentication.signup(this, this.newUser, '/')
    }
  }
} /* eslint-disable */
</script>

<style lang="scss">
  @import "./../../../assets/styles";
  
  .l-auth {
    background-color: $background-color;
    padding: 15px;
    margin: 45px auto;
    min-width: 272px;
    max-width: 320px;
    animation: bounceIn 1s forwards ease;
    label, input, .icon {
      color: #29bff6!important;
    }
    .input-group__details {
      &:before {
        background-color: $border-color-input !important;
      }
    }
  }
  
  .l-signup {
    @extend .l-auth;
    animation: slideInFromLeft 1s forwards ease;
  }
</style>
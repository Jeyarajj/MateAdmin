<template>
  <v-img :src="backgroundImg" class="page-vimg">
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-white-500-glow elevation-10 auth-box"
          >
            <v-alert :value="showSuccess" type="success">{{successMessage}}</v-alert>
             <v-alert :value="showError" type="error">{{errormessage}}</v-alert>
            <v-layout align-center justify-center row fill-height wrap>
              <v-flex xs12 class="text-xs-center mt-3">
                <img
                  src="../../../assets/mate_logo.png"
                  alt="`Mate`"
                  class="text-xs-center"
                  height="100"
                >
                <div class="headline">Forgot your password? No problem</div>
                <v-form
                  @submit.prevent="$v.$invalid ? null : sendForgotPasswordEmail(form.email)"
                  ref="form"
                >
                  <v-layout wrap row pa-4>
                    <v-flex xs12 pa-0>
                      <v-text-field
                        color="primary"
                        label="Email ID"
                        v-model="form.email"
                        required
                        :error-messages="fieldErrors('form.email')"
                        @blur="$v.form.email.$touch()"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12>
                      <v-layout row wrap text-xs-center>
                        <!-- ForgotPassword form submit -->
                        <v-flex xs12 class="no-mrpd">
                          <v-btn
                            color="act"
                            type="submit"
                            :disabled="$v.$invalid"
                            block
                            :class="$v.$invalid ? '' : 'white--text'"
                          >SEND EMAIL</v-btn>
                        </v-flex>
                        <!-- Back to login -->
                        <v-flex xs12>
                          <router-link
                            :to="{ name: 'LoginPage' }"
                            tag="div"
                            class="grey--text cursor-pointer"
                          >
                            <strong>Go Back to Login ?</strong>
                          </router-link>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-form>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import validationMixin from "@/mixins/validationMixin";
import { mapActions, mapGetters } from "vuex";

const defaultForm = {
  email: ""
};
export default {
  mixins: [validationMixin],
  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },
  validationMessages: {
    form: {
      email: {
        required: "Please enter your registered email ID",
        email: "Email must be valid"
      }
    }
  },
  data() {
    return {
      form: Object.assign({}, defaultForm),
      backgroundImg: require('@/assets/HexesisMaterial01.png'),
      //backgroundImg: "",
      showSuccess: false,
      showError:false,
      successMessage: null,
      errormessage:null
    };
  },
  components: {},
  computed: {
    ...mapGetters(["wasEmailSend", "authWarningMsg", "isAuthenticated"])
  },
  watch: {
    isAuthenticated(value) {
      if (value) {
        this.$router.push("/dashboard");
      }
    },
    wasEmailSend(value) {
      if (value) {
        this.showSuccess = true;
        this.successMessage = "Email Send Successfully.Please check your Email";
      }
    },
    authWarningMsg(value) {
      if (value) {
        this.showError = true;
        this.errormessage = value;
      } else {
        this.showError = false;
      }
    }
  },
  methods: {
    ...mapActions({
      sendForgotPasswordEmail: "sendForgotPasswordEmail"
    })
  }
};
</script>

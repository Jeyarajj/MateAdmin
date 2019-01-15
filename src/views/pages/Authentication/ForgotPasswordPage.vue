<template>
  <v-img
    :src="backgroundImg"
    class="page-vimg"
  >
    <v-container fill-height pa-0>
      <v-layout align-center>
        <v-flex xs12>
          <v-card
            class="text-xs-center margin-auto border-radius6 box-white-500-glow elevation-10 auth-box"
          >
            <v-layout align-center justify-center row fill-height wrap>
              <v-flex xs12 class="text-xs-center mt-3">
                <v-toolbar absolute dense flat class="transparent pos-top-1px">
                  <v-toolbar-title class="body-2 grey--text cursor-pointer"
                    @click="stageHandler" v-if="stage !== 1">Back</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon :to="{ name: 'pages/authentication/LoginPage' }">
                    <v-icon>close</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-stepper v-model="stage" class="no-box-shadow reset-top-padding border-radius6">
                  <v-stepper-header class="hide">
                    <v-stepper-step step="1" :complete="stage > 1">Name of step 1</v-stepper-step>
                    <v-stepper-step step="2" :complete="stage > 2">Name of step 2</v-stepper-step>
                    <v-stepper-step step="3">Name of step 3</v-stepper-step>
                  </v-stepper-header>

                  <v-stepper-content step="1" class="px-0">
                    <send-passcode @next="sendPasscodeSuccessHandler"></send-passcode>
                  </v-stepper-content>

                  <v-stepper-content step="2" class="px-0">
                    <verify-passcode @next="verifyPasscodeSuccessHandler" :email="email"></verify-passcode>
                  </v-stepper-content>

                  <v-stepper-content step="3" class="px-0">
                    <password-reset @next="resetPasswordSuccessHandler" :code="code" :email="email"></password-reset>
                  </v-stepper-content>
                </v-stepper>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-snackbar
      v-model="snackbar"
      absolute
      top
      right
      color="act"
    >
      <span>Password reset successfully</span>
      <v-icon dark>check_circle</v-icon>
    </v-snackbar>
  </v-img>
</template>

<script>
  // import SendPasscode from '@/views/Pages/Authentication/ForgotPasswordWizard/SendPasscode'
  // import PasswordReset from '@/views/Pages/Authentication/ForgotPasswordWizard/PasswordReset'
  // import VerifyPasscode from '@/views/Pages/Authentication/ForgotPasswordWizard/VerifyPasscode'

  // export default {
  //   components: {
  //     SendPasscode,
  //     VerifyPasscode,
  //     PasswordReset
  //   },
  //   data () {
  //     return {
  //       snackbar: false,
  //       stage: 1,
  //       email: null,
  //       code: null,
  //       backgroundImg: '/static/doc-images/HexesisMaterial01.png'
  //     }
  //   },
  //   methods: {
  //     stageHandler () {
  //       if (this.stage > 1) {
  //         this.stage -= 1
  //       }
  //     },
  //     sendPasscodeSuccessHandler (data) {
  //       this.email = data.email
  //       this.stage = 2
  //     },
  //     verifyPasscodeSuccessHandler (data) {
  //       this.code = data.code
  //       this.stage = 3
  //     },
  //     resetPasswordSuccessHandler () {
  //       this.snackbar = true
  //     }
  //   }
  // }
</script>

<template>
<div>
  
  <v-card>
    <v-card-title>
      
    <v-tooltip right>
    <v-btn slot="activator"
        color="primary"
        dark fab @click="contactDialog = !contactDialog">
      <v-icon dark>person_add</v-icon>
    </v-btn>
    <span>ADD USER</span>
    </v-tooltip>

    <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.calories }}</td>
        <td class="text-xs-right">{{ props.item.fat }}</td>
        <td class="text-xs-right">
          <v-flex xs12 sm3>
            <v-btn @click="profileDialog = true"  flat icon color="primary">
              <v-icon>remove_red_eye</v-icon>
            </v-btn>
          </v-flex>
        </td>
      </template>
      <v-alert slot="no-results" :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
  </v-card>

  <!-- Create Contact Modal -->
      <v-dialog v-model="contactDialog" scrollable persistent max-width="480px">
        <v-card class="create-dialog-card">
          <v-card-title>
            <v-layout>
              <v-flex row xs6>
                <span class="white--text">New User</span>
              </v-flex>
              <v-flex row xs6 text-xs-right>
                <v-btn flat icon class="fx-close-model-btn" @click="contactDialog = false">
                  <v-icon color="white">close</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-img height="70px" class="primary">
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex
                  xs12
                  text-xs-center
                  layout
                  align-center
                  justify-center
                >
                  <!-- <v-avatar
                    size="125px"
                    class="grey lighten-4"
                  > 
                    
                  </v-avatar>-->

                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                  <v-flex xs12
                  text-xs-center
                  layout
                  align-center
                  justify-center id="avatarpreview"
                  >
                      <AvatarUpload />
                  </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :error-messages="fieldErrors('form.first')"
                    @input="$v.form.first.$touch()"
                    @blur="$v.form.first.$touch()"
                    prepend-icon="person"
                    label="Name *"
                    v-model="form.first"
                    required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :error-messages="fieldErrors('form.phone')"
                    @input="$v.form.phone.$touch()"
                    @blur="$v.form.phone.$touch()"
                    prepend-icon="phone"
                    label="Phone *"
                    v-model="form.phone"
                    mask="+#### #### #######"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    :error-messages="fieldErrors('form.email')"
                    @input="$v.form.email.$touch()"
                    @blur="$v.form.email.$touch()"
                    prepend-icon="email"
                    v-model="form.email"
                    label="Email *"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="location_on"
                    label="Country"
                    v-model="form.country"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    prepend-icon="location_city"
                    label="City"
                    v-model="form.city"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-menu
                    ref="datepicker"
                    :close-on-content-click="false"
                    v-model="datepicker"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                  >
                    <v-text-field
                      slot="activator"
                      v-model="form.formatedBirthday"
                      label="Date of Birth"
                      hint="MM/DD/YYYY format"
                      persistent-hint
                      prepend-icon="cake"
                      @blur="form.birthdate = parseDate(form.formatedBirthday)"
                    ></v-text-field>
                    <v-date-picker v-model="form.birthdate" no-title @input="datepicker = false"></v-date-picker>
                  </v-menu>
                </v-flex>
                
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="white--text" color="menuhover" @click.native="resetContactForm()">Close</v-btn>
            <v-btn class="white--text" color="act" @click.native="updateContact()" :disabled="$v.form.$invalid" v-if="isEditformMod">Edit</v-btn>
            <v-btn class="white--text" color="act" @click.native="createNewContact()" :disabled="$v.form.$invalid" v-else>Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- Profile view -->
      <v-dialog
      v-model="profileDialog"
      max-width="300"
    >
      <v-card>
        <v-card-title class="headline">Profile Details</v-card-title>

        <v-card>
          
          <v-flex xs12
                  text-xs-center
                  layout
                  align-center
                  justify-center
                  >
        <v-avatar size="150">
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="User"
      >
    </v-avatar>
          </v-flex>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0" text-xs-center>John Doe</h3>
            
            <v-list justify-center sm12>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>phone</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title >(650) 555-1234</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>mail</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>mcbeal@example.com</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>cake</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>1st Jan 1990</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>location_on</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Orlando</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile>
            <v-list-tile-action>
              <v-icon>location_city</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Florida 79938</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

          </div>
        </v-card-title>

      </v-card>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="primary"  @click="profileDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</div>
</template>
  
<script>
  import { rgba as Gradients } from '@/data/gradients'
  import { filter, findIndex } from 'lodash'
  import { required, maxLength, minLength, email } from 'vuelidate/lib/validators'
  import { validNumber } from '@/utils/validators'
  import validationMixin from '@/mixins/validationMixin'
  import {defaultUserPic, users, authUser} from '@/data/dummyData'

  import AvatarUpload from "@/components/PreviewUpload/AvatarUpload.vue";

  export default {
    mixins: [validationMixin],
    name: "avatarpreview",
    components: {
    AvatarUpload
  },
    validations: {
      form: {
        first: { required },
        email: { email },
        phone: {
          required,
          validNumber,
          maxLength: maxLength(15),
          minLength: minLength(7)
        }
      }
    },
    validationMessages: {
      form: {
        first: { required: 'First name is required' },
        email: {
          email: 'Email must be valid'
        },
        phone: {
          maxLength: 'Max 14 digits',
          minLength: 'Min 7 digits',
          validNumber: 'Phone number must be a valid number'
        }
      }
    },
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Email ID', value: 'calories' },
          { text: 'Country', value: 'fat' },
          { text: 'Actions', value: 'iron' }
        ],
        desserts: [
          {
            value: false,
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            value: false,
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            value: false,
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            value: false,
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            value: false,
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            value: false,
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            value: false,
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            value: false,
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ],
        title: 'Contacts',
        date: null,
        dateFormatted: null,
        gradient: Gradients[9],
        backgroundImg: '/static/doc-images/vbanner.jpg',
        form: {
          first: '',
          last: '',
          nickname: '',
          phone: '',
          email: '',
          company: '',
          avatar: defaultUserPic,
          job: '',
          birthdate: '',
          formatedBirthday: '',
          address: '',
          notes: null,
          is_favourite: false,
          is_frequent: false,
          selected: false
        },
        drawerinternal: true,
        activeMenu: 'all',
        menuItems: [
          { title: 'All Contacts', isActive: true, slug: 'all' },
          { title: 'Frequently Contacted', isActive: false, slug: 'frequent' },
          { title: 'Favourite Contacts', isActive: false, slug: 'favourite' }
        ],
        authUser,
        contacts: [
          {
            first: users[1].firstname,
            last: users[1].lastname,
            nickname: null,
            email: users[1].email,
            avatar: users[1].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: false,
            is_frequent: false,
            selected: false
          },
          {
            first: users[2].firstname,
            last: users[2].lastname,
            nickname: null,
            email: users[2].email,
            avatar: users[2].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: true,
            is_frequent: false,
            selected: false
          },
          {
            first: users[3].firstname,
            last: users[3].lastname,
            nickname: null,
            email: users[3].email,
            avatar: users[3].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: true,
            is_frequent: true,
            selected: false
          },
          {
            first: users[4].firstname,
            last: users[4].lastname,
            nickname: null,
            email: users[4].email,
            avatar: users[4].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: true,
            is_frequent: true,
            selected: false
          },
          {
            first: users[5].firstname,
            last: users[5].lastname,
            nickname: null,
            email: users[5].email,
            avatar: users[5].avatar,
            phone: '+1202-555-0135',
            company: null,
            job: null,
            birthdate: null,
            address: null,
            notes: null,
            is_favourite: true,
            is_frequent: true,
            selected: false
          }
        ],
        confirmBox: {
          deleteContact: false,
          item: null
        },
        contactDialog: false,
        profileDialog: false,
        isEditformMod: false,
        editIndex: null,
        datepicker: false
      }
    },
    methods: {
      selectAll () {
        if (this.unselectedContacts) {
          this.unselectedContacts.forEach((element) => {
            element.selected = true
          })
        }
      },
      unselectAll () {
        if (this.selectedContacts) {
          this.selectedContacts.forEach((element) => {
            element.selected = false
          })
        }
      },
      toggleFavourite (item) {
        item.is_favourite = !item.is_favourite
      },
      remove () {
        let index = this.contacts.indexOf(this.confirmBox.item)
        this.contacts.splice(index, 1)
        this.resetDialog()
      },
      resetDialog () {
        this.confirmBox = {
          deleteContact: false,
          item: null
        }
      },
      deleteContactDialogHandler (item) {
        this.confirmBox = {
          deleteContact: true,
          item
        }
      },
      formatDate (date) {
        if (!date) {
          return null
        }

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) {
          return null
        }

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      resetContactForm () {
        this.form = {
          first: '',
          phone: '',
          email: '',
          country: '',
          avatar: '/static/default/user.svg',
          city: '',
          birthdate: '',
          formatedBirthday: '',
          notes: null,
          is_favourite: false,
          is_frequent: false,
          selected: false
        }
        this.contactDialog = false
        this.isEditformMod = false
        this.editIndex = null
      },
      editContact (contact) {
        this.form = contact
        this.isEditformMod = true
        this.contactDialog = true
        this.editIndex = findIndex(this.contacts, contact => contact === this.form)
      },
      createNewContact () {
        this.isEditformMod = false
        this.contacts.push(this.form)
        this.resetContactForm()
      },
      updateContact () {
        const index = this.editIndex
        this.contacts[index] = this.form
        this.resetContactForm()
      }
    },
    computed: {
      frequentlyContacted () {
        return filter(this.contacts, (element) => element.is_frequent)
      },
      favouriteContacts () {
        return filter(this.contacts, (element) => element.is_favourite)
      },
      selectedContacts () {
        return filter(this.contacts, (element) => element.selected)
      },
      unselectedContacts () {
        return filter(this.contacts, (element) => !element.selected)
      },
      listContact () {
        let list = this.contacts
        switch (this.activeMenu) {
          case 'frequent':
            list = this.frequentlyContacted
            break

          case 'favourite':
            list = this.favouriteContacts
            break

          default:
            if (this.search) {
              // list = filter(this.contacts, (element) => element.first === this.search || element.last === this.search || element.email === this.search || element.phone === this.search)
              list = this.contacts.filter(contact => {
                return contact.first.toLowerCase().includes(this.search.toLowerCase()) ||
                contact.last.toLowerCase().includes(this.search.toLowerCase()) ||
                contact.email.toLowerCase().includes(this.search.toLowerCase()) ||
                contact.phone.toLowerCase().includes(this.search.toLowerCase())
              })
            } else {
              list = this.contacts
            }
            break
        }
        return list
      },
      showBulkActionOptions () {
        return this.selectedContacts && this.selectedContacts.length > 0
      }
    },
    watch: {
      'form.birthdate' (val) {
        this.form.formatedBirthday = this.formatDate(this.form.birthdate)
      },
      contactDialog (from, to) {
        if (to) {
          this.resetContactForm()
        }
      }
    }
  }
</script>

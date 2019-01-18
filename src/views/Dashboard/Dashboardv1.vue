<template>
  <div>
    <v-container fluid grid-list-xl>
      <!-- Visitors & Page views -->
      <v-layout row wrap>
        <v-flex xs12 md8>
          <v-card>
            <v-toolbar color="transparent" flat>
              <v-toolbar-title>Visitors & Page views</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <!-- <v-card-title primary-title class="title my-0">Visitors & Page views</v-card-title> -->
            <v-card-text>
              <line-chart
                :data="visitorsPageViews.data"
                :options="visitorsPageViews.option"
                :height="300"
              ></line-chart>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md4>
          <v-card>
            <v-toolbar color="transparent" flat>
              <v-toolbar-title>Current Balance</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_horiz</v-icon>
              </v-btn>
            </v-toolbar>
            <!-- <v-card-title primary-title class="title my-0">Visitors & Page views</v-card-title> -->
            <v-card-text class="text-xs-center">
              <v-progress-circular
                :rotate="-90"
                :value="70"
                :size="240"
                :width="15"
                color="primary"
              >
                <span class="grey--text">Next Bill</span><br>
                <strong>06.12.2019</strong>
              </v-progress-circular>
              <div class="title my-2">$ 40,88,950.00</div>
              <span class="subheading grey--text">This billing cycle</span>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid grid-list-xl>
      <!-- Revenue Section -->
      <v-layout row wrap>
        <v-flex xs12>
          <v-card flat>
            <v-container fill-height fluid grid-list-lg pa-0>
              <v-layout row wrap>
                <template v-for="(dataItem, index) in revenueTrend.data">
                  <v-flex xs12 sm6 md3 :key="index">
                    <v-card flat class="transparent text-xs-center box-glow pa-2" dark>
                      <v-card-title class="pa-0">
                        <component
                          :is="dataItem.type"
                          :data="dataItem.chartData"
                          :gradient="dataItem.trendGradient"
                          auto-draw
                          smooth>
                        </component>
                      </v-card-title>
                      <v-card-text class="pa-0">
                        <h3 class="headline">{{ dataItem.statistic }}</h3>
                        <p>{{ dataItem.title }}</p>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </template>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md3>
          <mini-chart
            class="box-white-500-glow"
            type="bar-chart"
            title="Visits"
            sub-title="to target"
            icon="trending_down"
            icon-color="error"
            subtitle-large="840"
            pre-subtitle="-8%"
            :data="barChartData.dashboardVisits.data"
            :option="barChartData.dashboardVisits.option"
          ></mini-chart>
        </v-flex>
        <!-- Impression -->
        <v-flex xs12 sm6 md3>
          <mini-chart
            class="box-white-500-glow"
            type="line-chart"
            title="Impressions"
            sub-title="to target"
            icon="trending_up"
            icon-color="success"
            subtitle-large="78k"
            pre-subtitle="18%"
            :data="lineChartData.dashboardImpressions.data"
            :option="lineChartData.dashboardImpressions.option"
          ></mini-chart>
        </v-flex>

        <!-- Conversation -->
        <v-flex xs12 sm6 md3>
          <mini-chart
            class="box-white-500-glow"
            type="bar-chart"
            title="Conversation"
            sub-title="to target"
            icon="trending_up"
            icon-color="success"
            subtitle-large="488"
            pre-subtitle="12%"
            :data="barChartData.dashboardConversation.data"
            :option="barChartData.dashboardConversation.option"
          ></mini-chart>
        </v-flex>

        <!-- Downloads -->
        <v-flex xs12 sm6 md3>
          <mini-chart
            class="box-white-500-glow"
            type="line-chart"
            title="Downloads"
            sub-title="to target"
            icon="trending_up"
            icon-color="success"
            subtitle-large="45K"
            pre-subtitle="28%"
            :data="lineChartData.dashboardDownloads.data"
            :option="lineChartData.dashboardDownloads.option"
          ></mini-chart>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <!-- Application Request -->
        <v-flex xs12 md5>
          <v-card>
            <v-card-title primary-title class="title my-0">Application Request</v-card-title>
            <v-list two-line subheader>
              <template v-for="(request, index) in applicationRequest">
                <v-subheader v-if="request.subheader" v-text="request.subheader" :key="request.header"></v-subheader>
                <v-list-tile avatar v-else :key="index">
                  <v-list-tile-avatar >
                    <img :src="request.avatar" v-if="request.avatar">
                    <span class="span-text-avatar-40 white--text" :class="request.avatarColor" v-else>{{ request.name | firstChar }}{{ request.lastname | firstChar }}</span>
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>{{ request.name }}</v-list-tile-title>
                    <v-list-tile-sub-title>
                      <v-icon v-text="request.type.icon" :color="request.type.color"></v-icon> <span :class="`${request.type.color}--text`">{{ request.type.name }}</span>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    {{request.time}}
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-card>
        </v-flex>
        <!-- Marketing Campaign -->
        <v-flex xs12 md7>
          <v-card>
            <v-card-title primary-title class="title my-0">Marketing Campaign</v-card-title>
            <v-data-table
              :headers="marketingCampaign.headers"
              :items="marketingCampaign.dataSet"
              hide-actions
              class="elevation-1 vuse-datatable flat-hover no-box-shadow"
            >
              <template slot="items" slot-scope="props">
                <td>
                  <v-list two-line>
                    <v-list-tile inactive>
                      <v-list-tile-avatar>
                        <v-avatar :color="props.item.name.avatarColor">
                          <v-icon :color="props.item.name.iconColor" v-text="props.item.name.icon"></v-icon>
                        </v-avatar>
                      </v-list-tile-avatar>
                      <v-list-tile-content>
                        <v-list-tile-title v-html="props.item.name.text"></v-list-tile-title>
                        <v-list-tile-sub-title v-html="props.item.name.duration"></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </td>
                <td class="text-xs-left subheading">{{ props.item.client }}</td>
                <td class="text-xs-left" :class="props.item.changes.classname">
                  <v-icon v-text="props.item.changes.icon" :color="props.item.changes.iconColor"></v-icon> {{props.item.changes.text}}
                </td>
                <td class="text-xs-left"><strong>{{ props.item.budget }}</strong></td>
                <td class="text-xs-left" :class="props.item.status.classname">{{ props.item.status.text }}</td>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>

      <!-- Profile and linear statistic -->
      <v-layout row wrap>
        <v-flex lg4 sm12 xs12>
          <!-- <profile-card
            :name="authUser.name"
            :avatar="authUser.avatar"
            :mobiles="[{number: '(650) 555-2468', type: 'home'}, {number: '(323) 888-8642', type: 'Work'}]"
            :emails="[{name: 'mia@example.com', type: 'home'}, {name: 'jack@example.com', type: 'Work'}]"
            :address="{line1: '1400, Main Steet', line2: 'Los Angelas, LA 89987'}"
          ></profile-card> -->
        </v-flex>
        <v-flex lg8 sm12 xs12>
          <v-layout row wrap>
            <v-flex lg6 md6 sm12 xs12>
              <!-- <linear-statistic
                title="Sales"
                sub-title="Sales increase"
                icon="trending_up"
                color="primary"
                :value="15"
              >
              </linear-statistic> -->
            </v-flex>
            <v-flex lg6 md6 sm12 xs12>
              <!-- <linear-statistic
                title="Orders"
                sub-title="Increase"
                icon="trending_up"
                color="warning"
                :value="30"
              >
              </linear-statistic> -->
            </v-flex>
            <v-flex lg6 md6 sm12 xs12>
              <!-- <linear-statistic
                title="Revenue"
                sub-title="Revenue increase"
                icon="trending_up"
                color="secondary"
                :value="50"
              >
              </linear-statistic> -->
            </v-flex>
            <v-flex lg6 md6 sm12 xs12>
              <!-- <linear-statistic
                title="Cost"
                sub-title="Cost reduce"
                icon="trending_down"
                color="purple"
                :value="25"
              >
              </linear-statistic> -->
            </v-flex>
            <v-flex sm12 xs12>
              <!-- <plain-table-order></plain-table-order> -->
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  // Dummay Data
  import { users, authUser } from '@/data/dummyData'
  import { lineChartJs as lineChartData, barChartJs as barChartData } from '@/data/ChartWidget'
  // Components
  import MiniChart from '@/components/Widgets/Chart/MiniChart'
  import LineChart from '@/components/ChartJs/LineChart'
  // import ProfileCard from '@/components/widgets/card/ProfileCard'
  // import LinearStatistic from '@/components/widgets/statistic/LinearStatistic'
 // import PlainTableOrder from '@/components/widgets/list/PlainTableOrder'

  export default {
    components: {
      LineChart,
      MiniChart
    //  ProfileCard,
     // LinearStatistic,
   //   PlainTableOrder
    },
    data () {
      return {
        title: 'Dashboard',
        icon: 'dashboard',
        // tabs: ['Visibility'],
        breadcrumbs: [
          {
            text: 'Home',
            disabled: false,
            href: 'home'
          },
          {
            text: 'Dashboard',
            disabled: true
          }
        ],
        authUser,
        users,
        visitorsPageViews: {
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
              {
                label: 'Visitors',
                fill: false,
                data: [410, 380, 800, 789, 450, 550, 187, 470, 234, 984, 1024, 890],
                borderColor: this.$vuetify.theme.primary,
                pointBorderColor: this.$vuetify.theme.primary,
                pointBackgroundColor: this.$vuetify.theme.primary,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(98, 0, 234, 0.5)',
                pointRadius: 4,
                pointBevelWidth: 3,
                pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
                pointBevelShadowColor: 'rgba(98, 0, 234, 0.5)',
                pointHoverRadius: 6,
                pointHoverBevelWidth: 4.5,
                pointHoverInnerGlowWidth: 20,
                pointHoverInnerGlowColor: `rgba(98, 0, 234, 0.5)`,
                pointHoverOuterGlowWidth: 20,
                pointHoverOuterGlowColor: this.$vuetify.theme.secondary,
                tension: 0.15
              },
              {
                label: 'Page Views',
                fill: false,
                data: [410, 380, 800, 789, 450, 550, 187, 470, 234, 984, 1024, 890].map((i) => i * 3),
                borderColor: this.$vuetify.theme.secondary,
                pointBorderColor: this.$vuetify.theme.secondary,
                pointBackgroundColor: this.$vuetify.theme.secondary,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 10,
                shadowColor: 'rgba(233, 30, 99, 0.5)',
                pointRadius: 4,
                pointBevelWidth: 3,
                pointBevelHighlightColor: 'rgba(255, 255, 255, 0.75)',
                pointBevelShadowColor: 'rgba(233, 30, 99, 0.5)',
                pointHoverRadius: 6,
                pointHoverBevelWidth: 4.5,
                pointHoverInnerGlowWidth: 20,
                pointHoverInnerGlowColor: `rgba(233, 30, 99, 0.5)`,
                pointHoverOuterGlowWidth: 20,
                pointHoverOuterGlowColor: this.$vuetify.theme.primary,
                tension: 0.15
              }
            ]
          },
          option: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              mode: 'index',
              intersect: false
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            legend: {
              display: false
            },
            spanGaps: true,
            scales: {
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: 'Month'
                }
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: 'Value'
                }
              }]
            }
          },
          gradient: true,
          gradientSet: ['#80b6f4', '#f49080']
        },
        revenueTrend: {
          jumbotron: 'to right top, #241d3b, #473974',
          data: [
            {
              type: 'bars',
              title: 'Total Earnings',
              statistic: '$ 8610',
              chartData: [4, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
              trendGradient: ['#2193b0', '#6dd5ed']
            },
            {
              type: 'bars',
              title: 'Envato Incomes',
              statistic: '$ 5800',
              chartData: [4, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
              trendGradient: ['#FF8008', '#FFC837']
            },
            {
              type: 'bars',
              title: 'Customization Revenue',
              statistic: '$ 1790',
              chartData: [8, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
              trendGradient: ['#16A085', '#F4D03F']
              // trendGradient: ['#EDE574', '#E1F5C4']
            },
            {
              type: 'bars',
              title: 'Marketing Expenses',
              statistic: '$ 510',
              chartData: [6, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 10],
              trendGradient: ['#ec008c', '#fc6767']
            }
          ]
        },
        marketingCampaign: {
          headers: [
            {
              text: 'Campaign',
              align: 'left',
              sortable: false,
              value: 'name'
            },
            { text: 'Client', value: 'client', sortable: false },
            { text: 'Changes', value: 'changes', sortable: false },
            { text: 'Budget ($)', value: 'budget' },
            { text: 'Status', value: 'status', sortable: false }
          ],
          dataSet: [
            {
              value: false,
              name: {
                icon: 'fab fa-facebook-f',
                avatarColor: 'indigo darken-3',
                iconColor: 'white',
                text: 'Facebook',
                duration: '02:00 - 03:00'
              },
              client: 'Matthew Melifont',
              changes: {
                icon: 'trending_up',
                iconColor: 'green',
                classname: 'green--text',
                text: '2.22%'
              },
              budget: '$2420',
              status: {
                classname: 'green--text',
                text: 'Active'
              }
            },
            {
              value: false,
              name: {
                icon: 'fab fa-twitter',
                avatarColor: 'blue',
                iconColor: 'white',
                text: 'Twitter',
                duration: '03:00 - 04:00'
              },
              client: 'Sarah Willson',
              changes: {
                icon: 'trending_flat',
                iconColor: 'blue',
                classname: 'blue--text',
                text: '8.22%'
              },
              budget: '$4808',
              status: {
                classname: 'grey--text text-darken-3',
                text: 'Hold'
              }
            },
            {
              value: false,
              name: {
                icon: 'fab fa-dribbble',
                avatarColor: 'amber',
                iconColor: 'white',
                text: 'Dribbble',
                duration: '04:00 - 05:00'
              },
              client: 'Kelly',
              changes: {
                icon: 'trending_up',
                iconColor: 'green',
                classname: 'green--text',
                text: '9.33%'
              },
              budget: '$7520',
              status: {
                classname: 'green--text',
                text: 'Active'
              }
            },
            {
              value: false,
              name: {
                icon: 'fab fa-youtube',
                avatarColor: 'red darken-3',
                iconColor: 'white',
                text: 'Youtube',
                duration: '05:00 - 06:00'
              },
              client: 'Samantana Cruiz',
              changes: {
                icon: 'trending_down',
                iconColor: 'red',
                classname: 'red--text',
                text: '1.22%'
              },
              budget: '$1120',
              status: {
                classname: 'red--text',
                text: 'Closed'
              }
            },
            {
              value: false,
              name: {
                icon: 'fab fa-spotify',
                avatarColor: 'red',
                iconColor: 'white',
                text: 'Spotify',
                duration: '06:00 - 07:00'
              },
              client: 'Jemmy Desuza',
              changes: {
                icon: 'trending_up',
                iconColor: 'green',
                classname: 'green--text',
                text: '8.72%'
              },
              budget: '$3280',
              status: {
                classname: 'green--text',
                text: 'Active'
              }
            },
            {
              value: false,
              name: {
                icon: 'fab fa-amazon',
                avatarColor: 'black',
                iconColor: 'white',
                text: 'Spotify',
                duration: '06:00 - 07:00'
              },
              client: 'Arash Tim',
              changes: {
                icon: 'trending_flat',
                iconColor: 'amber',
                classname: 'amber--text',
                text: '4.20%'
              },
              budget: '$1653',
              status: {
                classname: 'amber--text',
                text: 'Pending'
              }
            }
          ]
        },
        applicationRequest: [
          {
            subheader: 'Today'
          },
          {
            name: `${users[5].name}`,
            lastname: `${users[5].lastname}`,
            avatar: users[5].avatar,
            avatarColor: null,
            type: {
              name: 'New',
              icon: 'add',
              color: 'success'
            },
            time: '08:00am'
          },
          {
            name: `${users[4].name}`,
            lastname: `${users[4].lastname}`,
            avatar: users[4].avatar,
            avatarColor: null,
            type: {
              name: 'Renew',
              icon: 'autorenew',
              color: 'blue'
            },
            time: '09:00am'
          },
          {
            name: 'Natash Roz',
            lastname: 'Roz',
            avatar: null,
            avatarColor: 'blue',
            type: {
              name: 'Renew',
              icon: 'autorenew',
              color: 'blue'
            },
            time: '09:20am'
          },
          {
            name: `${users[3].name}`,
            lastname: `${users[3].lastname}`,
            avatar: users[3].avatar,
            avatarColor: null,
            type: {
              name: 'Support',
              icon: 'language',
              color: 'amber'
            },
            time: '6:00pm'
          },
          {
            subheader: 'Yesterday'
          },
          {
            name: 'Holly Cruz',
            lastname: 'Cruz',
            avatar: null,
            avatarColor: 'pink',
            type: {
              name: 'New',
              icon: 'add',
              color: 'success'
            },
            time: '10:20am'
          },
          {
            name: `${users[2].name}`,
            lastname: `${users[2].lastname}`,
            avatar: users[2].avatar,
            avatarColor: null,
            type: {
              name: 'Renew',
              icon: 'autorenew',
              color: 'blue'
            },
            time: '02:08pm'
          },
          {
            name: 'Danny Rand',
            lastname: 'Rand',
            avatar: null,
            avatarColor: 'blue-grey',
            type: {
              name: 'Support',
              icon: 'language',
              color: 'amber'
            },
            time: '09:20am'
          }
        ],
        barChartData,
        lineChartData
      }
    }
  }
</script>
<style>
  .card--flex-toolbar {
    margin-top: -64px;
  }
</style>

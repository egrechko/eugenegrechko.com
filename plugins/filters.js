import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('formatDate', (val) => dayjs(val).format('MMMM DD, YYYY'))

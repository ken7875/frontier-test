import moment from 'moment'

export default {
  mounted(el: HTMLElement, bind: any) {
    const date = new Date(bind.value)
    const format = moment(date).format('YYYY-MM-DD')
    el.innerHTML = format
  },
  updated(el: HTMLElement, bind: any) {
    const date = new Date(bind.value)
    const format = moment(date).format('YYYY-MM-DD')
    el.innerHTML = format
  }
}

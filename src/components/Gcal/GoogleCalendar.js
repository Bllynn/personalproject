import React, {Component} from 'react'
import { render } from 'react-dom'
import moment from 'moment'

import BigCalendar from 'react-big-calendar'
// a localizer for BigCalendar
BigCalendar.momentLocalizer(moment)

import { getEvents } from './Gcal'

// this weird syntax is just a shorthand way of specifying loaders
require('style!css!react-big-calendar/lib/css/react-big-calendar.css')

class Gcal extends Component {
  constructor () {
    super()
    this.state = {
      events: []
    }
  }
  componentDidMount () {
    getEvents((events) => {
      this.setState({events})
    })
  }
  render () {
    return (
      // React Components in JSX look like HTML tags
      <BigCalendar
        style={{height: '420px'}}
        events={this.state.events}
      />
    )
  }
}

render(<App />, document.getElementById('root'))
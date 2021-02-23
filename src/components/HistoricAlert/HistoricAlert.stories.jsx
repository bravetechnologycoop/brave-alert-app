// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'

// In-house dependencies
import HistoricAlert from '.'

storiesOf('HistoricAlert', module)
  .add('Normal Alert', () => <HistoricAlert category="Overdose" roomName="Room 302" time="10:33 AM" />)
  .add('Urgent Alert', () => <HistoricAlert roomName="1st Floor Landing" category="Other" time="1:23 PM" isUrgent="true" />)
  .add('Without Category', () => <HistoricAlert roomName="Bathroom 1" time="12:00 PM" />)

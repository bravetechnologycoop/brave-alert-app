// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { faUfoBeam } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import ImageCard from './ImageCard'
import images from '../../resources/images'

storiesOf('ImageCard', module)
  .add('With image', () => (
    <ImageCard
      imageSource={images.alert_icon}
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    />
  ))
  .add('With FA icon', () => (
    <ImageCard
      icon={faUfoBeam}
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    />
  ))

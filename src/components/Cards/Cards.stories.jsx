// Third-party dependencies
import React from 'react'
import { storiesOf } from '@storybook/react-native'
import { faUfoBeam } from '@fortawesome/pro-light-svg-icons'

// In-house dependencies
import Cards from './Cards'
import ImageCard from './ImageCard'
import ContactBraveBoxesCard from './ContactBraveBoxesCard'
import images from '../../resources/images'

storiesOf('Cards', module)
  .add('Only one card', () => (
    <Cards>
      <ImageCard
        imageSource={images.alert_icon}
        text="IMAGE: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      />
    </Cards>
  ))
  .add('ImageCards', () => (
    <Cards>
      <ImageCard
        imageSource={images.alert_icon}
        text="IMAGE: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      />
      <ImageCard
        icon={faUfoBeam}
        text="ICON: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      />
      <ImageCard
        imageSource={images.alert_icon_urgent}
        text="IMAGE: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
      />
    </Cards>
  ))
  .add('ContactBraveBoxesCards', () => (
    <Cards>
      <ContactBraveBoxesCard />
      <ContactBraveBoxesCard />
    </Cards>
  ))

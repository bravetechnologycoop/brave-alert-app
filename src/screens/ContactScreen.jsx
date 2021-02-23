// Third-party dependencies
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

// In-house dependencies
import {
  CONTACT_FORM_URI,
  CONTACT_FORM_NAME_QUESTION_ID,
  CONTACT_FORM_ORG_QUESTION_ID,
  CONTACT_FORM_MESSAGE_QUESTION_ID,
  CONTACT_FORM_CONTACT_METHOD,
} from '@env'
import { get, HTTP_STATUS } from '../services/FetchService'
import { useSafeHandler } from '../hooks'
import colors from '../resources/colors'
import SCREEN from '../navigation/ScreensEnum'
import { setLocationName } from '../redux/slices/locationSlice'
import { getLocationName } from '../redux/selectors'
import ButtonWithCheckmark from '../components/ButtonWithCheckmark'
import FormTextInput from '../components/FormTextInput'
import FormRadioButtonGroup from '../components/FormRadioButtonGroup'
import PageHeader from '../components/PageHeader'
import ContactBraveBoxes from '../components/ContactBraveBoxes'
import Logger from '../services/Logger'

// Setup logger
const logger = new Logger('ContactScreen')

// The exact values that Google Forms expects for the single choice question about contact method
const CONTACT_METHOD = {
  EMAIL: 'Email',
  PHONE: 'Phone',
  NONE: 'I+do+not+need+to+be+contacted',
}

const styles = StyleSheet.create({
  contactBraveBoxesContainer: {
    height: 195,
    marginBottom: 25,
  },
  layout: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    backgroundColor: colors.greyscaleLighter,
    marginTop: 40,
    marginHorizontal: 21,
  },
  radioButtonGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  subheading: {
    color: colors.greyscaleDarker,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    marginBottom: 21,
  },
})

function ContactScreen() {
  // TODO Remove this when it's done during the real device designation process
  const dispatch = useDispatch()
  dispatch(setLocationName('My Fake Location'))

  // Using component state for these values because this state doesn't need to be shared and isn't important to retain
  logger.debug('Set default values')
  const defaultValues = {
    name: '',
    message: '',
  }
  const { control, handleSubmit, errors, reset } = useForm({ defaultValues })
  const [nameFieldRules, setNameFieldRules] = useState({ required: false })
  const [contactMethods, setContactMethods] = useState([
    { id: 1, value: CONTACT_METHOD.EMAIL, displayValue: 'Email', selected: false },
    { id: 2, value: CONTACT_METHOD.PHONE, displayValue: 'Phone', selected: false },
    { id: 3, value: CONTACT_METHOD.NONE, displayValue: 'I do not need to be contacted', selected: true },
  ])
  const [fireSubmitButtonTransition, setFireSubmitButtonTransition] = useState(false)

  const org = useSelector(getLocationName)
  logger.info(`Got organization from global location state: ${org}`)

  const [fireFormSubmission, fireFormSubmissionOptions] = useSafeHandler()
  function handleGoogleFormSubmission(data) {
    async function handle() {
      const customResponseHandlers = {}
      customResponseHandlers[HTTP_STATUS.OK_200] = () => {
        // Without this custom handler, the safeHandler complains that HTML is returned instead of JSON
        logger.debug('In 200 response handler for contact form submission')

        logger.debug(`Trigger the submit button's animation from text to icon back to text`)
        setFireSubmitButtonTransition(true)

        logger.debug('Clear text fields for the next contact form submission')
        reset(defaultValues)

        logger.debug('Select the do-not-contact contact method for the next contact form submission')
        const updatedContactMethods = contactMethods.map(item => {
          return { ...item, selected: item.id === 3 } // selected will be true only for do-not-contact
        })
        setContactMethods(updatedContactMethods)

        // Reset this to false to allow for it to be fired again
        setFireSubmitButtonTransition(false)

        return undefined
      }

      const sanitizedName = encodeURIComponent(data.name)
      const sanitizedOrg = encodeURIComponent(org)
      const sanitizedMessage = encodeURIComponent(data.message)
      const contactMethod = contactMethods.find(item => item.selected).value

      logger.info('Submit contact form to Google Forms')
      await get({
        base: 'https://docs.google.com',
        uri: `${CONTACT_FORM_URI}?usp=pp_url&${CONTACT_FORM_NAME_QUESTION_ID}=${sanitizedName}&${CONTACT_FORM_ORG_QUESTION_ID}=${sanitizedOrg}&${CONTACT_FORM_MESSAGE_QUESTION_ID}=${sanitizedMessage}&${CONTACT_FORM_CONTACT_METHOD}=${contactMethod}&submit=Submit`,
        responseHandlers: customResponseHandlers,
      })

      logger.debug('Reset Google form submission handler')
      fireFormSubmissionOptions.reset()
    }

    fireFormSubmission(handle, {
      rollbackScreen: SCREEN.CONTACT,
    })
  }

  useEffect(() => {
    const selectedContactMethod = contactMethods.find(item => item.selected)
    const isNameRequired = selectedContactMethod.id !== 3
    logger.debug(`Selected contact method is now ${selectedContactMethod}, so the name field's requirement rule is ${isNameRequired}`)
    setNameFieldRules({
      required: isNameRequired,
    })
  }, [contactMethods])

  function onFormSubmit(data) {
    logger.debug(
      `Pushed Submit with name: ${data.name} and message: ${data.message} contact method: ${
        contactMethods.find(item => item.selected).value
      } org: ${org}`,
    )

    handleGoogleFormSubmission(data)
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.layout}>
            <PageHeader>Contact Brave</PageHeader>

            <FormTextInput
              name="name"
              control={control}
              rules={nameFieldRules}
              defaultValue={null}
              errors={errors}
              errorMessage="Please type your name so that we can contact you:"
            >
              Your Name:
            </FormTextInput>

            <FormTextInput
              name="message"
              control={control}
              rules={{ required: true }}
              defaultValue={null}
              multiline
              errors={errors}
              errorMessage="Please type your message:"
            >
              Message:
            </FormTextInput>

            <FormRadioButtonGroup values={contactMethods} setValues={setContactMethods}>
              How would you like to be contacted?
            </FormRadioButtonGroup>

            <ButtonWithCheckmark label="Submit" onPress={handleSubmit(onFormSubmit)} transitionBack fireTransition={fireSubmitButtonTransition} />

            <Text style={styles.subheading}>Other ways to reach out:</Text>

            <View style={styles.contactBraveBoxesContainer}>
              <ContactBraveBoxes />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default ContactScreen

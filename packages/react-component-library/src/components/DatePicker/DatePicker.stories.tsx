import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react'
import { Field, Formik, Form } from 'formik'
import React from 'react'

import { withFormik } from '../../enhancers/withFormik'
import { DatePicker, DATEPICKER_PLACEMENT } from '.'

import { TextInput } from '../TextInput'
import { Button } from '../Button'

const stories = storiesOf('DatePicker', module)
const examples = storiesOf('DatePicker/Examples', module)

stories.add('Default', () => {
  return (
    <DatePicker
      startDate={new Date(2018, 0, 11)}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      placement={DATEPICKER_PLACEMENT.BELOW}
      isOpen
    />
  )
})

stories.add('Custom format', () => {
  return (
    <DatePicker
      format="yyyy/MM/dd"
      startDate={new Date(2018, 0, 11)}
      placement={DATEPICKER_PLACEMENT.BELOW}
    />
  )
})

examples.add('Custom initial month', () => {
  return (
    <DatePicker
      initialMonth={new Date(2020, 1)}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      placement={DATEPICKER_PLACEMENT.BELOW}
      isOpen
    />
  )
})

examples.add('Custom label', () => {
  return (
    <DatePicker
      startDate={new Date(2018, 0, 11)}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      label="Some other label"
      isOpen
    />
  )
})

examples.add('Disabled', () => {
  return (
    <DatePicker
      startDate={new Date(2018, 0, 11)}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      isDisabled
    />
  )
})

examples.add('Disabled days', () => {
  return (
    <DatePicker
      startDate={new Date(2020, 3, 1)}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      disabledDays={[
        new Date(2020, 3, 12),
        new Date(2020, 3, 2),
        {
          after: new Date(2020, 3, 20),
          before: new Date(2020, 3, 25),
        },
      ]}
    />
  )
})

examples.add('Range', () => {
  return (
    <DatePicker
      endDate={new Date(2021, 3, 2)}
      startDate={new Date(2021, 2, 15)}
      onBlur={action('onBlur')}
      onChange={action('onChange')}
      isRange
      isOpen
    />
  )
})

const DatePickerForm = () => {
  interface Data {
    foo: string
    startDate: Date
    endDate: Date
  }

  const initialValues: Data = {
    foo: '',
    startDate: new Date(2020, 0, 1),
    endDate: new Date(2020, 4, 1),
  }

  const FormikTextInput = withFormik(TextInput)
  const FormikDatePicker = withFormik(DatePicker)

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={action('onSubmit')}
      render={({ setFieldValue }) => {
        return (
          <Form>
            <Field name="foo" label="Foo" component={FormikTextInput} />
            <Field
              name="date"
              label="Date"
              component={FormikDatePicker}
              isRange
              onChange={({ startDate, endDate }: any) => {
                setFieldValue('startDate', startDate)
                setFieldValue('endDate', endDate)
              }}
              startDate={initialValues.startDate}
              endDate={initialValues.endDate}
            />
            <Button type="submit">Submit</Button>
          </Form>
        )
      }}
    />
  )
}

examples.add('Formik', () => {
  return <DatePickerForm />
})

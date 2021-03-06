import React from 'react'
import { action } from '@storybook/addon-actions'
import { IconLayers, IconAnchor, IconShare } from '@royalnavy/icon-library'
import { storiesOf } from '@storybook/react'

import { Dropdown } from './Dropdown'

const stories = storiesOf('Dropdown', module)
const examples = storiesOf('Dropdown/Examples', module)

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'chozbun', label: 'Chozo Bun', isHidden: true },
  { value: 'melon', label: 'Melon', isVisible: true, isDisabled: true },
  { value: 'strawberry', label: 'Strawberry', isDisabled: true },
  { value: 'vanilla', label: 'Vanilla', rightContent: <IconShare /> },
]

const scrollOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'chozbun', label: 'Chozo Bun', isHidden: true },
  { value: 'melon', label: 'Melon', isVisible: true },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'snozberry', label: 'Snozberry' },
  { value: 'vanilla', label: 'Vanilla', rightContent: <IconShare /> },
  { value: 'Wombat', label: 'Wombat' },
  { value: 'Yowler', label: 'Yowler' },
  { value: 'Zombie', label: 'Zombie' },
]

const iconOptions = options.map((option) => ({
  ...option,
  icon: <IconAnchor />,
}))

stories.add('Default', () => (
  <Dropdown options={options} label="Layers" onSelect={action('onSelect')} />
))

examples.add('Icons', () => (
  <Dropdown
    options={iconOptions}
    label="Layers"
    labelIcon={<IconLayers />}
    onSelect={action('onSelect')}
  />
))

examples.add('Scroll', () => (
  <Dropdown
    options={scrollOptions}
    label="Layers"
    onSelect={action('onSelect')}
  />
))

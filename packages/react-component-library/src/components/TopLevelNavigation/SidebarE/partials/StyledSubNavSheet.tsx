import styled from 'styled-components'
import { selectors } from '@royalnavy/design-tokens'

import { Sheet } from '../../Sheet/Sheet'

const { spacing, color } = selectors

export const StyledSubNavSheet = styled(Sheet)`
  display: flex;

  > div > div {
    margin-left: ${spacing('3')};
  }

  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a {
    padding: ${spacing('2')};
  }

  a,
  a:hover {
    color: ${color('neutral', 'white')};
    text-decoration: none;
  }
`

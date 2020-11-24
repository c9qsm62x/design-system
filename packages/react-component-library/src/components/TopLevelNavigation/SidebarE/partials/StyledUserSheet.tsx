import styled from 'styled-components'
import { selectors } from '@royalnavy/design-tokens'

import { Sheet } from '../../Sheet/Sheet'

const { color } = selectors

export const StyledUserSheet = styled(Sheet)`
  > div > div {
    margin-left: 1px;
  }

  ol {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  a,
  a:hover {
    color: ${color('neutral', 'white')};
    text-decoration: none;
  }
`

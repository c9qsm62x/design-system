import React, { ReactElement } from 'react'
import classNames from 'classnames'

import { Avatar } from '../../Avatar'
import { ComponentWithClass } from '../../../common/ComponentWithClass'
import { LinkTypes } from '../../../common/Link'

export interface SidebarUserProps extends ComponentWithClass {
  initials: string
  link: React.ReactElement<LinkTypes>
}

export const SidebarUser: React.FC<SidebarUserProps> = ({
  className,
  initials,
  link,
  ...rest
}) => {
  const classes = classNames('rn-sidebar__nav-link', className)

  return React.cloneElement(link as ReactElement, {
    ...link.props,
    children: (
      <Avatar
        className="rn-sidebar__avatar rn-sidebar__nav-label"
        initials={initials}
      />
    ),
    className: classes,
    'data-testid': 'sidebar-user',
    ...rest,
  })
}

SidebarUser.displayName = 'SidebarUser'

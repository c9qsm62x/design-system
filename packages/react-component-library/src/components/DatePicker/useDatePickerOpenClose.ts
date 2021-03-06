import React, { useRef } from 'react'

import { useDocumentClick, useOpenClose } from '../../hooks'

export function useDatePickerOpenClose(
  isOpen?: boolean
): {
  floatingBoxChildrenRef: React.RefObject<HTMLDivElement>
  handleOnClose: () => void
  inputButtonRef: React.RefObject<HTMLButtonElement>
  handleOnFocus: (event: React.FormEvent<Element>) => void
  open: boolean
} {
  const { open, handleOnClose, handleOnFocus } = useOpenClose(isOpen)
  const floatingBoxChildrenRef = useRef()
  const inputButtonRef = useRef()

  function handleDatePickerOnClose() {
    handleOnClose(null)
  }

  useDocumentClick(
    [floatingBoxChildrenRef, inputButtonRef],
    handleDatePickerOnClose,
    [open]
  )

  return {
    floatingBoxChildrenRef,
    handleOnFocus,
    inputButtonRef,
    open,
    handleOnClose: handleDatePickerOnClose,
  }
}

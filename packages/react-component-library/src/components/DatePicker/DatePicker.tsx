import React, { useRef, useState } from 'react'
import differenceInMinutes from 'date-fns/differenceInMinutes'
import { v4 as uuidv4 } from 'uuid'
import { format } from 'date-fns'
import {
  DateUtils,
  DayModifiers,
  DayPickerProps,
  RangeModifier,
} from 'react-day-picker'

import { ComponentWithClass } from '../../common/ComponentWithClass'
import { DATE_FORMAT } from '../../constants'
import { DATEPICKER_PLACEMENT, DATEPICKER_PLACEMENTS } from '.'
import { DropdownIndicatorIcon } from '../Dropdown/DropdownIndicatorIcon'
import { FLOATING_BOX_SCHEME } from '../../primitives/FloatingBox'
import { getId } from '../../helpers'
import { StyledDatePicker } from './partials/StyledDatePicker'
import { StyledDayPicker } from './partials/StyledDayPicker'
import { StyledFloatingBox } from './partials/StyledFloatingBox'
import { StyledTetherComponent } from './partials/StyledTetherComponent'
import { StyledDatePickerInput } from './partials/StyledDatePickerInput'
import { StyledOuterWrapper } from './partials/StyledOuterWrapper'
import { StyledInputWrapper } from './partials/StyledInputWrapper'
import { StyledLabel } from './partials/StyledLabel'
import { StyledInput } from './partials/StyledInput'
import { StyledButton } from './partials/StyledButton'
import { StyledSeparator } from './partials/StyledSeparator'
import { useDatePickerOpenClose } from './useDatePickerOpenClose'

export interface StateObject {
  from?: Date
  to?: Date
}

export type DatePickerPlacement =
  | typeof DATEPICKER_PLACEMENT.ABOVE
  | typeof DATEPICKER_PLACEMENT.BELOW
  | typeof DATEPICKER_PLACEMENT.LEFT
  | typeof DATEPICKER_PLACEMENT.RIGHT

export interface DatePickerProps extends ComponentWithClass {
  endDate?: Date
  format?: string
  id?: string
  isDisabled?: boolean
  isRange?: boolean
  label?: string
  name?: string
  onBlur?: (event: React.FormEvent) => void
  onChange?: (data: { startDate: Date; endDate: Date }) => void
  placement?: DatePickerPlacement
  startDate?: Date
  value?: string
  isOpen?: boolean
  disabledDays?: DayPickerProps['disabledDays']
  initialMonth?: DayPickerProps['initialMonth']
}

function transformDates(
  startDate: Date,
  endDate: Date,
  datePickerFormat: string
) {
  if (startDate && endDate && differenceInMinutes(endDate, startDate) > 0) {
    return `${format(startDate, datePickerFormat)} - ${format(
      endDate,
      datePickerFormat
    )}`
  }

  if (startDate) {
    return format(startDate, datePickerFormat)
  }

  return ''
}

function getNewState(
  isRange: boolean,
  day: Date,
  state: StateObject
): StateObject {
  if (isRange) {
    if (state.from && (state.to || state.from > day)) {
      return { from: day }
    }

    return DateUtils.addDayToRange(day, state as RangeModifier)
  }

  return { from: day, to: day }
}

export const DatePicker: React.FC<DatePickerProps> = ({
  className,
  endDate,
  format: datePickerFormat = DATE_FORMAT.SHORT,
  id = uuidv4(),
  isDisabled,
  isRange,
  label = 'Select Date',
  onChange,
  placement = DATEPICKER_PLACEMENT.BELOW,
  startDate,
  value,
  isOpen,
  disabledDays,
  initialMonth,
  ...rest
}) => {
  const componentRef = useRef(null)

  const {
    floatingBoxChildrenRef,
    handleOnClose,
    handleOnFocus,
    inputButtonRef,
    open,
  } = useDatePickerOpenClose(isOpen)

  const [state, setState] = useState<StateObject>({
    from: startDate,
    to: endDate,
  })

  const { from, to } = state
  const modifiers = { start: from, end: to }

  function handleDayClick(day: Date, { disabled }: DayModifiers) {
    if (disabled) return

    const newState = getNewState(isRange, day, state)
    setState(newState)

    if (onChange) {
      onChange({
        startDate: newState.from,
        endDate: newState.to,
      })
    }
  }

  const hasContent = !!((value && value.length) || from)
  const PLACEMENTS = DATEPICKER_PLACEMENTS[placement]

  const titleId = getId('datepicker-title')
  const contentId = getId('day-picker')

  /**
   * Type error in upstream Tether package. Fix submitted.
   * Using createElement allows us to avoid the type error.
   *
   * https://github.com/danreeves/react-tether/issues/218
   * https://github.com/Microsoft/TypeScript/issues/27552
   */
  return (
    <StyledDatePicker ref={componentRef} data-testid="datepicker-wrapper">
      {/*
        // @ts-ignore */}
      {React.createElement(StyledTetherComponent, {
        offset: PLACEMENTS.OFFSET,
        attachment: PLACEMENTS.ATTACHMENT,
        targetAttachment: PLACEMENTS.TARGET_ATTACHMENT,
        $isVisible: open,
        renderTarget: (ref: React.RefObject<HTMLDivElement>) => (
          <StyledDatePickerInput
            className={className}
            ref={ref}
            data-testid="datepicker-input-wrapper"
            $isDisabled={isDisabled}
          >
            <StyledOuterWrapper $isOpen={isOpen}>
              <StyledInputWrapper>
                <StyledLabel
                  $isOpen={isOpen}
                  $hasContent={hasContent}
                  htmlFor={id}
                  data-testid="datepicker-label"
                >
                  {label}
                </StyledLabel>
                <StyledInput
                  type="text"
                  id={id}
                  value={transformDates(from, to, datePickerFormat)}
                  onFocus={handleOnFocus}
                  disabled={isDisabled}
                  readOnly
                  aria-label="Choose date"
                  data-testid="datepicker-input"
                  {...rest}
                />
              </StyledInputWrapper>
              <StyledButton
                aria-expanded={!!open}
                aria-label={`${open ? 'Hide' : 'Show'} day picker`}
                aria-owns={contentId}
                ref={inputButtonRef}
                type="button"
                onClick={open ? handleOnClose : handleOnFocus}
                disabled={isDisabled}
                data-testid="datepicker-input-button"
              >
                <StyledSeparator />
                <DropdownIndicatorIcon isOpen={open} />
              </StyledButton>
            </StyledOuterWrapper>
          </StyledDatePickerInput>
        ),
        renderElement: (ref: React.RefObject<HTMLDivElement>) => (
          <StyledFloatingBox
            contentId={contentId}
            ref={ref}
            position={PLACEMENTS.ARROW_POSITION}
            scheme={FLOATING_BOX_SCHEME.LIGHT}
            $isVisible={open}
            role="dialog"
            aria-modal
            aria-labelledby={titleId}
            aria-live="polite"
          >
            <div ref={floatingBoxChildrenRef}>
              <StyledDayPicker
                numberOfMonths={isRange ? 2 : 1}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={handleDayClick}
                initialMonth={startDate || initialMonth}
                disabledDays={disabledDays}
                $isRange={isRange}
              />
            </div>
          </StyledFloatingBox>
        ),
      })}
    </StyledDatePicker>
  )
}

DatePicker.displayName = 'DatePicker'

import { Label, TextInput } from 'flowbite-react'
import React from 'react'
import { useController, UseControllerProps } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { DatePickerProps } from 'react-datepicker';
type Props = {
  label: string
  type?: string
  showLabel?: boolean
} & UseControllerProps & Partial<DatePickerProps>

export default function DateInput(props : Props) {

  const { fieldState, field } = useController({...props, defaultValue: ''});

  return (
    <div className="block">
      <DatePicker
        {...props}
        {...field}
        selected={field.value}
        placeholderText={props.label}
        onSelect={(date) => field.onChange(date)}
        className={`
            rounded-lg w-[100%] flex flex-col
            ${fieldState.error ? 'border-red-500 bg-red-50 text-red-900' : (fieldState.isDirty && !fieldState.invalid) ? 'border-green-500 bg-green-50 text-green-900' :
               ''}
          `}
      />
      {fieldState.error && (
        <div className='text-red-500 text-sm mt-1'>{fieldState.error.message}</div>
      )}
    </div>
  );
}

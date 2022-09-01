export default interface TextFieldInterface {
  width?: number
  height?: number
  success?: boolean
  disabledAutocompleted?: boolean
  value?: string
  label: string
  disabled?: boolean
  required?: boolean
  textInput?: any
  error?: boolean
  noErrorMessage?: boolean
  backError?: boolean
  backErrorMessage?: string
  type: "text" | "password" | "email" | "number" | "textarea"
  max?: number
  min?: number
  alphabetic?: boolean
  alphanumeric?: boolean
  pattern?: string
  reference?: any
  specialCharacters?: boolean
  validations?: ["required" | "maxLength" | "minLength" | "pattern"]
  onChange?: (arg: any) => void
  onBlur?: (arg?: any) => void
  keyDown?: (arg?: any) => void
  patternMessage?: string
  forceValidations?: boolean
  placeholder?: string
}

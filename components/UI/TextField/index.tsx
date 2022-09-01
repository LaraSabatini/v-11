import { useState, useEffect } from "react"
import TextFieldInterface from "interfaces/components/TextFieldInterface"
import Icon from "components/UI/Assets/Icon"
import response from "strings/inputMessages.json"
import ErrorMessage from "../ErrorMessage"
import {
  FieldContainer,
  Label,
  InputContainer,
  InputPassword,
  IconContainer,
  InputContainerTextarea,
  ErrorMessageContainer,
  TextFieldContainer,
  TextAreaContainer,
} from "./styles"

function TextField({
  width,
  height,
  success,
  disabledAutocompleted,
  value,
  label,
  disabled,
  required,
  type,
  max,
  min,
  alphanumeric,
  alphabetic,
  pattern,
  patternMessage,
  specialCharacters,
  onChange,
  onBlur,
  reference,
  noErrorMessage,
  backError,
  backErrorMessage,
  forceValidations,
  placeholder,
  keyDown,
}: TextFieldInterface) {
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [inputOnFocus, setInputOnFocus] = useState<boolean>(false)

  const [visibility, setVisibility] = useState(true)

  const toggleVisibility = (e: any) => {
    e.preventDefault()
    setVisibility(!visibility)
    setInputOnFocus(true)
  }

  const alphanumericReg = /(^$)|[a-zA-ZÀ-ÿ-00f100d10-9\s]+(\s*[a-zA-ZÀ-ÿ-00f100d10-9\s]*)*[a-zA-ZÀ-ÿ-00f100d10-9\s]+$/
  const alphabeticReg = /(^$)|^[a-zA-ZÀ-ÿ00f100d1]+(\s*[a-zA-ZÀ-ÿ00f100d1]*)*[a-zA-ZÀ-ÿ00f100d1]+$/
  const numericReg = /(^$)|(^[0-9]+$)/
  const specialCharactersReg = /(^$)|[a-zA-ZÀ-ÿ-00f100d10-9$&+,:;=?@#_|"'´°<>.^*()%¡¿!/-{}\s]+$/
  const emailReg = /(^$)|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const checkInputs = (currentValue: string) => {
    if (required === true && currentValue.trim() === "") {
      setError(true)
      setErrorMessage(response.isRequired)
    } else if (max && currentValue.length > max && currentValue.trim() !== "") {
      setError(true)
      setErrorMessage(`${response.hasMaxLength} ${max}`)
    } else if (min && currentValue.length < min && currentValue.trim() !== "") {
      setError(true)
      setErrorMessage(`${response.hasMinLength} ${min}`)
    } else if (alphanumeric && !currentValue.match(alphanumericReg)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${response.alphanumeric}`)
    } else if (alphabetic && !currentValue.trim().match(alphabeticReg)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${response.alphabetic}`)
    } else if (type === "number" && !currentValue.match(numericReg)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${response.numeric}`)
    } else if (specialCharacters && !currentValue.match(specialCharactersReg)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${response.special_characters}`)
    } else if (pattern && !currentValue.match(pattern)) {
      setError(true)
      setErrorMessage(`${response.hasRegEx} ${patternMessage}`)
    } else if (type === "email" && !currentValue.match(emailReg)) {
      setError(true)
      setErrorMessage(`${response.email}`)
    } else {
      setError(false)
      setInputOnFocus(false)
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      checkInputs(e.currentTarget.value)
      keyDown()
    }
  }

  const hanldeInputFocus = () => {
    setInputOnFocus(true)
  }

  const setFocusFalse = () => {
    setInputOnFocus(false)
  }

  useEffect(() => {
    if (forceValidations) {
      checkInputs(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceValidations])
  if (type === "password") {
    return (
      <FieldContainer height={height}>
        <Label backError={backError} error={error}>
          {required ? `${label}*` : label}
        </Label>
        <InputPassword
          error={error}
          width={width}
          height={height}
          backError={backError}
          success={success}
          disabledAutocompleted={disabledAutocompleted}
          inputOnFocus={inputOnFocus}
        >
          <InputContainer
            pass="pass"
            data-error={error}
            type={visibility ? "password" : "text"}
            autoComplete="off"
            error={error}
            value={value}
            disabled={disabled}
            width={width}
            height={height}
            required={required}
            onClick={hanldeInputFocus}
            onBlur={e => {
              checkInputs(e.currentTarget.value)
              if (onBlur) {
                onBlur(e)
              }
            }}
            onChange={onChange}
            pattern={pattern}
            onKeyDown={handleKeyDown}
            noErrorMessage={noErrorMessage}
            backError={backError}
            ref={reference}
          />
          <IconContainer
            className="iconPass"
            onClick={toggleVisibility}
            onFocus={hanldeInputFocus}
            onBlur={setFocusFalse}
          >
            <Icon
              icon={visibility ? "IconPasswordHidden" : "IconPasswordVisible"}
            />
          </IconContainer>
        </InputPassword>
        <ErrorMessageContainer width={width}>
          {!backError && error && !noErrorMessage && (
            <ErrorMessage message={errorMessage} />
          )}
          {backError && !error && !noErrorMessage && (
            <ErrorMessage message={backErrorMessage} />
          )}
          {backError && error && !noErrorMessage && (
            <ErrorMessage message={backErrorMessage} />
          )}
        </ErrorMessageContainer>
      </FieldContainer>
    )
  }
  if (type === "textarea") {
    return (
      <FieldContainer height={height}>
        <Label backError={backError} error={error}>
          {required ? `${label}*` : label}
        </Label>
        <TextAreaContainer
          width={width}
          height={height}
          backError={backError}
          error={error}
          disabledAutocompleted={disabledAutocompleted}
          success={success}
          inputOnFocus={inputOnFocus}
        >
          <InputContainerTextarea
            data-error={error}
            type="textarea"
            autoComplete="off"
            error={error}
            value={value}
            disabled={disabled}
            onFocus={hanldeInputFocus}
            required={required}
            width={width}
            placeholder={placeholder}
            height={height}
            onBlur={e => {
              checkInputs(e.currentTarget.value)
              if (onBlur) {
                onBlur(e)
              }
            }}
            onSubmit={e => checkInputs(e.currentTarget.value)}
            onChange={onChange}
            pattern={pattern}
            onKeyDown={handleKeyDown}
            noErrorMessage={noErrorMessage}
            backError={backError}
            ref={reference}
          />
        </TextAreaContainer>
        <ErrorMessageContainer width={width}>
          {!backError && error && !noErrorMessage && (
            <ErrorMessage message={errorMessage} />
          )}
          {backError && !error && !noErrorMessage && (
            <ErrorMessage message={backErrorMessage} />
          )}
          {backError && error && !noErrorMessage && (
            <ErrorMessage message={backErrorMessage} />
          )}
        </ErrorMessageContainer>
      </FieldContainer>
    )
  }
  return (
    <FieldContainer height={height}>
      <Label backError={backError} error={error}>
        {required ? `${label}*` : label}
      </Label>
      <TextFieldContainer
        width={width}
        height={height}
        backError={backError}
        error={error}
        disabledAutocompleted={disabledAutocompleted}
        success={success}
        inputOnFocus={inputOnFocus}
      >
        <InputContainer
          data-error={error}
          type="text"
          autoComplete="off"
          disabled={disabled}
          error={error}
          value={value}
          width={width}
          height={height}
          placeholder={placeholder}
          required={required}
          onBlur={e => {
            checkInputs(e.currentTarget.value)
            if (onBlur) {
              onBlur(e)
            }
          }}
          onFocus={hanldeInputFocus}
          onChange={onChange}
          pattern={pattern}
          onKeyDown={handleKeyDown}
          noErrorMessage={noErrorMessage}
          backError={backError}
          ref={reference}
        />
      </TextFieldContainer>
      <ErrorMessageContainer width={width}>
        {!backError && error && !noErrorMessage && (
          <ErrorMessage message={errorMessage} />
        )}
        {backError && !error && !noErrorMessage && (
          <ErrorMessage message={backErrorMessage} />
        )}
        {backError && error && !noErrorMessage && (
          <ErrorMessage message={backErrorMessage} />
        )}
      </ErrorMessageContainer>
    </FieldContainer>
  )
}

export default TextField

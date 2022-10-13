import React, { useState, useEffect, useRef } from "react"
import Icon from "components/UI/Assets/Icon"
import inputTexts from "strings/inputMessages.json"
import {
  Container,
  Label,
  InputContainer,
  Input,
  InputSelectDropdownOptions,
  DropdownOptionsList,
  OptionListContent,
  ErrorMessageContainer,
  IconContainer,
} from "./styles"
import ErrorMessage from "../ErrorMessage"

export type InputSelectType = {
  label?: string
  required?: boolean
  width?: number
  backError?: boolean
  backErrorMessage?: string
  position?: "bottom-right" | "top-right" | "top-left"
  options: {
    id: number
    display_name: string
  }[]
  onChangeProps?: (value?: { id?: number; display_name?: string }) => void
  setValue?: string
}
const Autocomplete = React.forwardRef<HTMLInputElement, InputSelectType>(
  (
    {
      label,
      options,
      required,
      width,
      position,
      backError,
      backErrorMessage,
      onChangeProps,
      setValue,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false)
    const [searchName, setSearchName] = useState(setValue || "")
    const [inputValue, setInputValue] = useState(setValue || "")
    const [inputOnFocus, setInputOnFocus] = useState(false)
    const [showValue, setShowValue] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const [startValidation, setStartValidation] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const noCoincidences = `${inputTexts.no_coincidences}`
    const requiredField = `${inputTexts.isRequired}`
    const [selectedId, setSelectedId] = useState<number | null>(null)

    // Open the options
    const handleOpen = () => {
      setOpen(!open)
    }
    const handleInputFocus = () => {
      setShowValue(false)
      setInputOnFocus(true)
    }
    const validate = (textToValidate: string) => {
      if (required === true && textToValidate === "") {
        setError(true)
        setErrorMessage(requiredField)
      } else {
        setError(false)
      }
    }
    const clickRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const checkIfClickedOutside = (e: any) => {
        if (open && clickRef.current && !clickRef.current.contains(e.target)) {
          if (searchName === "") {
            // The onChange function that is received from props
            // executes here when the value is empty
            if (onChangeProps !== undefined) {
              onChangeProps({
                id: null,
                display_name: "",
              })
            }
            setShowValue(true)
            setInputValue("")
            setIsSearching(false)
            setInputOnFocus(false)
            setOpen(false)
            validate(searchName)
            setSelectedId(null)
          } else {
            setShowValue(true)
            setSearchName(inputValue)
            setIsSearching(false)
            setOpen(false)
            validate(inputValue)
            setInputOnFocus(false)
          }
          setOpen(false)
        }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, open, searchName, startValidation])
    // Select an option from the list
    const selectOption = e => {
      e.preventDefault()
      const optionSelected = e.target.innerText
      const optionDataId = e.target.attributes.getNamedItem("data-id").value
      setInputValue(optionSelected)
      setSelectedId(parseInt(optionDataId, 10))
      setSearchName(optionSelected)
      setOpen(false)
      setIsSearching(false)
      setError(false)
      setInputOnFocus(false)
    }

    const matchOptions = e => {
      setOpen(true)
      const { value } = e.target
      setSearchName(value)
      setIsSearching(true)
    }

    useEffect(() => {
      // This useEffect listen when the setValue prop changes
      if (setValue !== undefined) {
        // Here we search what option matches the setted value
        options?.map(
          opt => opt.display_name === setValue && setSelectedId(opt.id),
        )
        setSearchName(setValue)
        setInputValue(setValue)
        if (setValue === "") {
          // in case that the value setted is empty the id is null
          setSelectedId(null)
          onChangeProps({
            id: null,
            display_name: "",
          })
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue])

    useEffect(() => {
      // This useEffect listen when the inputValue or selectedId changes
      // to send the onChange prop with the corrects values
      if (
        onChangeProps !== undefined &&
        inputValue !== "" &&
        selectedId !== null
        // This condition verify if both values are setted
      ) {
        onChangeProps({
          id: selectedId,
          display_name: inputValue,
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputValue, selectedId])

    const handleOnBlur = () => {
      if (open) {
        setStartValidation(true)
      } else {
        setInputOnFocus(false)
        validate(searchName)
      }
    }
    return (
      <Container ref={clickRef}>
        <Label backError={backError} error={error}>
          {required ? `${label}*` : label}
        </Label>
        <InputContainer
          rotateIcon={open}
          width={width}
          error={error}
          backError={backError}
          inputOnFocus={inputOnFocus}
        >
          <Input
            value={showValue ? inputValue : searchName}
            onFocus={handleInputFocus}
            onClick={handleOpen}
            onChange={matchOptions}
            onBlur={handleOnBlur}
            ref={ref}
            className="dropdownList"
            required={required}
            width={width}
            data-error={error}
            data-selectedid={selectedId}
          />
          <IconContainer onClick={handleOpen}>
            <div className="iconControlling dropdownList" />
            <Icon icon="IconSingleArrow" />
          </IconContainer>
        </InputContainer>
        <ErrorMessageContainer width={width}>
          {!backError && error && <ErrorMessage message={errorMessage} />}
          {backError && !error && <ErrorMessage message={backErrorMessage} />}
          {backError && error && <ErrorMessage message={backErrorMessage} />}
        </ErrorMessageContainer>
        {open && (
          <InputSelectDropdownOptions
            className="dropdownList"
            width={width}
            position={position}
          >
            <DropdownOptionsList className="dropdownList">
              {options.filter(
                name =>
                  name.display_name
                    .toString()
                    .toLowerCase()
                    .indexOf(searchName.toString().toLowerCase()) > -1,
              ).length === 0
                ? noCoincidences
                : ""}
              {isSearching
                ? options
                    .filter(
                      name =>
                        name.display_name
                          .toString()
                          .toLowerCase()
                          .indexOf(searchName.toString().toLowerCase()) > -1,
                    )
                    .map(option => (
                      <OptionListContent
                        key={option.id.toString()}
                        className="dropdownList"
                        onClick={selectOption}
                        data-title={option.display_name}
                        data-id={option.id}
                      >
                        {option.display_name}
                      </OptionListContent>
                    ))
                : options.map(option => (
                    <OptionListContent
                      key={option.id.toString()}
                      className="dropdownList"
                      onClick={selectOption}
                      data-title={option.display_name}
                      data-id={option.id}
                    >
                      {option.display_name}
                    </OptionListContent>
                  ))}
            </DropdownOptionsList>
          </InputSelectDropdownOptions>
        )}
      </Container>
    )
  },
)

export default Autocomplete

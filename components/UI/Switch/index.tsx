/* eslint-disable jsx-a11y/label-has-associated-control */
import React from "react"
import Container from "./styles"

interface ToggleSwitchInterface {
  onChange: (arg?: any) => void
  defaultValue: boolean
  ownState?: boolean
  color?: string
  colorSecondary?: string
}

function Switch({
  onChange,
  defaultValue,
  ownState,
  color,
  colorSecondary,
}: ToggleSwitchInterface) {
  const [isToggled, setIsToggled] = React.useState(defaultValue)
  const onToggle = () => setIsToggled(!isToggled)

  return (
    <Container color={color} colorSecondary={colorSecondary}>
      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={ownState ?? isToggled}
          onChange={e => {
            onToggle()
            onChange(e)
          }}
        />
        <span className="switch" />
      </label>
    </Container>
  )
}
export default Switch

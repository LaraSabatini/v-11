import { DisabledMessage } from "./styles"

export interface PopOverInterface {
  title: string
  description: string
  view: boolean
  position?: "left" | "right"
}

const PopOver: React.FC<PopOverInterface> = ({
  title,
  description,
  view,
  position,
}) => {
  return (
    <DisabledMessage view={view} position={position}>
      <h3>{title}</h3>
      <p>{description}</p>
    </DisabledMessage>
  )
}

export default PopOver

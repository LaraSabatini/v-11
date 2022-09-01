import Message from "./styles"

export interface ErrorMessageInterface {
  message: string
  className?: string
}

function ErrorMessage({ message, className }: ErrorMessageInterface) {
  return <Message className={className && className}>{message}</Message>
}

export default ErrorMessage

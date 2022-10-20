/* eslint-disable no-nested-ternary */
import React from "react"
import theme from "@theme/index"
import Tooltip from "../Tooltip"
import Icon from "../Assets/Icon"
import { StatusIconContainer, IconContainer } from "./styles"

interface StatusIconInterface {
  tooltipText?: string
  hasTooltip?: boolean
  status:
    | "VALIDATED"
    | "REJECTED"
    | "PENDING"
    | "REVIEWING"
    | "IN_PROGRESS"
    | "IN_PROCESS"
    | "CANCELLED"
    | "FINISHED"
  styleHover?: boolean
  tooltipPlacement?:
    | "top"
    | "top-start"
    | "top-end"
    | "left"
    | "left-start"
    | "left-end"
    | "right"
    | "right-start"
    | "right-end"
    | "bottom"
    | "bottom-start"
    | "bottom-end"
    | "sidebar"
}

function StatusIcon(props: StatusIconInterface) {
  const {
    tooltipText,
    hasTooltip,
    status,
    styleHover,
    tooltipPlacement,
  } = props

  const statusCase = {
    PENDING: {
      icon: "IconNotice",
      color: theme.colors.warning,
    },
    REJECTED: {
      icon: "IconError",
      color: theme.colors.danger,
    },
    VALIDATED: {
      icon: "IconOk",
      color: theme.colors.success,
    },
    REVIEWING: {
      icon: "IconInformation",
      color: theme.colors.focus,
    },
    IN_PROGRESS: {
      icon: "IconInProgress",
      color: theme.colors.focus,
    },
    IN_PROCESS: {
      icon: "IconInProcess",
      color: theme.colors.primary,
    },
    CANCELLED: {
      icon: "IconCancelled",
      color: theme.colors.grey,
    },
    FINISHED: {
      icon: "IconOk",
      color: theme.colors.success,
    },
  }
  if (hasTooltip) {
    return (
      <StatusIconContainer>
        <Tooltip
          placement={tooltipPlacement || "top-start"}
          title={tooltipText}
        >
          <IconContainer styleHover={styleHover} status={status}>
            <Icon
              icon={statusCase[status].icon}
              color={statusCase[status].color}
            />
          </IconContainer>
        </Tooltip>
      </StatusIconContainer>
    )
  }
  return (
    <StatusIconContainer>
      <IconContainer styleHover={styleHover} status={status}>
        <Icon icon={statusCase[status].icon} color={statusCase[status].color} />
      </IconContainer>
    </StatusIconContainer>
  )
}

export default StatusIcon

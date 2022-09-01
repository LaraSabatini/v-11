import IconAdd from "./Icons/IconAdd"
import IconAlert from "./Icons/IconAlert"
import IconAlertTabs from "./Icons/IconAlertTabs"
import IconExclamation from "./Icons/IconExclamation"
import IconFullArrow from "./Icons/IconFullArrow"
import IconArrowOptions from "./Icons/IconArrowOptions"
import IconAssign from "./Icons/IconAssign"
import IconAssignOn from "./Icons/IconAssignOn"
import IconBeneficiary from "./Icons/IconBeneficiary"
import IconCalendar from "./Icons/IconCalendar"
import IconCanceledTabs from "./Icons/IconCanceledTabs"
import IconCheck from "./Icons/IconCheck"
import IconCheckModal from "./Icons/IconCheckModal"
import IconCheckTabs from "./Icons/IconCheckTabs"
import IconCleanFolder from "./Icons/IconCleanFolder"
import IconConfiguration from "./Icons/IconConfiguration"
import IconContact from "./Icons/IconContact"
import IconDashboard from "./Icons/IconDashboard"
import IconDownload from "./Icons/IconDownload"
import IconEdit from "./Icons/IconEdit"
import IconEmptyFolder from "./Icons/IconEmptyFolder"
import IconError from "./Icons/IconError"
import IconErrorNotFound from "./Icons/IconErrorNotFound"
import IconHelp from "./Icons/IconHelp"
import IconHistory from "./Icons/IconHistory"
import IconHome from "./Icons/IconHome"
import IconImageWithoutSearch from "./Icons/IconImageWithoutSearch"
import IconInformation from "./Icons/IconInformation"
import IconSingleArrow from "./Icons/IconSingleArrow"
import IconKey from "./Icons/IconKey"
import IconKeyOn from "./Icons/IconKeyOn"
import IconLess from "./Icons/IconLess"
import IconLessSmall from "./Icons/IconLessSmall"
import IconLocation from "./Icons/IconLocation"
import IconMenuOff from "./Icons/IconMenuOff"
import IconMenuOpen from "./Icons/IconMenuOpen"
import IconNotifications from "./Icons/IconNotifications"
import IconNotice from "./Icons/IconNotice"
import IconNotificationList from "./Icons/IconNotificationList"
import IconNoNotifications from "./Icons/IconNoNotifications"
import IconOk from "./Icons/IconOk"
import IconPaperClip from "./Icons/IconPaperClip"
import IconOpsManage from "./Icons/IconOpsManage"
import IconOpsManageOn from "./Icons/IconOpsManageOn"
import IconPlus from "./Icons/IconPlus"
import IconProvisioners from "./Icons/IconProvisioners"
import IconRegistration from "./Icons/IconRegistration"
import IconRemove from "./Icons/IconRemove"
import IconSave from "./Icons/IconSave"
import IconSearch from "./Icons/IconSearch"
import IconSeeMore from "./Icons/IconSeeMore"
import IconServices from "./Icons/IconServices"
import IconUndo from "./Icons/IconUndo"
import IconUser from "./Icons/IconUser"
import IconUsersOn from "./Icons/IconUsersOn"
import IconUsersOff from "./Icons/IconUsersOff"
import IconValidate from "./Icons/IconValidate"
import IconValidationOn from "./Icons/IconValidationOn"
import IconNotFound from "./Icons/IconNotFound"
import IconRemoveModal from "./Icons/IconRemoveModal"
import IconPasswordVisible from "./Icons/IconPasswordVisible"
import IconPasswordHidden from "./Icons/IconPasswordHidden"
import IconFilter from "./Icons/IconFilter"
import IconArrowRight from "./Icons/IconArrowRight"
import IconArrowLeft from "./Icons/IconArrowLeft"
import IconRegistrationOn from "./Icons/IconRegistrationOn"
import IconBilling from "./Icons/IconBilling"
import IconPriceList from "./Icons/IconPriceList"
import IconLiquidation from "./Icons/IconLiquidation"
import IconFinances from "./Icons/IconFinances"
import IconCopaymentsOn from "./Icons/IconCopaymentsOn"
import IconCopayments from "./Icons/IconCopayments"
import IconFolder from "./Icons/IconFolder"
import IconBillingOn from "./Icons/IconBillingOn"
import IconLiquidationOn from "./Icons/IconLiquidationOn"
import IconPriceListOn from "./Icons/IconPriceListOn"

interface IconInterface {
  icon: string
  width?: string
  height?: string
  color?: string
  id?: string
  border_color?: string
}

const Icon = ({
  icon,
  width,
  height,
  color,
  id,
  border_color,
}: IconInterface) => {
  function iconSwitch(param: string): JSX.Element {
    switch (param) {
      case "IconAdd":
        return <IconAdd width={width} height={height} color={color} />
      case "IconAlert":
        return <IconAlert width={width} height={height} color={color} />
      case "IconAlertTabs":
        return <IconAlertTabs width={width} height={height} color={color} />
      case "IconExclamation":
        return <IconExclamation width={width} height={height} color={color} />
      case "IconFullArrow":
        return <IconFullArrow width={width} height={height} color={color} />
      case "IconArrowOptions":
        return <IconArrowOptions width={width} height={height} color={color} />
      case "IconArrowRight":
        return <IconArrowRight width={width} height={height} color={color} />
      case "IconArrowLeft":
        return <IconArrowLeft width={width} height={height} color={color} />
      case "IconAssign":
        return <IconAssign width={width} height={height} />
      case "IconAssignOn":
        return <IconAssignOn width={width} height={height} />
      case "IconBeneficiary":
        return <IconBeneficiary width={width} height={height} color={color} />
      case "IconCalendar":
        return <IconCalendar width={width} height={height} color={color} />
      case "IconCanceledTabs":
        return <IconCanceledTabs width={width} height={height} color={color} />
      case "IconCheck":
        return <IconCheck width={width} height={height} color={color} />
      case "IconCheckModal":
        return <IconCheckModal width={width} height={height} color={color} />
      case "IconCheckTabs":
        return <IconCheckTabs width={width} height={height} color={color} />
      case "IconCleanFolder":
        return <IconCleanFolder width={width} height={height} />
      case "IconConfiguration":
        return <IconConfiguration width={width} height={height} color={color} />
      case "IconContact":
        return <IconContact width={width} height={height} color={color} />
      case "IconDashboard":
        return <IconDashboard />
      case "IconDownload":
        return <IconDownload width={width} height={height} color={color} />
      case "IconEdit":
        return <IconEdit width={width} height={height} color={color} />
      case "IconEmptyFolder":
        return <IconEmptyFolder width={width} height={height} />
      case "IconError":
        return <IconError width={width} height={height} color={color} />
      case "IconErrorNotFound":
        return <IconErrorNotFound width={width} height={height} />
      case "IconHelp":
        return <IconHelp width={width} height={height} color={color} />
      case "IconHistory":
        return <IconHistory width={width} height={height} color={color} />
      case "IconHome":
        return <IconHome width={width} height={height} color={color} />
      case "IconImageWithoutSearch":
        return <IconImageWithoutSearch width={width} height={height} />
      case "IconInformation":
        return <IconInformation width={width} height={height} color={color} />
      case "IconSingleArrow":
        return (
          <IconSingleArrow
            width={width}
            height={height}
            color={color}
            id={id}
          />
        )
      case "IconKey":
        return <IconKey width={width} height={height} />
      case "IconKeyOn":
        return <IconKeyOn width={width} height={height} />
      case "IconLess":
        return <IconLess width={width} height={height} color={color} />
      case "IconLessSmall":
        return <IconLessSmall width={width} height={height} color={color} />
      case "IconLocation":
        return <IconLocation width={width} height={height} color={color} />
      case "IconMenuOff":
        return <IconMenuOff width={width} height={height} color={color} />
      case "IconMenuOpen":
        return <IconMenuOpen width={width} height={height} color={color} />
      case "IconNotifications":
        return <IconNotifications width={width} height={height} color={color} />
      case "IconNotice":
        return <IconNotice width={width} height={height} color={color} />
      case "IconNotificationList":
        return <IconNotificationList width={width} height={height} />
      case "IconNoNotifications":
        return <IconNoNotifications width={width} height={height} />
      case "IconOk":
        return <IconOk width={width} height={height} color={color} />
      case "IconPaperClip":
        return <IconPaperClip width={width} height={height} color={color} />
      case "IconOpsManage":
        return <IconOpsManage width={width} height={height} />
      case "IconOpsManageOn":
        return (
          <IconOpsManageOn
            width={width}
            height={height}
            color={color}
            border_color={border_color}
          />
        )
      case "IconPlus":
        return <IconPlus width={width} height={height} color={color} />
      case "IconProvisioners":
        return <IconProvisioners width={width} height={height} color={color} />
      case "IconRegistration":
        return <IconRegistration width={width} height={height} />
      case "IconRegistrationOn":
        return <IconRegistrationOn width={width} height={height} />
      case "IconRemove":
        return <IconRemove width={width} height={height} color={color} />
      case "IconRemoveModal":
        return <IconRemoveModal width={width} height={height} color={color} />
      case "IconSave":
        return <IconSave width={width} height={height} color={color} />
      case "IconSearch":
        return <IconSearch width={width} height={height} color={color} />
      case "IconSeeMore":
        return <IconSeeMore width={width} height={height} color={color} />
      case "IconServices":
        return <IconServices width={width} height={height} color={color} />
      case "IconUndo":
        return <IconUndo width={width} height={height} color={color} />
      case "IconUser":
        return <IconUser width={width} height={height} color={color} />

      case "IconValidate":
        return <IconValidate width={width} height={height} color={color} />
      case "IconValidationOn":
        return <IconValidationOn width={width} height={height} />
      case "IconUsersOn":
        return (
          <IconUsersOn
            width={width}
            height={height}
            color={color}
            border_color={border_color}
          />
        )
      case "IconUsers":
        return (
          <IconUser
            width={width}
            height={height}
            color={color}
            border_color={border_color}
          />
        )
      case "IconPasswordVisible":
        return <IconPasswordVisible width={width} height={height} />
      case "IconPasswordHidden":
        return <IconPasswordHidden width={width} height={height} />
      case "IconFilter":
        return <IconFilter width={width} height={height} />
      case "IconBilling":
        return <IconBilling width={width} height={height} />
      case "IconPriceList":
        return <IconPriceList width={width} height={height} />
      case "IconLiquidation":
        return <IconLiquidation width={width} height={height} />
      case "IconFinances":
        return <IconFinances width={width} height={height} color={color} />
      case "IconCopaymentsOn":
        return <IconCopaymentsOn width={width} height={height} />
      case "IconCopayments":
        return <IconCopayments width={width} height={height} />
      case "IconFolder":
        return <IconFolder width={width} height={height} color={color} />
      case "IconUsersOff":
        return <IconUsersOff width={width} height={height} />
      case "IconBillingOn":
        return <IconBillingOn width={width} height={height} />
      case "IconLiquidationOn":
        return <IconLiquidationOn width={width} height={height} />
      case "IconPriceListOn":
        return <IconPriceListOn width={width} height={height} />
      default:
        return <IconNotFound />
    }
  }

  return iconSwitch(icon)
}

export default Icon

export default interface PermissionsInterface {
  sections: {
    name: string
    sub_sections: {
      name: string
      view: boolean
      actions: {}
    }[]
  }[]
}

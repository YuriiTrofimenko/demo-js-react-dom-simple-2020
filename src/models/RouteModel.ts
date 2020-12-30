import { FC } from "react"

export default class RouteModel {
  public uri: string
  public name: string
  public component: FC
  constructor (uri: string, name: string, component: FC) {
    this.name = name
    this.uri = uri
    this.component = component
  }
}
import { IBase } from '../base/base'

export interface IUser extends IBase {
  email: string
  last_name?: string
  first_name?: string
}

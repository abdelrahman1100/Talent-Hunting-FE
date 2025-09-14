import { label } from 'yet-another-react-lightbox/*';
import { Company } from '../../company/CompanyList/types';
import { detail, Lockup } from './../LockupForm/types';
// import { Department } from './types';
import { create } from 'zustand';

// type PersonalInfo = {
//     location: string
//     title: string
//     birthday: string
//     phoneNumber: string
//     dialCode: string
//     address: string
//     postcode: string
//     city: string
//     country: string
//     facebook: string
//     twitter: string
//     pinterest: string
//     linkedIn: string
// }

// type OrderHistory = {
//     id: string
//     item: string
//     status: string
//     amount: number
//     date: number
// }

// type PaymentMethod = {
//     cardHolderName: string
//     cardType: string
//     expMonth: string
//     expYear: string
//     last4Number: string
//     primary: boolean
// }

// type Subscription = {
//     plan: string
//     status: string
//     billing: string
//     nextPaymentDate: number
//     amount: number
// }

// export type GetCustomersListResponse = {
//     list: Customer[]
//     total: number
// }

// export type Filter = {
//     purchasedProducts: string
//     purchaseChannel: Array<string>
// }

// export type Customer = {
//     id: string
//     name: string
//     firstName: string
//     lastName: string
//     email: string
//     img: string
//     role: string
//     lastOnline: number
//     status: string
//     personalInfo: PersonalInfo
//     orderHistory: OrderHistory[]
//     paymentMethod: PaymentMethod[]
//     subscription: Subscription[]
//     totalSpending: number
// }


// type Company = {
//   id: number
// }

// export type Department = {
//   id: number
//   status: "active" | "inactive" | string
//   created_by: number
//   last_updated_by: number | null
//   generated_date: string
//   last_updated_date: string
//   name: string
//   company: Company
// }

// export type GetDepartmentsListResponse = {
//   list: Department[]
//   total: number
// }
export type detail2={
   label: string
  value: string
 
}

export type createLockupRequest = {
  name:string,
  label:string,
  details:detail2[]
}
export type UpdateLockupRequest = {
  name?:string,
  label?:string,
  details?:detail2[]
}


// export type createCategoryResponse = {
//    id: number,
//     status: string,
//     created_by: null,
//     "last_updated_by": null,
//     "generated_date": "2025-08-16T17:51:05.795Z",
//     "last_updated_date": "2025-08-16T17:51:05.795Z",
//     "name": "Why Why",
//     "description": "this is kind of category"
// }

// export type Filter = {
//   status?: string            // active | inactive
//   name?: string              // text search
//   createdBy?: number         // user id
//   dateRange?: {              // between two dates
//     from: string
//     to: string
//   }
// }
export type LockupFilter = {
    name?: string
    status?: string
}

import { useEffect } from 'react'
import {  useLockupFormStore } from './store/LockUpFormStore'
import useLayoutGap from '@/utils/hooks/useLayoutGap'
import useResponsive from '@/utils/hooks/useResponsive'
import useSWR from 'swr'

import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { HiMinus } from 'react-icons/hi'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import isEmpty from 'lodash/isEmpty'

import type { ReactNode } from 'react'
import type {
  
    LockupFormSchema2,
    selectedLockUpDetails,
} from './types'
import type { TableQueries, CommonProps } from '@/@types/common'
import { set } from 'lodash'
import { Form, FormItem } from '@/components/ui/Form'
import { Container } from '@/components/shared'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import GeneralSection from './components/GeneralSection'
type LockUpFormSchema = {
    name: string,
    label: string,
    details: {
           label: string
        value: string
     
    }[]

}



type LockUpFormProps = {
    children: ReactNode
    onFormSubmit: (values: LockUpFormSchema) => void
    defaultValues?: LockupFormSchema2
    defaultLockUpDetails?: selectedLockUpDetails[]
    newOrder?: boolean
} & CommonProps

const validationSchema= z.object({
    name: z.string().min(1, 'Group Name is required'),
    label: z.string().min(1, 'Group Label is required'),
    details: z.array(
        z.object({
            value: z.string().min(1, 'Value is required'),
            label: z.string().min(1, 'Label is required'),
        }),
    ),
  
})

export type LockupFormSchema = z.infer<typeof validationSchema>

const LockupForm = (props: LockUpFormProps) => {
    const { onFormSubmit, children, defaultValues, defaultLockUpDetails } = props

    const { setLockupOption, setLockupList, setSelectedLockup } =
        useLockupFormStore()

    const { getTopGapValue } = useLayoutGap()

    const { larger } = useResponsive()

    // useSWR(
    //     [
    //         '/api/companies',
    //         {
    //             pageIndex: 1,
    //             pageSize: 10,
    //             query: '',
    //             sort: {
    //                 order: '',
    //                 key: '',
    //             },
    //         } as TableQueries,
    //     ],
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     ([_, params]) =>
    //         apiGetCompaniesList<GetCompanyListResponse, TableQueries>(params),
    //     {
    //         revalidateOnFocus: false,
    //         onSuccess: (resp) => {
    //             const list = resp.list.map(({ id, name, status }) => ({
    //                 label: name,
    //                 value: id,
    //                 // img: `data:image/jpeg;base64,${commercial_id}`,
    //                 status: status,
    //             }))
    //             setCompanyList(resp.list)
    //             setCompanyOption(list)
    //         },
    //     },
    // )

    const {
        handleSubmit,
        reset,
        watch,
        formState: { errors },
        control,
    } = useForm<LockupFormSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: defaultValues
            ? {
                  ...defaultValues,
                  details: defaultValues.details
                      ? defaultValues.details.map((item) => ({
                          value: item.value,
                          label: item.label,
                      }))
                      : undefined,
                //   commercial_id: defaultValues.commercial_id, // Base64
              }
            : undefined,
    })

    useEffect(() => {
        console.log('defaultLockUps', defaultValues)
        if (defaultLockUpDetails) {
            setSelectedLockup(defaultLockUpDetails)
        }
        if (!isEmpty(defaultValues)) {
            reset({
                ...defaultValues,
                details: defaultValues.details
                    ? defaultValues.details.map((item) => ({
                          value: item.value,
                          label: item.label,
                      }))
                    : undefined,
            })
        }
        return () => {
            setSelectedLockup([])
        }
    }, [defaultLockUpDetails, defaultValues, reset, setSelectedLockup])

    const onSubmit = (values: LockupFormSchema) => {
        onFormSubmit?.(values)
    }

    // const selectedPaymentMethod = watch('paymentMethod', '')
//    const onSubmit = (values: LockupFormSchema) => {
//         alert(JSON.stringify(values, null, 2))
//     }

    // const { fields, append, remove } = useFieldArray({
    //     name: 'details',
    //     control
    // })
    return (
        // <div className="flex">
          <>
            <Form
                layout='inline'
                // className="flex-1 flex flex-col "
                //  className="flex w-full h-full"
                containerClassName="flex flex-col w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Container>
                    {/* <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1"> */}
                            <GeneralSection
                                control={control}
                                errors={errors}
                            />
                        {/* </div>
            
                    </div> */}
                </Container>

               <div className='w-full'>
                       <BottomStickyBar >{children}</BottomStickyBar>
               </div>
            </Form>
       
          
          </>

        //   <Form layout="inline" onSubmit={handleSubmit(onSubmit)}>
           
        // </Form>
    )
}

export default LockupForm

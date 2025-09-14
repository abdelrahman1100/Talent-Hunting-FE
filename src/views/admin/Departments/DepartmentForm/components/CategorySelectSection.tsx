import { useState } from 'react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import Checkbox from '@/components/ui/Checkbox'
import Avatar from '@/components/ui/Avatar'
import Table from '@/components/ui/Table'
import ScrollBar from '@/components/ui/ScrollBar'
import AutoComplete from '@/components/shared/AutoComplete'
import useResponsive from '@/utils/hooks/useResponsive'
import classNames from '@/utils/classNames'
import { TbSearch } from 'react-icons/tb'
import { Controller } from 'react-hook-form'
import { FormItem } from '@/components/ui/Form'

import { useDepartmentFormStore } from '../store/DepartmentFormStore'
import type { Company, CompanyOption } from '../types'
import type { Department } from '../../DepartmentList/types'
import type { FormSectionBaseProps } from '../types'
import Tag from '@/components/ui/Tag/Tag'
import { set } from 'lodash'

const { Tr, Th, Td, THead, TBody } = Table

type DepartmentSelectSectionProps = FormSectionBaseProps

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const DepartmentSelectSection = ({
    control,
    errors,
}: DepartmentSelectSectionProps) => {
    const { companyOption, companyList } = useDepartmentFormStore()
    const [inputValue, setInputValue] = useState('')
    const [DepartmentsDialogOpen, setDepartmentsDialogOpen] = useState(false)
    const { smaller } = useResponsive()

    return (
        <Controller
            name="company_id"
            control={control}
            render={({ field }) => {
                const selected = companyList.find((c) => c.id === field.value)

                const selectCompany = (cat?: Company) => {
                    field.onChange(cat ? cat.id : '')
                }

                const handleOptionSelect = (option: CompanyOption) => {
                    const cat = companyList.find((c) => c.id === option.value)
                    selectCompany(cat)
                }

                const handleCompanyChecked = (
                    checked: boolean,
                    cat: Company,
                ) => {
                    if (checked) selectCompany(cat)
                    else if (field.value === cat.id) selectCompany(undefined)
                }

                return (
                    <>
                        <Card id="selectedDepartments " className="h-full">
                            <h4 className="mb-6">Select Company Department</h4>

                            <FormItem
                                invalid={Boolean(errors.company_id)}
                                errorMessage={errors.company_id?.message}
                                className="mb-4 mt-10"
                            >
                                <div className="flex items-center gap-2">
                                    <AutoComplete<CompanyOption>
                                        data={companyOption}
                                        optionKey={(c) => c.label}
                                        value={inputValue}
                                        renderOption={(option) => (
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    shape="round"
                                                    src={option.status}
                                                />
                                                <span>{option.label}</span>
                                            </div>
                                        )}
                                        suffix={
                                            <TbSearch className="text-lg" />
                                        }
                                        placeholder="Search product"
                                        onInputChange={setInputValue}
                                        onOptionSelected={handleOptionSelect}
                                    />

                                    <Button
                                        type="button"
                                        variant="solid"
                                        onClick={() =>
                                            setDepartmentsDialogOpen(true)
                                        }
                                    >
                                        Browse companies
                                    </Button>

                                    {field.value && (
                                        <Button
                                            type="button"
                                            // variant="twoTone"
                                            onClick={() =>
                                                selectCompany(undefined)
                                            }
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>

                                <Table compact={smaller.sm} className="mt-6">
                                    <THead>
                                        <Tr>
                                            <Th className="w-[70%]">Company</Th>
                                        </Tr>
                                    </THead>
                                    <TBody>
                                        {selected ? (
                                            <Tr key={selected.id}>
                                                <Td>
                                                    <div className="flex items-center gap-2">
                                                        {/* <Avatar shape="round" src={selected.status} /> */}
                                                        <div>
                                                            <div className="flex items-center">
                                                                <div className="heading-text font-bold me-3">
                                                                    {
                                                                        selected.name
                                                                    }
                                                                </div>
                                                                <Tag
                                                                    className={
                                                                        statusColor[
                                                                            selected
                                                                                .status
                                                                        ]
                                                                    }
                                                                >
                                                                    <span className="capitalize">
                                                                        {
                                                                            selected.status
                                                                        }
                                                                    </span>
                                                                </Tag>
                                                            </div>

                                                            {/* <div>
                                                                Description:{' '}
                                                                {<span>{selected.}</span>}
                                                            </div> */}
                                                        </div>
                                                    </div>
                                                </Td>
                                            </Tr>
                                        ) : (
                                            <Tr>
                                                <Td
                                                    className="text-center"
                                                    colSpan={3}
                                                >
                                                    No Company selected!
                                                </Td>
                                            </Tr>
                                        )}
                                    </TBody>
                                </Table>
                            </FormItem>
                        </Card>
                        <Dialog
                            isOpen={DepartmentsDialogOpen}
                            onClose={() => setDepartmentsDialogOpen(false)}
                            onRequestClose={() =>
                                setDepartmentsDialogOpen(false)
                            }
                        >
                            <div className="text-center mb-6">
                                <h4 className="mb-1">All Departments</h4>
                                <p>Add departments to Your Company</p>
                            </div>

                            <div className="mt-4">
                                <div className="mb-6">
                                    <ScrollBar
                                        className={classNames(
                                            'overflow-y-auto h-80',
                                        )}
                                    >
                                        {companyList.map((company) => (
                                            <div
                                                key={company.id}
                                                className="py-3 pr-5 rounded-lg flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="px-1">
                                                        <Checkbox
                                                            checked={
                                                                field.value ===
                                                                company.id
                                                            }
                                                            onChange={(val) =>
                                                                handleCompanyChecked(
                                                                    val,
                                                                    company,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {/* <Avatar size="lg" shape="round" src={category.status} /> */}
                                                        <div>
                                                            <p className="heading-text font-bold">
                                                                {company.name}
                                                            </p>
                                                            <p>
                                                                Status:{' '}
                                                                {company.status}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </ScrollBar>
                                </div>
                            </div>

                            <Button
                                block
                                type="button"
                                variant="solid"
                                onClick={() => setDepartmentsDialogOpen(false)}
                            >
                                Done
                            </Button>
                        </Dialog>
                    </>
                )
            }}
        />
    )
}

export default DepartmentSelectSection

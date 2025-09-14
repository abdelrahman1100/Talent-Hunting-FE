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

import { useCompanyFormStore } from '../store/CompanyFormStore'
import type { CategoryOption } from '../types'
import type { Category } from '../../CompanyList/types'
import type { FormSectionBaseProps } from '../types'
import Tag from '@/components/ui/Tag/Tag'

const { Tr, Th, Td, THead, TBody } = Table

type CategorySelectSectionProps = FormSectionBaseProps

const statusColor: Record<string, string> = {
    active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
    blocked: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
}

const CategorySelectSection = ({
    control,
    errors,
}: CategorySelectSectionProps) => {
    const { categoryOption, categoryList } = useCompanyFormStore()
    const [inputValue, setInputValue] = useState('')
    const [productsDialogOpen, setProductsDialogOpen] = useState(false)
    const { smaller } = useResponsive()

    return (
        <Controller
            name="category_id"
            control={control}
            render={({ field }) => {
              
                const selected = categoryList.find((c) => c.id === field.value)
               
                const selectCategory = (cat?: Category) => {
                    field.onChange(cat ? cat.id : undefined)
                }

                const handleOptionSelect = (option: CategoryOption) => {
                    const cat = categoryList.find((c) => c.id === option.value)
                    selectCategory(cat)
                }

                const handleProductChecked = (
                    checked: boolean,
                    cat: Category,
                ) => {
                    if (checked) selectCategory(cat)
                    else if (field.value === cat.id) selectCategory(undefined)
                }

                return (
                    <>
                        <Card id="selectedCategories">
                            <h4 className="mb-6">Select Company Category</h4>

                            <FormItem
                                invalid={Boolean(errors.category_id)}
                                errorMessage={errors.category_id?.message}
                                className="mb-4"
                            >
                                <div className="flex items-center gap-2">
                                    <AutoComplete<CategoryOption>
                                        data={categoryOption}
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
                                            setProductsDialogOpen(true)
                                        }
                                    >
                                        Browse Categories
                                    </Button>

                                    {field.value && (
                                        <Button
                                            type="button"
                                            // variant="twoTone"
                                            onClick={() =>
                                                selectCategory(undefined)
                                            }
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>

                                <Table compact={smaller.sm} className="mt-6">
                                    <THead>
                                        <Tr>
                                            <Th className="w-[70%]">
                                                Category
                                            </Th>
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

                                                            <div>
                                                                Description:{' '}
                                                                {
                                                                    selected.description
                                                                }
                                                            </div>
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
                                                    No Category selected!
                                                </Td>
                                            </Tr>
                                        )}
                                    </TBody>
                                </Table>
                            </FormItem>
                        </Card>
                        <Dialog
                            isOpen={productsDialogOpen}
                            onClose={() => setProductsDialogOpen(false)}
                            onRequestClose={() => setProductsDialogOpen(false)}
                        >
                            <div className="text-center mb-6">
                                <h4 className="mb-1">All Categories</h4>
                                <p>Add categories to Your Company</p>
                            </div>

                            <div className="mt-4">
                                <div className="mb-6">
                                    <ScrollBar
                                        className={classNames(
                                            'overflow-y-auto h-80',
                                        )}
                                    >
                                        {categoryList.map((category) => (
                                            <div
                                                key={category.id}
                                                className="py-3 pr-5 rounded-lg flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className="px-1">
                                                        <Checkbox
                                                            checked={
                                                                field.value ===
                                                                category.id
                                                            }
                                                            onChange={(val) =>
                                                                handleProductChecked(
                                                                    val,
                                                                    category,
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {/* <Avatar size="lg" shape="round" src={category.status} /> */}
                                                        <div>
                                                            <p className="heading-text font-bold">
                                                                {category.name}
                                                            </p>
                                                            <p>
                                                                Status:{' '}
                                                                {
                                                                    category.status
                                                                }
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
                                onClick={() => setProductsDialogOpen(false)}
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

export default CategorySelectSection

import Card from '@/components/ui/Card'

import { HiPencil } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { Tooltip } from '@/components/ui/Tooltip'
import {
    ADMIN_PREFIX_PATH,
    RECRUITMENT_PREFIX_PATH,
} from '@/constants/route.constant'
import Tag from '@/components/ui/Tag'
import { Company } from '../CompanyList/types'

const CompanySection = ({ company }: { company: Company }) => {
    const statusColor: Record<string, string> = {
        active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
        inactive: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
    }
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`${ADMIN_PREFIX_PATH}/company/company-edit/${company.id}`)
    }

    return (
        <Card>
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="mb-0 truncate">{company.name}</h3>
                        <Tag
                            className={
                                statusColor[company.status] ||
                                'bg-gray-200 dark:bg-gray-200 text-gray-900 dark:text-gray-900'
                            }
                        >
                            <span className="capitalize">{company.status}</span>
                        </Tag>
                    </div>
                    <div className="  mt-5 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 flex-wrap">
                        {/* <span>{company.category.name}</span> */}
                        {/* <span className="hidden sm:inline">•</span> */}
                        <div className="mr-2 rtl:ml-2">
                            <Tag prefix prefixClass="bg-emerald-500">
                                {company.location}
                            </Tag>
                        </div>
                        <div className="mr-2 rtl:ml-2">
                            <Tag prefix prefixClass="bg-emerald-500">
                                {company.category?.name || 'No Category'}
                            </Tag>
                        </div>
                    </div>
                </div>
                <Tooltip title="Edit opportunity">
                    <button
                        className="close-button button-press-feedback"
                        type="button"
                        onClick={handleEdit}
                    >
                        <HiPencil />
                    </button>
                </Tooltip>
            </div>

            <div className="flex justify-center">
                <hr className="mt-10 w-100 text-center" />
            </div>

            <div className="mt-5">
                <span className="font-bold ">
                    {company.category?.name || 'No Category'}
                </span>
            </div>
            <div
                className="mt-1  prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{
                    __html:
                        company.category?.description ||
                        'No category description available.',
                }}
            />

            <div className="flex justify-center">
                <hr className="mt-10 w-100 text-center" />
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/20">
                    <div className="text-sm text-gray-500 dark:text-gray-400 ">
                        Employee Count
                    </div>
                    <div className="mt-1 font-medium capitalize text-xs">
                        {`Count : ${company.employee_count}`}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default CompanySection

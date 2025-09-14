import Card from '@/components/ui/Card'

import { HiPencil } from 'react-icons/hi'
import { useNavigate } from 'react-router'
import { Tooltip } from '@/components/ui/Tooltip'
import {
    ADMIN_PREFIX_PATH,
} from '@/constants/route.constant'
import Tag from '@/components/ui/Tag'
import { Category } from '../CategoryList/types'

const CategorySection = ({ category }: { category: Category }) => {
    const statusColor: Record<string, string> = {
        active: 'bg-emerald-200 dark:bg-emerald-200 text-gray-900 dark:text-gray-900',
        inactive: 'bg-red-200 dark:bg-red-200 text-gray-900 dark:text-gray-900',
    }
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`${ADMIN_PREFIX_PATH}/category/category-edit/${category.id}`)
    }

    return (
        <Card className='h-[150%]'>
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="mb-0 truncate">{category.name}</h3>
                        <Tag
                            className={
                                statusColor[category.status] ||
                                'bg-gray-200 dark:bg-gray-200 text-gray-900 dark:text-gray-900'
                            }
                        >
                            <span className="capitalize">
                                {category.status}
                            </span>
                        </Tag>
                    </div>
                    <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 flex-wrap">
                        {/* <span>{category.description}</span> */}
                        {/* <span className="hidden sm:inline">•</span> */}
                        {/* <span className="capitalize">
                            {category.description}
                        </span> */}
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

            <div
                className="capitalize mt-4 prose prose-sm max-w-none dark:prose-invert font-semibold"
                dangerouslySetInnerHTML={{
                    __html: category.description || '',
                }}
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/20">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Category Type
                    </div>
                    <div className="mt-1 font-medium capitalize">
                        {category.name}
                    </div>
                </div>
                <div className="rounded border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/20">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Category Last Updated Date
                        {/* {category.last_updated_by} */}
                    </div>
                    <div className="mt-1 font-medium">
                        {/* how to format date  */}
                        {new Date(category.last_updated_date).toLocaleDateString()}
                                 {/* {FormData.category.last_updated_date} */}
                    </div>
                </div>
                {/* <div className="rounded border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/20">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Department
                    </div>
                    <div className="mt-1 font-medium">{category.name}</div>
                </div> */}
                {/* <div className="rounded border border-gray-200 dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-900/20">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        Publish Scope
                    </div>
                    <div className="mt-1 font-medium capitalize">
                        {category.name}
                    </div>
                </div> */}
            </div>
        </Card>
    )
}

export default CategorySection

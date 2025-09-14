import Button from '@/components/ui/Button'
import { TbCloudDownload, TbUserPlus } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import useCustomerList from '../hooks/useCategoryList'
import { CSVLink } from 'react-csv'
import { ADMIN_PREFIX_PATH } from '@/constants/route.constant'

const CategoryListActionTools = () => {
    const navigate = useNavigate()

    const { categoryList } = useCustomerList()

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <CSVLink
                className="w-full"
                filename="categoryList.csv"
                data={categoryList }
            >
                <Button
                    icon={<TbCloudDownload className="text-xl" />}
                    className="w-full"
                >
                    Download
                </Button>
            </CSVLink>
            <Button
                variant="solid"
                icon={<TbUserPlus className="text-xl" />}
                onClick={() => navigate(`${ADMIN_PREFIX_PATH}/category/category-create`)}
            >
                Add new Category
            </Button>
        </div>
    )
}

export default CategoryListActionTools

import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import OpportunitySection from './CategorySection'

import useSWR from 'swr'
import { useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import { Category } from '../CategoryList/types'
import { apiGetCategory } from '@/services/CategoryService'
import CategorySection from './CategorySection'

const { TabNav, TabList, TabContent } = Tabs

const OpportunityDetails = () => {
    const { id } = useParams()

    const { data: categoryData, isLoading: isCategoryLoading } =
        useSWR<Category>(
            [`api/categories/${id}`, { id: id as string }],
            ([_, params]: [string, { id: string }]) =>
                apiGetCategory({ id: params.id }),
            {
                revalidateOnFocus: false,
                revalidateIfStale: false,
            },
        )

    // const { data: applicationsData, isLoading: isApplicationsLoading } = useSWR<
    //     Application[]
    // >(
    //     [`recruitment/application/opportunity/${id}`, { id: id as string }],
    //     ([_, params]: [string, { id: string }]) =>
    //         apiGetApplicationsForOpportunity(params),
    //     {
    //         revalidateOnFocus: false,
    //         revalidateIfStale: false,
    //     },
    // )

    return (
        <Loading loading={isCategoryLoading}>
            {!isEmpty(categoryData) && (
                <div className="flex justify-center flex-col xl:flex-row">
                    <div className="w-[80%] ">
                        <CategorySection category={categoryData} />
                    </div>
                </div>
            )}
        </Loading>
    )
}

export default OpportunityDetails

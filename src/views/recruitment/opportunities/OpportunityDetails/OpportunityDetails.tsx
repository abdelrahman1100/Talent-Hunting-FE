import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import OpportunitySection from './OpportunitySection'
import ApplicationSection from './ApplicationSection'
import { apiGetOpportunity } from '@/services/OpportunitiesService'
import useSWR from 'swr'
import { useNavigate, useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import { apiGetApplicationsForOpportunity } from '@/services/ApplicationsService'
import { Opportunity } from '@/views/recruitment/opportunities/OpportunityList/types'
import type { Application } from './type'
import { RECRUITMENT_PREFIX_PATH } from '@/constants/route.constant'

const { TabNav, TabList, TabContent } = Tabs

const OpportunityDetails = () => {
    const navigate = useNavigate()

    const { id } = useParams()

    const { data: opportunityData, isLoading: isOpportunityLoading } =
        useSWR<Opportunity>(
            [`recruitment/opportunity/${id}`, { id: id as string }],
            ([_, params]: [string, { id: string }]) =>
                apiGetOpportunity({ id: params.id }),
            {
                revalidateOnFocus: false,
                revalidateIfStale: false,
            },
        )

    const { data: applicationsData, isLoading: isApplicationsLoading } = useSWR<
        Application[]
    >(
        [`recruitment/application/opportunity/${id}`, { id: id as string }],
        ([_, params]: [string, { id: string }]) =>
            apiGetApplicationsForOpportunity(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const handleViewMoreDetails = () => {
        navigate(
            `${RECRUITMENT_PREFIX_PATH}/applications/opportunity-applications/${id}`,
        )
    }

    return (
        <Loading loading={isOpportunityLoading || isApplicationsLoading}>
            {!isEmpty(opportunityData) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <OpportunitySection opportunity={opportunityData} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="applications">
                            <TabList>
                                <TabNav value="applications">
                                    Applications
                                </TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="applications">
                                    <ApplicationSection
                                        applications={applicationsData || []}
                                        maxItems={10}
                                        onViewMore={handleViewMoreDetails}
                                    />
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default OpportunityDetails

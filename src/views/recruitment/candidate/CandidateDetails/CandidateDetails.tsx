import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import UserSection from './UserSection'
import OverviewSection from './OverviewSection'
import SkillSection from './SkillSection'
import ExperienceSection from './ExperienceSection'
import EducationSection from './EducationSection'
import ApplicationSection from '../../opportunities/OpportunityDetails/ApplicationSection'
import { apiGetProfile } from '@/services/ProfileService' // Adjust import path
import { apiGetApplicationsForProfile } from '@/services/ApplicationsService'
import useSWR from 'swr'
import { useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import type { CandidateProfile } from './type' // Adjust import path
import type { Application } from '../../opportunities/OpportunityDetails/type'

const { TabNav, TabList, TabContent } = Tabs

const CandidateDetails = () => {
    const { id } = useParams()

    const { data, isLoading } = useSWR(
        ['/recruitment/profile/by-profile', { id: id as string }],
        ([_, params]) =>
            apiGetProfile<CandidateProfile, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            evalidateOnFocus: false,
        },
    )

    const { data: applicationsData, isLoading: isApplicationsLoading } = useSWR<
        Application[]
    >(
        ['/recruitment/application/profile', { id: id as string }],
        ([_, params]: [string, { id: string }]) =>
            apiGetApplicationsForProfile<Application[], { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    return (
        <Loading loading={isLoading || isApplicationsLoading}>
            {!isEmpty(data) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="min-w-[330px] 2xl:min-w-[400px]">
                        <UserSection user={data.user} profile={data} />
                    </div>
                    <Card className="w-full">
                        <Tabs defaultValue="overview">
                            <TabList>
                                <TabNav value="overview">Overview</TabNav>
                                <TabNav value="skills">Skills</TabNav>
                                <TabNav value="experience">Experience</TabNav>
                                <TabNav value="education">Education</TabNav>
                                <TabNav value="applications">History</TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="overview">
                                    <OverviewSection profile={data} />
                                </TabContent>
                                <TabContent value="skills">
                                    <SkillSection skills={data.skills} />
                                </TabContent>
                                <TabContent value="experience">
                                    <ExperienceSection
                                        experiences={data.experiences}
                                    />
                                </TabContent>
                                <TabContent value="education">
                                    <EducationSection
                                        educations={data.educations}
                                    />
                                </TabContent>
                                <TabContent value="applications">
                                    <ApplicationSection
                                        applications={applicationsData || []}
                                        maxItems={10}
                                        showViewMoreButton={false}
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

export default CandidateDetails

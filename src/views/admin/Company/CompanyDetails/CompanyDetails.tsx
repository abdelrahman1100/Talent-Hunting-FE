
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import useSWR from 'swr'
import { useParams } from 'react-router'
import isEmpty from 'lodash/isEmpty'
import { Company } from '../CompanyList/types'
import { apiGetCompany } from '@/services/CompanyService'
import CompanySection from './CompanySection'
import Card from '@/components/ui/Card'
import ImagePreview from './CompanyImageSection'

const { TabNav, TabList, TabContent } = Tabs

const CompanyDetails = () => {
    const { id } = useParams()

    const { data: companyData, isLoading: isCompanyLoading } =
        useSWR<Company>(
            [`recruitment/company/${id}`, { id: id as string }],
            ([_, params]: [string, { id: string }]) =>
                apiGetCompany({ id: params.id }),
            {
                revalidateOnFocus: false,
                revalidateIfStale: false,
            },
        )


    return (
        <Loading loading={isCompanyLoading}>
            {!isEmpty(companyData) && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <div className="w-full md:w-full  lg:w-full">
                        <CompanySection company={companyData} />
                    </div>
                    <Card className="w-full md:w-full lg:w-full">
                        <Tabs defaultValue="commercial">
                            <TabList>
                                <TabNav value="commercial">
                                    Commercial ID
                                </TabNav>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="commercial">

                                    <ImagePreview company={companyData} />
                                
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default CompanyDetails

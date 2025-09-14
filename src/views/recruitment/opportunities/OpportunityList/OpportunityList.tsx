import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import OpportunityListTable from './components/OpportunityListTable'
import OpportunityListActionTools from './components/OpportunityListActionTools'
import OpportunitiesListTableTools from './components/OpportunitiesListTableTools'
import OpportunityListSelected from './components/OpportunityListSelected'

const OpportunityList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Opportunities</h3>
                            <OpportunityListActionTools />
                        </div>
                        <OpportunitiesListTableTools />
                        <OpportunityListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <OpportunityListSelected />
        </>
    )
}

export default OpportunityList

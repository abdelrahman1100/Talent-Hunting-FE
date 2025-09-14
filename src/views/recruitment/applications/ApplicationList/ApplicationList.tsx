import { useParams } from 'react-router'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import ApplicationListActionTools from './components/ApplicationListActionTools'
import ApplicationsListTableTools from './components/ApplicationsListTableTools'
import ApplicationListTable from './components/ApplicationListTable'
import ApplicationListSelected from './components/ApplicationListSelected'

const ApplicationList = () => {
    const { id } = useParams()
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Applications</h3>
                            <ApplicationListActionTools />
                        </div>
                        <ApplicationsListTableTools />
                        <ApplicationListTable opportunityId={id} />
                    </div>
                </AdaptiveCard>
            </Container>
            <ApplicationListSelected />
        </>
    )
}

export default ApplicationList

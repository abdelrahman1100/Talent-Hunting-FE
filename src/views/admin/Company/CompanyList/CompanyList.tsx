import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import OrderListTable from './components/CompanyListTable'
import OrderListActionTools from './components/CompanyListActionTools'
import OrderListTableTools from './components/CompanyListTableTools'
import CompanyListSelected from './components/CompanyListSelected'

const OrderList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Companies</h3>
                            <OrderListActionTools />
                        </div>
                        <OrderListTableTools />
                        <OrderListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <CompanyListSelected />
        </>
    )
}

export default OrderList

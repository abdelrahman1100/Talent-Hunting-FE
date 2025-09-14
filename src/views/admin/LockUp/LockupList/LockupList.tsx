import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import CategoryListActionTools from './components/LockupListActionTools'
import CategoryListTableTools from './components/LockupListTableTools'
import CategoryListTable from './components/LockupListTable'
import CategoryListSelected from './components/LockupListSelected'
import LockupListSelected from './components/LockupListSelected'

const CategoryList = () => {
    return (
        <>
            <Container>
                <AdaptiveCard>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <h3>Category</h3>
                            <CategoryListActionTools />
                        </div>
                        <CategoryListTableTools />
                        <CategoryListTable />
                    </div>
                </AdaptiveCard>
            </Container>
            <LockupListSelected />
        </>
    )
}

export default CategoryList

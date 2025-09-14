import AdaptiveCard from '@/components/shared/AdaptiveCard'
import Container from '@/components/shared/Container'
import CategoryListActionTools from './components/DepartmentListActionTools'
import CategoryListTableTools from './components/DepartmentListTableTools'
import CategoryListTable from './components/DepartmentListTable'
import CategoryListSelected from './components/DepartmentListSelected'

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
            <CategoryListSelected />
        </>
    )
}

export default CategoryList

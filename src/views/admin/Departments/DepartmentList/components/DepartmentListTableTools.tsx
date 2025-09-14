// import useCategoryList from '../../CategoryList/hooks/useCategoryList'
import CategoryListSearch from './DepartmentListSearch'
import useDepartmentList from '../hooks/useDepartmentList'
import CategoryListTableFilter from './DepartmentListTableFilter'
import cloneDeep from 'lodash/cloneDeep'
const DepartmentListTableTools = () => {
    const { tableData, setTableData } = useDepartmentList()

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            setTableData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            setTableData(newTableData)
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <CategoryListSearch onInputChange={handleInputChange} />
            <CategoryListTableFilter />
        </div>
    )
}

export default DepartmentListTableTools

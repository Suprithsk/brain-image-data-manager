import DataTable from "../components/DataTable"
import Pagination from "../components/Pagination"
import TopBar from "../components/TopBar"

const HomePage = () => {
    return (
        <div>
            <TopBar />
            <DataTable />
            <Pagination />
        </div>
    )
}

export default HomePage
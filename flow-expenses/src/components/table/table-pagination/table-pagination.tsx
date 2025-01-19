import "./table-pagination.css";
import { GrFormNext,GrFormPrevious  } from "react-icons/gr";
interface TablePaginationProps {
  currentPage: number;
  changePage: (page: number) => void;
  totalPages: number;
}

function TablePagination({
  currentPage,
  changePage,
  totalPages,
}: TablePaginationProps) {
  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <GrFormPrevious size={18} color="black"/>
      </button>
      <span className="text-page">{currentPage}</span>
      <button
        className="pagination-button"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
       <GrFormNext size={18} color="black"/>
      </button>
    </div>
  );
}
export default TablePagination;

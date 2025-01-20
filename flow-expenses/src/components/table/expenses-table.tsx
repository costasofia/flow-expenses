import { useState } from "react";
import { Transaction } from "../../interfaces/interfaces";
import TablePagination from "../table/table-pagination/table-pagination"
import './table.css';
import { CiEdit } from "react-icons/ci";
interface ExpensesTableProps<Transaction> {
  headers: string[];
  rows: Transaction[];
  getCategoriesById: (id: number) => string | undefined;
  getExpenseById: (id:number) => string|undefined
  
}

function ExpensesTable(
 { headers, rows, getCategoriesById, getExpenseById}:ExpensesTableProps<Transaction>) {
  const itensPerPage = 2;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rows.length / itensPerPage);
 
  const startIndex = (currentPage - 1) * itensPerPage;
  const currentRows = rows.slice(startIndex, startIndex + itensPerPage);
  
  function changePage(page: number) {
      if (page >= 1 && page <= totalPages)
      setCurrentPage(page);
  }


  return (
<>
  <table>
    <thead>
      <tr>
        {headers.map((header, indexHeader) => (
          <th key={indexHeader}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {currentRows.map((item, index) => {
        return (
          <tr key={index}>
            
            <td>{item.description}</td>
            <td>{item.value}€</td>
            <td>{item.date}</td>
            <td>{getCategoriesById(item.idCategories)}</td>
            <td><button onClick={()=>getExpenseById(item.id)}><CiEdit /></button></td>
          </tr>
        );
      })}
    </tbody>
  </table>
  <TablePagination currentPage={currentPage} changePage={changePage} totalPages={totalPages}></TablePagination>
  </>
);
}
export default ExpensesTable;

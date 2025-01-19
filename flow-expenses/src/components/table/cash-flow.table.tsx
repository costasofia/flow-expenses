import { Transaction } from "../../interfaces/interfaces";
import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";
import './table.css';
import { useState } from "react";
import TablePagination from "./table-pagination/table-pagination";

interface CashFLowProps<Transaction> {
  headers: string[];
  rows: Transaction[];
  getCategoriesByName: (id: number) => string | undefined;
}
function CashFlow({ headers, rows, getCategoriesByName }: CashFLowProps<Transaction>) {

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
              <td>
                {item.type === "receipt" ? (
                  <TfiArrowCircleUp size={18} color="green"/>
                ) : (
                  <TfiArrowCircleDown size={18} color="red"/>
                )}
              </td>
              <td>{item.description}</td>
              <td>{item.value}€</td>
              <td>{item.date}</td>
              <td>{getCategoriesByName(item.idCategories)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    <TablePagination currentPage={currentPage} changePage={changePage} totalPages={totalPages}></TablePagination>
    </>
  );
}
export default CashFlow;

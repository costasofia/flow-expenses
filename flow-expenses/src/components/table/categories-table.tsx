import { useState } from "react";
import { Categories } from "../../interfaces/interfaces";
import "./table.css";
import TablePagination from "./table-pagination/table-pagination";

interface CategoriesTableProps<Categories> {
  headers: string[];
  rows: Categories[];
  toggleModal: () => void;
}

function CategoriesTable({
  headers,
  rows,
  toggleModal,
}: CategoriesTableProps<Categories>) {
  const itensPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(rows.length / itensPerPage);

  const startIndex = (currentPage - 1) * itensPerPage;
  const currentRows = rows.slice(startIndex, startIndex + itensPerPage);

  function changePage(page: number) {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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
                <td>{item.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <TablePagination
        currentPage={currentPage}
        changePage={changePage}
        totalPages={totalPages}
      ></TablePagination>
      <button onClick={toggleModal}>Adicionar</button>
    </>
  );
}
export default CategoriesTable;

import { useEffect, useState } from "react";
import "./expenses.css";
import { Categories, Transaction } from "../../interfaces/interfaces";
import axios from "axios";
import Layout from "../../components/layout/layout";
import ExpensesTable from "../../components/table/expenses-table";
import { FiPlusCircle } from "react-icons/fi";
import NewCategory from "../new-category/new-category";
import NewExpense from "../new-expense/new-expense";
function Expenses() {
  const [data, setData] = useState<Transaction[]>([]);
  const [dataCategories, setDataCategories] = useState<Categories[]>([]);
  const [idExpense, setIdExpense] = useState<number | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const id: string | null = localStorage?.getItem("idUser");
 
  const headers = ["Descrição", "Valor", "Data", "Categoria", ""];

  function toggleModal() {
    setOpenModal(!openModal);
  }
  function getExpenses(): Promise<Transaction[]> {
    return axios
      .get<Transaction[]>("http://localhost:3000/expenses", {
        params: { idUser: id },
      })
      .then((result) => {
        console.log(result.data);
        return result.data;
      });
  }
  function getCategories(): Promise<Categories[]> {
    return axios
      .get<Categories[]>("http://localhost:3000/categories")
      .then((result) => {
        return result.data;
      });
  }

  function convertDate(dateString: string): Date {
    return new Date(dateString);
  }
  useEffect(() => {
    const fetchData = async () => {
      const expenses = await getExpenses();
      const categories = await getCategories();

      const results = [...expenses].sort((a, b) => {
        return convertDate(b.date).getTime() - convertDate(a.date).getTime();
      });

      setData(results);
      setDataCategories(categories);
    };

    fetchData();
  }, []);

  function getCategoriesById(id: number): string | undefined {
    const category = dataCategories.find((category) => category.id === id);
    return category?.name;
  }

  function getExpenseById(id: number): string | undefined {
    console.log(id);
    setIdExpense(id);
    toggleModal();
    const expense = data.find((item) => (item.id = id));
    return expense?.date;
  }
  return (
    <div>
      <Layout />
      <div className="container">
        <h1 className="title">Despesas</h1>
        <button className="btn-addExpenses" onClick={toggleModal}>
          <FiPlusCircle size={24} color="black" />
        </button>
      </div>
      <div className="box">
        <div className="container-tables">
          <div className="container-tableLeft">
            <div className="section-table-left">
              <ExpensesTable
                headers={headers}
                rows={data}
                getCategoriesById={getCategoriesById}
                getExpenseById={getExpenseById}
              />
              {openModal && <NewExpense closeModal={toggleModal} idExpense={idExpense ?? 0}></NewExpense>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Expenses;

import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/navbar/navbar";

import { TfiArrowCircleDown, TfiArrowCircleUp } from "react-icons/tfi";

import "./home.css";
import CashFlow from "../../components/table/cash-flow.table";
import { Transaction, Categories } from "../../interfaces/interfaces";
import CategoriesTable from "../../components/table/categories-table";
import NewCategory from "../new-category/new-category";

function Home() {
  const [data, setData] = useState<Transaction[]>([]);
  const [dataCategories, setDataCategories] = useState<Categories[]>([]);
  const [totalExpenses, setTotalExpenses] = useState({});
  const [totalReceipts, setTotalReceipts] = useState({});
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState(false);

  
   const id: string| null =localStorage?.getItem('idUser')
  function toggleModal() {
    setShowModal(!showModal);
  }

  const [openSideBar, setOpenSideBar] = useState(false);
    function toggleSideBar(){
        setOpenSideBar(!openSideBar);
    }
  const headersCashFlow = ["","Descrição", "Valor", "Data", "Categoria"];
  const headersCategory = ["Categorias"]
  function getExpenses(): Promise<Transaction[]> {
    return axios
    .get<Transaction[]>("http://localhost:3000/expenses", {
      params: { idUser: id }, 
    })
      .then((result) => {
        console.log(result.data);
        return result.data.map((item) => ({ ...item, type: "expense" }));
      });
  }

  function getReceipts(): Promise<Transaction[]> {
    return axios
    .get<Transaction[]>("http://localhost:3000/receipts", {
      params: { idUser: id }, 
    })
      .then((result) => {
        console.log(result.data);
        return result.data.map((item) => ({ ...item, type: "receipt" }));
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
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(day, month - 1, year);
  }

  function handleLogout() {
    localStorage.removeItem('idUser');
    console.log('idUser após logout:', localStorage.getItem('idUser')); // Deve ser null
    window.location.href = '/login';    
  }
  useEffect(() => {
    const fetchData = async () => {
      const expenses = await getExpenses();
      const receipts = await getReceipts();
      const categories = await getCategories();

      const combinedResults = [...expenses, ...receipts].sort((a, b) => {
        return convertDate(b.date).getTime() - convertDate(a.date).getTime();
      });

      setData(combinedResults);
      setDataCategories(categories);
      const initialValue = 0;
      setTotalExpenses(
        expenses.reduce(
          (accumulator, currentValue) => accumulator + currentValue.value,
          initialValue
        )
      );
      setTotalReceipts(
        receipts.reduce(
          (accumulator, currentValue) => accumulator + currentValue.value,
          initialValue
        )
      );
    };

    fetchData();
  }, []);

  function getCategoriesByName(id: number): string | undefined {
    const category = dataCategories.find((category) => category.id === id);
    return category?.name;
  }

  
  console.log(data);
  return (
    <div>
      <NavBar statusSideBar={openSideBar} toggleSideBar={toggleSideBar} title="FlowExpenses" handleLogout={handleLogout}></NavBar>
      <div className="box">
        <div className="container-box">
          <div className="container-leftside">
            <div className="section">
              <h1>Despesas</h1>
              <span className="span-negative">{totalExpenses.toString()} €</span>
            </div>
            <div className="section">
              <h1>Receitas</h1>
              <span className="span-positive">{totalReceipts.toString()} €</span>
            </div>
          </div>
          <div className="separator"></div>
          <div className="container-rightside">
            <div className="section">
              <h1>Despesas</h1>
              <button
                onMouseEnter={() => setShowMessage(true)}
                onMouseLeave={() => setShowMessage(false)}
              >
                <TfiArrowCircleDown />
              </button>
              {showMessage && (
                <div
                  style={{
                    position: "absolute",
                    top: "90px",
                    left: "50%",
                    transform: "translate(50%, 50%)",
                    padding: "10px",
                    backgroundColor: "#333",
                    color: "white",
                    borderRadius: "5px",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Mensagem ao passar o mouse
                </div>
              )}
            </div>
            <div className="section">
              <h1>Receitas</h1>
              <button>
                <TfiArrowCircleUp />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="box">
        <div className="container-tables">
          <div className="container-tableLeft">
            <div className="section-table-left">
             <CashFlow headers={headersCashFlow} rows={data} getCategoriesByName={getCategoriesByName}></CashFlow>
            </div>
          </div>
          <div className="container-tableRight">
            <div className="section-table-right">
              <CategoriesTable headers={headersCategory} rows={dataCategories} toggleModal={toggleModal} ></CategoriesTable>
              {showModal && (
                 <NewCategory closeModal={toggleModal} loadCategories={getCategories}></NewCategory>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;

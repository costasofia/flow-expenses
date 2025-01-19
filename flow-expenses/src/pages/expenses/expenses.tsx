import { useEffect, useState } from "react";
import "./expenses.css";
import { Categories, Transaction } from "../../interfaces/interfaces";
import axios from "axios";
import Layout from "../../components/layout/layout";


function Expenses() {
  
  const [data, setData] = useState<Transaction[]>([]);
  const [dataCategories, setDataCategories] = useState<Categories[]>([]);
  const id: string| null =localStorage?.getItem('idUser')

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
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(day, month - 1, year);
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
  return (
    <div>
        <Layout></Layout>
        <div className="container">
            <h1>Despesas</h1>

        </div>
       
    </div>
  )
}
export default Expenses;

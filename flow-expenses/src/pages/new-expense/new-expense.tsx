import Modal from "../../components/modal/modal";
import Input from "../../components/input/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { Categories, Expenses } from "../../interfaces/interfaces";
import Select from "../../components/select/select";

interface NewCategoryProps {
  closeModal: () => void;
  idExpense?: number;
}
interface Option {
  label: string;
  value: string | number;
}
function NewExpense({ closeModal, idExpense }: NewCategoryProps) {
  const id: number = localStorage?.getItem("idUser")
    ? Number(localStorage.getItem("idUser"))
    : 0;
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Selecione uma opção");
  const [dataCategories, setDataCategories] = useState<Categories[]>([]);
  const [formData, setFormData] = useState<{
    description: string;
    value: string;
    idCategories: number;
    date: string;
    idUser: number;
  }>({
    description: "",
    value: "",
    idCategories: 0,
    date: "",
    idUser: id,
  });
  const [response, setResponse] = useState(null);

  function getCategories(): Promise<Categories[]> {
    return axios
      .get<Categories[]>("http://localhost:3000/categories")
      .then((result) => result.data);
  }
  function resetForm() {
    setFormData({
      description: "",
      value: "",
      idCategories: 0,
      date: "",
      idUser: id,
    });
    setSelectedOption("Selecione uma opção");
  }

  function handleOpenModal() {
    if (!idExpense) {
      resetForm();
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      setDataCategories(categories);
    };
    fetchData();
  }, []);

  function selectAnOption(option: Option) {
    setSelectedOption(option.label);
    setFormData((prevFormData) => ({
      ...prevFormData,
      idCategories: Number(option.value),
    }));
  }

  const handleSelectChange = (option: Option) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      idCategories: Number(option.value),
    }));
  };
  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      if (idExpense) {
        const response = await axios.put(
          `http://localhost:3000/expenses/${idExpense}`,
          {
            description: formData.description,
            value: formData.value,
            idCategories: formData.idCategories,
            date: formData.date,
            idUser: id,
          }
        );
        setResponse(response.data);
      } else {
        const response = await axios.post("http://localhost:3000/expenses/", {
          description: formData.description,
          value: formData.value,
          idCategories: formData.idCategories,
          date: formData.date,
          idUser: id,
        });
        setResponse(response.data);
      }
    } catch (e) {
      console.log("error", e);
    } finally {
      closeModal();
    }
  };
  useEffect(() => {
    if (idExpense && dataCategories.length > 0) {
      const fetchExpense = async () => {
        const expenseResponse = await axios.get(
          `http://localhost:3000/expenses/${idExpense}`
        );
        const { description, value, idCategories, date } = expenseResponse.data;

        setFormData({
          description,
          value,
          idCategories,
          date,
          idUser: id,
        });

        const selectedCategoryOption = dataCategories.find(
          (category) => category.id === idCategories
        );

        setSelectedOption(selectedCategoryOption?.name || "Selecione uma opção");
      };

      fetchExpense();
    }
  }, [idExpense, dataCategories.length]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getCategories();
      setDataCategories(categories);
    };

    fetchData();
  }, []);
  return (
    <Modal
      title="Adicionar nova despesa"
      onClose={closeModal}
      onSave={onSubmit}
      onOpen={handleOpenModal}
    >
      <form>
        <Input
          label="Insira a descrição da despesa"
          type="text"
          name="description"
          autoComplete="none"
          onChange={handleChange}
          value={formData.description || ""}
        />
        <Input
          label="Insira o valor da despesa"
          type="text"
          name="value"
          autoComplete="none"
          onChange={handleChange}
          value={String(formData.value) || ""}
        />
        <Input
          label="Insira a data da despesa"
          type="text"
          name="date"
          autoComplete="none"
          onChange={handleChange}
          value={formData.date || ""}
        />
         <Select
          options={dataCategories.map((category) => ({
            label: category.name, // Exibindo o nome da categoria
            value: category.id, // O id da categoria como value
          }))}
          value={selectedOption} // Usando o id da categoria selecionada
          onChange={selectAnOption} // Alterando a categoria selecionada
        />
      </form>
    </Modal>
  );
}

export default NewExpense;

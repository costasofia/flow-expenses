interface NewCategoryProps {
  closeModal: () => void;
  loadCategories: ()=>  void;
}
import Modal from "../../components/modal/modal";
import Input from "../../components/input/input";
import { useState } from "react";
import axios from "axios";

function NewCategory({ closeModal, loadCategories }: NewCategoryProps) {
  const [formData, setFormData] = useState({
    name: "",
  });
  const [response, setResponse] = useState(null);
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const onSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try{
        const response = await axios.post('http://localhost:3000/categories/',{
            name: formData.name
        });
        setResponse(response.data)
    }catch(e){
        console.log('error', e)
    }finally{
        closeModal();
        loadCategories();
    }
  };

  return (
    <Modal
      title="Adicionar nova categoria"
      onClose={closeModal}
      onSave={onSubmit}
    >
      <form>
        <Input
          label="Insira o nome da categoria"
          type="text"
          name="name"
          autoComplete="none"
          onChange={handleChange}
          value={formData.name}
        ></Input>
      </form>
    </Modal>
  );
}
export default NewCategory;

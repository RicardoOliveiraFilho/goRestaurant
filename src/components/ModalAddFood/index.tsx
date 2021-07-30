import { ChangeEvent, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface ModalAddFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleAddFood: (food: Food) => void;
}

type Food = {
  image: string;
  name: string;
  price: string;
  description: string;
}

export function ModalAddFood({ isOpen, setIsOpen, handleAddFood }: ModalAddFoodProps) {
  const initialData: Food = {
    image: '',
    name: '',
    price: '',
    description: ''
  }
  const [newFood, setNewFood] = useState<Food>(initialData);
  
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fieldName = event.target.getAttribute('name');

    if (fieldName) {
      setNewFood({
        ...newFood,
        [fieldName]: event.target.value,
      })
    }
  }

  function handleSubmit() {
    handleAddFood(newFood);
    setNewFood(initialData);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input
          name="image"
          placeholder="Cole o link aqui"
          value={newFood.image}
          onChange={(event) => handleChange(event)}
        />

        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          value={newFood.name}
          onChange={(event) => handleChange(event)}
        />
        
        <Input
          name="price"
          placeholder="Ex: 19.90"
          value={newFood.price}
          onChange={(event) => handleChange(event)}
        />

        <Input
          name="description"
          placeholder="Descrição"
          value={newFood.description}
          onChange={(event) => handleChange(event)}
        />

        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
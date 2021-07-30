import { ChangeEvent, useEffect, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface ModalEditFoodProps {
  isOpen: boolean;
  editingFood: IFood;
  setIsOpen: () => void;
  handleUpdateFood: (food: FoodInput) => void;
}

interface FoodInput  {
  image: string;
  name: string;
  price: string;
  description: string;
}

interface IFood extends FoodInput {
  id: number;
  available: boolean;
}

export function ModalEditFood({ isOpen, editingFood, setIsOpen, handleUpdateFood }: ModalEditFoodProps) {
  const [foodEdited, setFoodEdited] = useState<IFood>({} as IFood);

  useEffect(() => {
    setFoodEdited(editingFood);
  }, [editingFood]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const fieldName = event.target.getAttribute('name');

    if (fieldName) {
      setFoodEdited({
        ...foodEdited,
        [fieldName]: event.target.value,
      })
    }
  }

  function handleSubmit() {
    handleUpdateFood(foodEdited);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit}>
        <h1>Editar Prato</h1>
        
        <Input
          name="image"
          placeholder="Cole o link aqui"
          value={foodEdited.image}
          onChange={(event) => handleChange(event)}
        />

        <Input
          name="name"
          placeholder="Ex: Moda Italiana"
          value={foodEdited.name}
          onChange={(event) => handleChange(event)}
        />
        
        <Input
          name="price"
          placeholder="Ex: 19.90"
          value={foodEdited.price}
          onChange={(event) => handleChange(event)}
        />

        <Input
          name="description"
          placeholder="Descrição"
          value={foodEdited.description}
          onChange={(event) => handleChange(event)}
        />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
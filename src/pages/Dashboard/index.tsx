import { useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { AxiosResponse } from 'axios';

interface FoodInput {
  image: string;
  name: string;
  price: string;
  description: string;
}

interface IFood extends FoodInput {
  id: number;
  available: boolean;
}

export function Dashboard() {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [editingFood, setEditingFood] = useState<IFood>({} as IFood);

  useEffect(() => {
    fetchFoods();
  }, []);

  async function fetchFoods() {
    const foodsAPI: IFood[] = await api.get('/foods')
      .then((response: AxiosResponse) => {
        return response.data;
      });
    
    setFoods(foodsAPI);
  }

  async function handleAddFood(food: FoodInput) {
    try {
      const newFood: IFood = await api.post('/foods', {
        ...food,
        available: true,
      }).then((response: AxiosResponse) => {
        return response.data;
      });

      setFoods([...foods, newFood]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: FoodInput) {
    try {
      const foodUpdated: IFood = await api.put(
        `/foods/${editingFood.id}`, {
          ...editingFood,
          ...food,
      }).then((response: AxiosResponse) => {
        return response.data;
      });

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.id ? f : foodUpdated,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteFood(id: number) {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  function toggleEditModal() {
    setEditModalOpen(!editModalOpen);
  }

  function handleEditFood(food: IFood) {
    setEditingFood(food);
    setEditModalOpen(true);
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <Food
              key={food.id}
              food={food}
              handleDelete={() => handleDeleteFood(food.id)}
              handleEditFood={() => handleEditFood(food)}
            />
          ))}
      </FoodsContainer>
    </>
  );
}
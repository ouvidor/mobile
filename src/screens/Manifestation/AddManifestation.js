import React, { useState, useEffect } from 'react';
import { getCategories, getTypes } from '../../helpers';
import {
  ScrollableContainer,
  LabeledInput,
  Button,
  ScrollableContainerWithLoading,
} from '../../components';

export default function AddManifestation() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [categories, setCategories] = useState();
  const [types, setTypes] = useState();

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      setCategories(data);
    }
    async function fetchTypes() {
      const data = await getTypes();
      setTypes(data);
    }
    fetchCategories();
    fetchTypes();
  }, []);

  function addManifestation() {
    console.log('BORA CRIAR UMA MANIFESTAÇÃO!!!!!!!!!!!!!');
    getCategories();
  }

  return (
    <ScrollableContainerWithLoading>
      <LabeledInput
        labelProps={{ label: 'Título' }}
        inputProps={{
          value: title,
          onChangeText: setTitle,
          // onFocus: () => clearOnFocus('nome'),
          // errorMessage: erro.nome,
        }}
      />
      <LabeledInput
        labelProps={{ label: 'Categoria da manifestação' }}
        inputProps={{
          value: category,
          onChangeText: setCategory,
          // onFocus: () => clearOnFocus('nome'),
          // errorMessage: erro.nome,
        }}
      />
      <LabeledInput
        labelProps={{ label: 'Tipo de manifestação' }}
        inputProps={{
          value: type,
          onChangeText: setType,
          // onFocus: () => clearOnFocus('nome'),
          // errorMessage: erro.nome,
        }}
      />
      <LabeledInput
        labelProps={{ label: 'Descrição do problema' }}
        inputProps={{
          value: description,
          onChangeText: setDescription,
          // onFocus: () => clearOnFocus('nome'),
          // errorMessage: erro.nome,
          multiline: true,
          numberOfLines: 4,
        }}
      />
      <Button
        touchableProps={{
          onPress: addManifestation,
        }}
        textProps={{ title: 'Criar manifestação, disgraça' }}
      />
    </ScrollableContainerWithLoading>
  );
}

// {
//   "title": "O bagulho tá estranho por aqui",
//   "description": "Ouço tiros a todo momento.",
//   "categories_id": [5],
//   "type_id": 2,
//   "latitude": -22.9242297,
//   "longitude": -42.0406372
// }

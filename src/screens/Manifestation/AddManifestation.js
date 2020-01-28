import React, { useState, useEffect } from 'react';
import { getCategories, getTypes } from '../../helpers';
import {
  LabeledInput,
  Button,
  ScrollableContainerWithLoading,
  Select,
} from '../../components';

export default function AddManifestation() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [categories, setCategories] = useState();
  const [types, setTypes] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories();
      const orderedCategories = data.map(c => ({
        value: c.id,
        label: c.title,
      }));
      setCategories(orderedCategories);
    }
    async function fetchTypes() {
      const data = await getTypes();
      const orderedTypes = data.map(c => ({
        value: c.id,
        label: c.title,
      }));
      setTypes(orderedTypes);
    }
    fetchCategories();
    fetchTypes();
  }, []);

  useEffect(() => {
    if (categories && types) {
      setLoading(false);
    }
  }, [categories, types]);

  function addManifestation() {
    getCategories();
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      <LabeledInput
        labelProps={{ label: 'Título' }}
        inputProps={{
          value: title,
          onChangeText: setTitle,
          // onFocus: () => clearOnFocus('nome'),
          // errorMessage: erro.nome,
        }}
      />
      <Select
        label="Categoria da manifestação"
        blankOption="Selecione uma categoria"
        options={categories}
        onSelect={option => setCategory(option.value)}
      />
      <Select
        label="Tipo de manifestação"
        blankOption="Selecione um tipo"
        options={types}
        onSelect={option => setType(option.value)}
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

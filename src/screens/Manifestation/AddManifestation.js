import React, { useState, useEffect } from 'react';
import { getCategories, getTypes } from '../../helpers';
import {
  LabeledInput,
  Button,
  ScrollableContainerWithLoading,
  Select,
  SelectCheckbox,
} from '../../components';
import Api from '../../services/Api';
import Location from '../../services/Location';

export default function AddManifestation() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState([]);
  const [type, setType] = useState();
  const [categories, setCategories] = useState();
  const [types, setTypes] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);

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

  async function addManifestation() {
    setBtnLoading(true);
    const requiredData = {
      title: { value: title, field: 'title' },
      description: { value: description, field: 'description' },
      category: {
        value: category.length > 0 ? category : false,
        field: 'categories_id',
      },
      type: { value: type, field: 'type_id' },
    };

    const errors = {};

    Object.keys(requiredData).map(key => {
      const entry = requiredData[key];
      if (!entry.value) {
        errors[key] = entry.errorMessage
          ? entry.errorMessage
          : 'Campo inválido';
      }
    });

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setBtnLoading(false);
    } else {
      const data = {};
      Object.keys(requiredData).map(key => {
        const entry = requiredData[key];
        data[entry.field] = entry.value;
      });

      Location.getCurrentPosition(location => {
        data.latitude = location.coords.latitude;
        data.longitude = location.coords.longitude;
      });

      const add = await Api.post('/manifestation', data);
      setBtnLoading(false);
    }
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      <LabeledInput
        labelProps={{ label: 'Título' }}
        inputProps={{
          value: title,
          onChangeText: setTitle,
          onBlur: () =>
            setError({
              ...error,
              title: title ? false : 'Título é obrigatório',
            }),
          onFocus: () => setError({ ...error, title: false }),
          errorMessage: error.title,
        }}
      />
      <SelectCheckbox
        label="Categoria da manifestação"
        blankOption="Selecione uma categoria"
        options={categories}
        onSelect={selectedCategories =>
          setCategory(Object.keys(selectedCategories))
        }
        onPress={() =>
          setError({
            ...error,
            category: category ? false : 'Campo obrigatório',
          })
        }
        errorMessage={error.category}
      />
      <Select
        label="Tipo de manifestação"
        blankOption="Selecione um tipo"
        options={types}
        onSelect={selectedType => {
          setType(selectedType.value);
          setError({ ...error, type: false });
        }}
        errorMessage={error.type}
      />
      <LabeledInput
        labelProps={{ label: 'Descrição do problema' }}
        inputProps={{
          value: description,
          onChangeText: setDescription,
          onBlur: () =>
            setError({
              ...error,
              description: description ? false : 'Descrição é obrigatório',
            }),
          onFocus: () => setError({ ...error, description: false }),
          errorMessage: error.description,
          multiline: true,
          numberOfLines: 4,
        }}
      />
      <Button
        touchableProps={{
          onPress: addManifestation,
        }}
        textProps={{
          title: 'Criar manifestação, disgraça',
          loading: btnLoading,
        }}
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

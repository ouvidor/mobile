/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { getCategories, getTypes } from '../../helpers';
import {
  LabeledInput,
  Button,
  ScrollableContainerWithLoading,
  Select,
  SelectCheckbox,
  CenteredContainer,
  Text,
} from '../../components';
import Api from '../../services/Api';
import Location from '../../services/Location';
import SelectImage from '../../components/Camera/SelectImage';

export default function AddManifestation({ navigation }) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState([]);
  const [type, setType] = useState();
  const [categories, setCategories] = useState();
  const [types, setTypes] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  /** Hook responsável por garantir que tenhamos
   * as categorias e os tipos de manifestação.
   */
  useEffect(() => {
    if (categories && types) {
      setLoading(false);
    }
  }, [categories, types]);

  /**
   * Hook responsável por resetar o estado de success para false após
   * mudança de tela.
   */
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setSuccess(false);
      setTitle(null);
      setDescription(null);
      setCategory(null);
      setType(null);
      setImages(null);
    });

    return unsubscribe;
  }, [navigation]);

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

      Location.getCurrentPosition(async location => {
        data.latitude = location.coords.latitude;
        data.longitude = location.coords.longitude;

        const add = await Api.post('/manifestation', data);

        /**
         * Checando se add foi bem sucedido. Checo apenas por um id na resposta.
         * Tendo um id na resposta, assumo que add foi bem sucedido
         */
        if (add.id && images.length > 0) {
          const imagesData = new FormData();

          images.map(image => {
            const file = {
              uri: image.uri,
              name: image.fileName,
              type: image.type,
            };

            imagesData.append('file', file);
          });
          imagesData.append('manifestation_id', add.id);

          const addFile = await Api.post('/files', imagesData);
        }

        setSuccess(add.id !== null);
        setBtnLoading(false);
      });
    }
  }

  function handleImageSelection(data) {
    setImages(data);
  }

  if (success) {
    return (
      <CenteredContainer>
        <Text>Manifestação cadastrada!</Text>
      </CenteredContainer>
    );
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
      <SelectImage onSelect={handleImageSelection} />

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

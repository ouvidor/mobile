import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { getCategories, getTypes } from '../../helpers';
import {
  LabeledInput,
  Button,
  ScrollableContainerWithLoading,
  Select,
  SelectCheckbox,
  Text,
} from '../../components';
import Api from '../../services/Api';
import Location from '../../services/Location';
import FilesInput from '../../components/FilesInput';

export default function AddManifestation({ navigation }) {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState([]);
  const [type, setType] = useState();
  const [categories, setCategories] = useState();
  const [types, setTypes] = useState();
  const [files, setFiles] = useState([]);
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
      setTitle(null);
      setDescription(null);
      setCategory(null);
      setType(null);
      setFiles([]);
      setBtnLoading(false);
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

    for (const key in requiredData) {
      if (!requiredData[key].value) {
        errors[key] = requiredData[key].errorMessage
          ? requiredData[key].errorMessage
          : 'Campo inválido';
      }
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setBtnLoading(false);
    } else {
      const data = {};

      for (const key in requiredData) {
        if (requiredData[key]) {
          const entry = requiredData[key];
          data[entry.field] = entry.value;
        }
      }

      Location.getCurrentPosition(async location => {
        data.latitude = location.coords.latitude;
        data.longitude = location.coords.longitude;

        const createdManifestation = await Api.post('/manifestation', data);

        if (createdManifestation.id === null) {
          showMessage({
            message: 'Não foi possível criar manifestação',
            type: 'danger',
            icon: { icon: 'danger', position: 'left' },
            duration: 3000,
          });
          setBtnLoading(false);
          return;
        }

        /**
         * Checando se add foi bem sucedido. Checo apenas por um id na resposta.
         * Tendo um id na resposta, assumo que add foi bem sucedido
         */
        if (createdManifestation.id && files.length > 0) {
          const filesFormData = new FormData();

          for (const file of files) {
            filesFormData.append('file', file);
          }

          const filesSent = await Api.post(
            `/files/manifestation/${createdManifestation.id}`,
            filesFormData
          );

          if ('error' in filesSent || 'status' in filesSent) {
            showMessage({
              message: 'Falha em envio de arquivo',
              type: 'danger',
              icon: { icon: 'danger', position: 'left' },
              duration: 3000,
            });
            setBtnLoading(false);
            return;
          }
        }

        showMessage({
          message: 'Manifestação criada com sucesso!',
          type: 'success',
          icon: { icon: 'success', position: 'left' },
          duration: 2000,
        });
        setBtnLoading(false);
        navigation.navigate('Home');
      });
    }
  }

  return (
    <ScrollableContainerWithLoading loading={loading}>
      <View>
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
          Criar Manifestação
        </Text>
      </View>

      <LabeledInput
        label="Título"
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
        label="Descrição do problema"
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
      <FilesInput formFiles={files} setFormFiles={setFiles} />

      <Button
        touchableProps={{
          onPress: addManifestation,
        }}
        textProps={{
          title: 'Criar manifestação',
          loading: btnLoading,
        }}
      />
    </ScrollableContainerWithLoading>
  );
}

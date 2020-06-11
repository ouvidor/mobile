/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Foundation from 'react-native-vector-icons/Foundation';
import { getCategories, getTypes } from '../../helpers';
import {
  LabeledInput,
  Button,
  Select,
  SelectCheckbox,
  Text,
} from '../../components';
import { ContainerWithLoading } from '../../components/Container';
import { HistoricList } from '../../components/Historic';
import colors from '../../utils/colors';

import Api from '../../services/Api';

let titleFilter = null;
let typeFilter = null;
let categoryFilter = null;

export default function SearchManifestation({ navigation }) {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState([]);
  const [type, setType] = useState();
  const [categories, setCategories] = useState();
  const [types, setTypes] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [manifestations, setManifestations] = useState();
  const [filter, setFilter] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [page, setPage] = useState(1);

  const { BlackSirius } = colors;

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
    async function loadManifestations() {
      try {
        const manifestationsPage = await Api.get(`/manifestation/`);

        if ('message' in manifestationsPage) {
          setError(manifestationsPage.message);
        } else {
          setManifestations(manifestationsPage.rows);
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    }
    fetchCategories();
    fetchTypes();
    loadManifestations();
  }, []);

  /** Hook responsável por garantir que tenhamos
   * as categorias e os tipos de manifestação.
   */
  useEffect(() => {
    if (categories && types) {
      setLoading(false);
    }
  }, [categories, types]);

  async function searchManifestations(pageToLoad = 1) {
    try {
      const options = [];
      const text = titleFilter ? `&text=${titleFilter}` : '';

      if (categoryFilter) {
        categoryFilter.map(categ => {
          options.push(`&options[]=${categ.label}`);
        });
      }
      if (typeFilter) {
        options.push(`&options[]=${typeFilter}`);
      }

      const manifestationsPage = await Api.get(
        `/manifestation/?page=${pageToLoad}${text}${options}&error=false`
      );

      if ('message' in manifestationsPage) {
        setError(manifestationsPage.message);
      } else {
        if (pageToLoad > manifestationsPage.last_page) {
          return;
        }

        if (manifestationsPage.count > 0) {
          setPage(
            manifestationsPage.rows.length >= 1 ? pageToLoad : pageToLoad - 1
          );
        }

        setManifestations(
          pageToLoad >= 2
            ? [...manifestations, ...manifestationsPage.rows]
            : manifestationsPage.rows
        );
      }

      setFilter(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setBtnLoading(false);
    }
  }

  async function handleNextPage() {
    setLoadingPage(true);
    await searchManifestations(page + 1);
    setLoadingPage(false);
  }

  async function handleSearchManifestations() {
    setBtnLoading(true);
    titleFilter = title;
    categoryFilter = category;
    typeFilter = type;
    setPage(1);
    await searchManifestations();
    setBtnLoading(false);
    setTitle('');
    setType('');
    setCategory([]);
  }

  function renderManifestations() {
    if (manifestations && manifestations.length <= 0) {
      return (
        <Text
          style={{
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
          }}
        >
          Não encontrado
        </Text>
      );
    }

    if (manifestations) {
      return (
        <HistoricList
          manifestations={manifestations}
          navigation={navigation}
          handleNextPage={handleNextPage}
        />
      );
    }

    return null;
  }

  function renderFilters() {
    const toRender = [];
    if (filter) {
      toRender.push(
        <>
          <LabeledInput
            inputProps={{
              value: title,
              onChangeText: setTitle,
            }}
          />
          <SelectCheckbox
            label=""
            blankOption="Selecione uma categoria"
            options={categories}
            onSelect={selectedCategories =>
              setCategory(Object.keys(selectedCategories))
            }
          />
          <Select
            label=""
            blankOption="Selecione um tipo"
            options={types}
            onSelect={selectedType => {
              setType(selectedType.label);
            }}
          />
          <Button
            touchableProps={{
              onPress: handleSearchManifestations,
            }}
            textProps={{
              title: 'Buscar',
              loading: btnLoading,
            }}
          />
        </>
      );
    }
    return toRender;
  }

  function renderError() {
    return (
      <Text
        style={{
          marginTop: 20,
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center',
        }}
      >
        {error}
      </Text>
    );
  }

  return (
    <ContainerWithLoading loading={loading}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Text style={{ marginVertical: 10, fontWeight: 'bold', fontSize: 24 }}>
          Buscar Manifestação
        </Text>
        <Foundation
          name="filter"
          size={24}
          color={colors.Blu}
          onPress={() => {
            setFilter(!filter);
          }}
        />
      </View>
      {renderFilters()}
      {error && renderError()}
      {renderManifestations()}
      {loadingPage ? (
        <ActivityIndicator size="small" color={BlackSirius} />
      ) : (
        <></>
      )}
    </ContainerWithLoading>
  );
}

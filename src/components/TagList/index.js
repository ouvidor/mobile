/* eslint-disable react/prop-types */
import React from 'react';
import { FlatList, View, Text } from 'react-native';

const TagList = ({ tags }) => {
  return (
    <FlatList
      data={tags}
      renderItem={({ item }) => (
        <View key={item}>
          <Text>{item}</Text>
        </View>
      )}
    />
  );
};

export default TagList;

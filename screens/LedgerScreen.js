import React from 'react';
import { ScrollView, FlatList, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';

export default function LedgerScreen() {
  const { list } = useSelector(state => state.ledger);

  return (
    <View style={styles.container}>
      <Text>지금부터 너의 돈을 걷도록 하겠다..</Text>

      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={list}
          renderItem={item => <Text>{JSON.stringify(item)}</Text>}
        />
      </ScrollView>
    </View>
  );
}

LedgerScreen.navigationOptions = {
  title: '장부',
  headerTintColor: 'blue', // 글자색
  headerStyle: {
    backgroundColor: 'red'
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

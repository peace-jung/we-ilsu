import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

export default function LedgerPresenter() {
  return (
    <ScrollView style={styles.container}>
      <View>
        <Text>지금부터 너의 돈을 걷도록 하겠다.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

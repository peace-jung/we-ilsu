import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

// NOTE get device screen size
const { width: dWidth, height: dHeight } = Dimensions.get('screen');

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function CalendarWeeklyScreen() {
  // redux hook
  const { list } = useSelector(state => state.ledger);
  const dispatch = useDispatch();

  // TODO Example Data
  const expensesData = [];

  // state
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  // useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {/* SECTION Monthly Expenses */}
      <View style={styles.monthlyContainer}>
        <Text style={{}}>{month}월 지출 현황</Text>
        <Text style={{}}>총 지출 : {'100만원'}</Text>
      </View>

      {/* SECTION Calendar */}
      <View style={styles.calendarContainer}>
        <Text style={{ height: 50 }}>CalendarWeeklyScreen</Text>
      </View>

      {/* SECTION Detail Information About One Day Expenses */}
      <ScrollView style={{ flex: 1 }}>
        {expensesData.length === 0 && (
          <View
            style={{
              flex: 1,
              paddingTop: 30,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#999' }}>데이터가 없습니다.</Text>
          </View>
        )}
        <FlatList
          data={expensesData}
          renderItem={({ item }) => (
            <View style={styles.expenseDatail}>
              <Text>{item.type}</Text>
              <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={{ flex: 1, marginHorizontal: 15 }}
              >
                {item.usage}
              </Text>
              <Text>{numberWithCommas(Number(item.price))}원</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}

CalendarWeeklyScreen.navigationOptions = {
  title: '주간장부',
  headerTintColor: 'white', // 글자색
  headerStyle: {
    backgroundColor: '#1f232a' // 배경색
  },
  // headerLeft: null,
  headerTitleStyle: { marginHorizontal: 0, width: '100%', textAlign: 'center' }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  monthlyContainer: {
    padding: 15
  },
  calendarContainer: {
    // NOTE I want to set Square
    width: Math.min(dWidth, dHeight),
    height: Math.min(dWidth, dHeight),
    backgroundColor: '#ececec'
  },
  expenseDatail: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    padding: 8,
    alignItems: 'center'
  }
});

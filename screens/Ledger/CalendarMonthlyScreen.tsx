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
// import CalendarPicker from 'react-native-calendar-picker';
import CalendarPicker from '@lib/react-native-calendar-picker';

// NOTE get device screen size
const { width: dWidth, height: dHeight } = Dimensions.get('screen');

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function CalendarMonthlyScreen(props) {
  // redux hook
  const { list, selected } = useSelector(state => state.ledger);

  // state
  const [dateObj, setDateObj] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();
  const selectedData = selectedDate.getDate();

  // ANCHOR history
  const expenseHistory = list[selected].history[selectedYear]
    ? list[selected].history[selectedYear][selectedMonth]
      ? list[selected].history[selectedYear][selectedMonth][selectedData]
        ? list[selected].history[selectedYear][selectedMonth][selectedData]
        : {}
      : {}
    : {};

  const monthTotal = (month: number) => {
    const monthObj = list[selected].history[selectedYear]
      ? list[selected].history[selectedYear][month]
        ? Object.values(list[selected].history[selectedYear][month])
        : {}
      : {};

    let totalPrice = 0;
    for (let i in monthObj) {
      for (let j in monthObj[i]) {
        monthObj[i][j].price && (totalPrice += Number(monthObj[i][j].price));
      }
    }
    return totalPrice;
  };

  return (
    <View style={styles.container}>
      {/* SECTION Monthly Expenses */}
      <View style={styles.monthlyContainer}>
        <Text style={{}}>{dateObj.month + 1}월 지출 현황</Text>
        <Text style={{}}>
          총 지출 : {numberWithCommas(monthTotal(dateObj.month))} 원
        </Text>
      </View>

      {/* SECTION Calendar */}
      <View style={styles.calendarContainer}>
        {/* <Text style={{ height: 50 }}>CalendarMonthlyScreen</Text>
        <Text style={{ height: 50 }}>{selected.title}</Text>
        <Text style={{ height: 50 }}>
          member : {JSON.stringify(selected.member)}
        </Text> */}
        <CalendarPicker
          weekdays={['일', '월', '화', '수', '목', '금', '토']}
          months={[
            '1월',
            '2월',
            '3월',
            '4월',
            '5월',
            '6월',
            '7월',
            '8월',
            '9월',
            '10월',
            '11월',
            '12월'
          ]}
          previousTitle={`${dateObj.month === 0 ? 12 : dateObj.month}월`}
          nextTitle={`${dateObj.month === 11 ? 1 : dateObj.month + 2}월`}
          todayBackgroundColor={'#67B38C'}
          todayTextStyle={{ color: '#fff' }}
          customContainerStyle={{backgroundColor: 'red'}}
          selectedDayStyle={{
            backgroundColor: '#FFD002',
            width: '90%',
            height: '90%'
          }}
          selectedDayTextColor={'#fff'}
          onMonthChange={month => setDateObj(month._i)}
          onDateChange={date => setSelectedDate(date._d)}
        />
      </View>

      {/* SECTION Detail Information About One Day Expenses */}
      <ScrollView style={{ flex: 1 }}>
        <FlatList
          data={Object.values(expenseHistory)}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                paddingTop: 30,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#999' }}>데이터가 없습니다.</Text>
            </View>
          }
          renderItem={({ item }: any) => (
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

      <View style={styles.addIconCover}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({
              routeName: 'AddExpenseData',
              params: { selectedDate }
            });
          }}
          style={styles.addIconButton}
        >
          <Ionicons name={'md-add'} size={36} color={'#fff'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

CalendarMonthlyScreen.navigationOptions = {
  title: '월간장부',
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
    width: Math.min(dWidth, dHeight)
    // height: Math.min(dWidth, dHeight),
    // backgroundColor: '#ececec'
  },
  expenseDatail: {
    flexDirection: 'row',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec',
    padding: 8,
    alignItems: 'center'
  },
  // add button
  addIconCover: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#FD694F',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1
  },
  addIconButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

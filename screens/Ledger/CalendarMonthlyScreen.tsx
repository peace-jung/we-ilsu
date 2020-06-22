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
import Swipeable from 'react-native-gesture-handler/Swipeable';

// NOTE get device screen size
const { width: dWidth, height: dHeight } = Dimensions.get('screen');

// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numberWithCommas = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function CalendarMonthlyScreen(props) {
  const dispatch = useDispatch();

  // redux hook
  const { list, selected } = useSelector(state => state.ledger);

  // state
  const [addButton, setAddButton] = useState(true);
  const [dateObj, setDateObj] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  });
  const [selectedCalendar, setSelectedCalendar] = useState(new Date());

  const selectedYear = selectedCalendar.getFullYear();
  const selectedMonth = selectedCalendar.getMonth();
  const selectedDate = selectedCalendar.getDate();

  // month history
  const monthHistory = list[selected].history[dateObj.year]
    ? list[selected].history[dateObj.year][dateObj.month]
    : {};

  // ANCHOR history
  const expenseHistory = list[selected].history[selectedYear]
    ? list[selected].history[selectedYear][selectedMonth]
      ? list[selected].history[selectedYear][selectedMonth][selectedDate]
        ? list[selected].history[selectedYear][selectedMonth][selectedDate]
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

  // 선택한 항목 삭제
  const handleDeleteItem = index => {
    dispatch({
      type: 'DELETE_HISTORY_ITEM',
      picked: selectedCalendar,
      index
    });
  };

  const renderRightActions = (progress, dragX, index) => {
    const trans = dragX.interpolate({
      inputRange: [0, 30, 45, 60],
      outputRange: [60, 90, 120, 150]
    });

    return (
      <Animated.View style={{ transform: [{ translateX: trans }] }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleDeleteItem(index)}
          style={{
            flex: 1,
            width: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#ff8170'
          }}
        >
          <Text style={{ color: '#fff' }}>삭제</Text>
        </TouchableOpacity>
      </Animated.View>
    );
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
          selectedDayStyle={{
            backgroundColor: '#FFD002'
          }}
          selectedDayTextColor={'#fff'}
          monthHistory={monthHistory}
          onMonthChange={month => setDateObj(month._i)}
          onDateChange={date => setSelectedCalendar(date._d)}
        />
      </View>

      {/* SECTION Detail Information About One Day Expenses */}
      <ScrollView
        onScrollBeginDrag={() => setAddButton(false)}
        onScrollEndDrag={() => setAddButton(true)}
        style={{ flex: 1 }}
      >
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
          renderItem={({ item, index }: any) => (
            <View key={index} style={styles.expenseItem}>
              <Swipeable
                renderRightActions={(progress, dragX) =>
                  renderRightActions(progress, dragX, index)
                }
              >
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.expenseDatail}
                >
                  <Text>{item.type}</Text>
                  <Text
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                    style={{ flex: 1, marginHorizontal: 15 }}
                  >
                    {item.usage}
                  </Text>
                  <Text>{numberWithCommas(Number(item.price))}원</Text>
                </TouchableOpacity>
              </Swipeable>
            </View>
          )}
        />
      </ScrollView>

      {addButton && (
        <View style={styles.addIconCover}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate({
                routeName: 'AddExpenseData',
                params: { selectedDate: selectedCalendar }
              });
            }}
            style={styles.addIconButton}
          >
            <Ionicons name={'md-add'} size={36} color={'#fff'} />
          </TouchableOpacity>
        </View>
      )}
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
  expenseItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
  },
  expenseDatail: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: 8
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

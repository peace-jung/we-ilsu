import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

// NOTE get device screen size
const { width, height } = Dimensions.get('screen');
// https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
const numberWithCommas = x => {
  return x.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// NOTE Division N by Array
Array.prototype.division = function(n) {
  let arr = JSON.parse(JSON.stringify(this));
  let len = arr.length;
  let cnt = Math.floor(len / n);
  let tmp = [];
  for (let i = 0; i <= cnt; i++) {
    tmp.push(arr.splice(0, n));
  }
  return tmp;
};

export default function AddExpenseDataScreen(props) {
  const { selectedDate } = props.navigation.state.params;

  // state
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState(String([0, 0]));

  //
  const typeList = ['식비', '교통비', '문화생활', '생활용품', '의료비', '기타'];

  const dispatch = useDispatch();
  const onChangeHistory = data => {
    dispatch({ type: 'ADD_HISTORY_ITEM', selectedDate, data });
    props.navigation.pop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputPrice}>
        <TextInput
          keyboardType={'number-pad'}
          placeholder="지출 금액"
          style={{ flex: 1, fontSize: 60, textAlign: 'right' }}
          placeholder={'0'}
          value={numberWithCommas(price)}
          onChangeText={text => setPrice(text)}
        />
      </View>

      <View style={{ marginTop: 20, paddingHorizontal: 10 }}>
        {typeList.division(5).map((list, i) => (
          <View key={i} style={{ flexDirection: 'row' }}>
            {list.map((item, j) => (
              <TouchableOpacity
                key={j}
                style={Object.assign({}, styles.typeButton, {
                  backgroundColor: type === String([i, j]) ? '#FFD002' : '#fff'
                })}
                onPress={() => setType(String([i, j]))}
              >
                <Text
                  style={{ color: '#000', fontSize: 14, textAlign: 'center' }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.textInputTitle}>
        <TextInput
          placeholder="지출 내역"
          placeholderTextColor={'#ffffff99'}
          style={{ color: '#fff', fontSize: 40 }}
          value={content}
          onChangeText={text => setContent(text)}
        />
      </View>
      <View style={styles.doneButtonContainer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={() => {
            const data = {
              price: Number(price.replace(/,/g, '')) || 0,
              usage: content,
              type: typeList.division(5)[Number(type.split(/,/)[0])][
                Number(type.split(/,/)[1])
              ]
            };
            onChangeHistory(data);
          }}
        >
          <Text style={{ color: '#fff', fontSize: 20 }}>완료</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  typeHorizontal: {},
  typeVertical: {
    marginTop: 10,
    paddingHorizontal: 5
  },
  typeButton: {
    width: width * 0.2 - 15,
    height: 60,
    margin: 5,
    padding: 10,
    borderRadius: 10
  },
  textInputPrice: {
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#49799090'
  },
  textInputTitle: {
    marginTop: 20,
    marginHorizontal: 15,
    padding: 10,
    // paddingHorizontal: 10,
    backgroundColor: '#49799090',
    borderRadius: 5
  },
  doneButtonContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    alignItems: 'flex-end'
  },
  doneButton: {
    padding: 10,
    backgroundColor: '#67B38C',
    borderRadius: 10
  }
});

AddExpenseDataScreen.navigationOptions = ({ navigation }) => {
  return {
    title: '',
    headerStyle: {
      borderBottomWidth: 0
    },
    headerLeft: null,
    headerRight: (
      <TouchableOpacity
        activeOpacity={1}
        style={{
          width: 45,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name={'ios-close'} size={40} color={'#000'} />
      </TouchableOpacity>
    )
  };
};

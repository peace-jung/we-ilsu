import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  FlatList,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import AddLedgerPopupScreen from './AddLedgerPopupScreen';

const COLOR = [
  'rgb(244,67,54)', // red
  'rgb(255,152,0)', // orange
  'rgb(052,168,83)', // green
  'rgb(3,169,244)', // blue
  'rgb(138,141,146)', // gray
  'rgb(96,125,139)', // blue-gray
  'rgb(121,85,71)' // brown
];

export default function LedgerScreen(props) {
  // redux hook
  const { list } = useSelector(state => state.ledger);
  const dispatch = useDispatch();

  // state
  const [addModal, setAddModal] = useState(false);

  return (
    <View style={styles.container}>
      {/* <View
        style={{
          backgroundColor: '#f7f7f7',
          paddingVertical: 10,
          paddingHorizontal: 10
        }}
      >
        <Text style={{ fontSize: 18 }}>장부 리스트&nbsp;({list.length})</Text>
      </View> */}

      {/* <Text style={{ width: '100%', textAlign: 'center' }}>
        항목을 꾸욱 누르면 삭제됩니다.
      </Text> */}
      <FlatList
        style={styles.listContainer}
        data={Object.keys(list)}
        extraData={addModal}
        keyExtractor={item => item}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              dispatch({
                type: 'SET_SELECTED_ITEM',
                selected: item
              });
              props.navigation.push('Calendar');
            }}
            onLongPress={() => {
              dispatch({
                type: 'DELETE_LEDGER_ITEM',
                items: [item]
              });
            }}
            style={Object.assign(
              {},
              styles.renderItem,
              index === 0 && { marginTop: 10 },
              { backgroundColor: COLOR[Number(index) % 7] }
            )}
          >
            {/* <View
              style={[
                styles.typeIcon,
                {
                  borderColor:
                    list[item].type === 'individual' ? '#8bc34a' : '#00bcd4'
                }
              ]}
            >
              {list[item].type === 'individual' ? (
                <Text style={{ color: '#8bc34a', fontSize: 14 }}>개인</Text>
              ) : (
                <Text style={{ color: '#00bcd4', fontSize: 14 }}>그룹</Text>
              )}
            </View> */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={{
                  color: '#fff',
                  // fontWeight: 'bold',
                  fontSize: 18,
                  maxWidth: '80%'
                }}
              >
                {list[item].title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* 장부 추가 버튼 (add list item button) */}
      <View style={styles.addIconCover}>
        <TouchableOpacity
          onPress={() => {
            setAddModal(true);
          }}
          style={styles.addIconButton}
        >
          <Ionicons name={'md-add'} size={36} color={'#fff'} />
        </TouchableOpacity>
      </View>

      <AddLedgerPopupScreen visible={addModal} setAddModal={setAddModal} />
    </View>
  );
}

LedgerScreen.navigationOptions = {
  title: '장부',
  headerTintColor: 'white', // 글자색
  headerStyle: {
    backgroundColor: '#1f232a' // 배경색,
  },
  headerTitleStyle: {
    marginHorizontal: 0,
    width: '100%',
    textAlign: 'center',
    fontSize: 20
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000010'
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
  renderItem: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    height: 100,
    backgroundColor: '#fff'
  },
  typeIcon: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 4
  },
  // add button
  addIconCover: {
    position: 'absolute',
    bottom: 50,
    right: 40
  },
  addIconButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f232a',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});

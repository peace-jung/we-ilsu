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

export default function LedgerScreen(props) {
  // redux hook
  const { list } = useSelector(state => state.ledger);
  const dispatch = useDispatch();

  // state
  const [addModal, setAddModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ paddingHorizontal: 10 }}>
        지금부터 너의 돈을 걷도록 하겠다..
      </Text>

      <View
        style={{
          backgroundColor: '#f7f7f7',
          paddingVertical: 10,
          paddingHorizontal: 10,
          marginTop: 10
        }}
      >
        <Text style={{ fontSize: 18 }}>장부 리스트&nbsp;({list.length})</Text>
      </View>

      <Text style={{ width: '100%', textAlign: 'center' }}>
        항목을 꾸욱 누르면 삭제됩니다.
      </Text>
      <FlatList
        style={{ flex: 1 }}
        data={list}
        stateChange={addModal}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.renderItem}
            onPress={async () => {
              await dispatch({
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
          >
            <View
              style={[
                styles.typeIcon,
                {
                  borderColor:
                    item.type === 'individual' ? '#8bc34a' : '#00bcd4'
                }
              ]}
            >
              {item.type === 'individual' ? (
                <Text style={{ color: '#8bc34a', fontSize: 18 }}>개인</Text>
              ) : (
                <Text style={{ color: '#00bcd4', fontSize: 18 }}>그룹</Text>
              )}
            </View>
            <View style={{ flex: 1 }}>
              <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={{
                  color: '#000',
                  // fontWeight: 'bold',
                  fontSize: 18,
                  maxWidth: '80%'
                }}
              >
                {item.title}
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
    paddingTop: 10,
    backgroundColor: '#fff'
  },
  renderItem: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
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
    bottom: 60,
    right: 40,
    backgroundColor: '#000',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  },
  addIconButton: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

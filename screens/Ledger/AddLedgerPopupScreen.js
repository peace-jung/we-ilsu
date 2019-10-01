import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';

export default function AddLedgerPopupScreen(props) {
  const { setAddModal } = props;

  // state
  const [title, setTitle] = useState('');
  const [type, setType] = useState('individual');

  // redux hook
  const dispatch = useDispatch();

  const onAddTouch = () => {
    if (!title) {
      alert('장부 이름을 입력해주세요.');
      return;
    }

    if (type === 'group') {
      alert('아직 지원하지 않습니다.');
      return;
    }

    if (type === 'individual') {
      dispatch({
        type: 'ADD_LEDGER_LIST',
        newLedger: {
          title,
          type,
          key: String(Date.now())
        }
      });
      setAddModal(false);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => setAddModal(false)}
      style={styles.addItemContainer}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {}}
        style={{
          width: 280,
          height: 360,
          backgroundColor: '#fff',
          shadowColor: '#00000090',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 1
        }}
      >
        <View style={styles.addItemTitle}>
          <Text style={{ color: '#666' }}>장부 등록</Text>
        </View>

        <View style={styles.division} />

        <View style={styles.addItemContent}>
          <View style={styles.addItemSection}>
            <Text
              style={{
                // fontWeight: 'bold',
                // fontSize: 20,
                color: '#666'
              }}
            >
              장부 이름
            </Text>
            <TextInput
              autoFocus
              placeholder={'장부 이름'}
              value={title}
              onChangeText={text => setTitle(text)}
              style={{
                // fontSize: 16,
                color: '#666',
                width: '80%',
                borderBottomWidth: 1,
                borderBottomColor: '#ececec',
                paddingVertical: 6
              }}
            />
          </View>

          <View style={styles.addItemSection}>
            <View style={{ marginBottom: 6 }}>
              <Text
                style={{
                  // fontWeight: 'bold',
                  // fontSize: 20,
                  color: '#666'
                }}
              >
                장부 타입
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => setType('individual')}
                style={{ paddingRight: 16 }}
              >
                <Text
                  style={{
                    // fontSize: 20,
                    fontWeight: type === 'individual' ? 'bold' : 'normal',
                    color: type === 'individual' ? '#1c90fb' : '#666',
                    textDecorationLine:
                      type === 'individual' ? 'underline' : 'none'
                  }}
                >
                  개인
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setType('group')}
                // style={{ paddingRight: 6 }}
              >
                <Text
                  style={{
                    // fontSize: 20,
                    fontWeight: type === 'group' ? 'bold' : 'normal',
                    color: type === 'group' ? '#1c90fb' : '#666',
                    textDecorationLine: type === 'group' ? 'underline' : 'none'
                  }}
                >
                  그룹
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.division} />

        <TouchableOpacity style={styles.addItemAction} onPress={onAddTouch}>
          <Text style={{ color: '#1c90fb' }}>추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // popup
  addItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090'
  },
  addItemTitle: {
    paddingVertical: 20,
    marginHorizontal: 16
  },
  addItemContent: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 20
  },
  addItemSection: { marginBottom: 20 },
  addItemAction: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  division: {
    borderTopWidth: 1,
    borderTopColor: '#aaa',
    marginHorizontal: 16
  }
});

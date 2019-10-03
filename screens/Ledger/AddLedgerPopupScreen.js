import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Animated,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native';
import { useDispatch } from 'react-redux';

export default function AddLedgerPopupScreen(props) {
  const { visible, setAddModal } = props;

  // state
  const [title, setTitle] = useState('');
  const [type, setType] = useState('individual');
  const [viewOpacity] = useState(new Animated.Value(visible ? 1 : 0));

  const opacityAnimated = opacity =>
    Animated.timing(viewOpacity, {
      toValue: opacity,
      duration: 200,
      useNativeDriver: true
    });

  opacityAnimated(visible ? 1 : 0).start();

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
      opacityAnimated(0).start(() => setAddModal(false));
    }
  };

  return (
    <Animated.View
      style={{
        display: visible ? 'flex' : 'none',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        opacity: viewOpacity
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Keyboard.dismiss();
          opacityAnimated(0).start(() => setAddModal(false));
        }}
        style={styles.addItemContainer}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => Keyboard.dismiss()}
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
            <Text style={{ fontSize: 16, color: '#666' }}>장부 등록</Text>
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
                // autoFocus
                // placeholder={'장부 이름'}
                value={title}
                onChangeText={text => setTitle(text)}
                style={{
                  // fontSize: 16,
                  color: '#666',
                  width: '80%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingVertical: 6
                }}
              />
            </View>

            <View style={styles.addItemSection}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 12 }}>
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

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setType('individual')}
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    borderColor: '#1c90fb',
                    borderRightWidth: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    backgroundColor: type === 'individual' ? '#1c90fb' : '#fff'
                  }}
                >
                  <Text
                    style={{
                      color: type === 'individual' ? '#fff' : '#1c90fb'
                    }}
                  >
                    개인
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setType('group')}
                  style={{
                    paddingVertical: 4,
                    paddingHorizontal: 8,
                    borderWidth: 1,
                    borderColor: '#1c90fb',
                    borderLeftWidth: 0,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: type === 'group' ? '#1c90fb' : '#fff'
                  }}
                >
                  <Text
                    style={{ color: type === 'group' ? '#fff' : '#1c90fb' }}
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
    </Animated.View>
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
    paddingVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center'
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
    borderTopColor: '#eee',
    marginHorizontal: 16
  }
});

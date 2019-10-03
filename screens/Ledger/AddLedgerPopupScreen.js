import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Animated,
  ScrollView,
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
  const [viewOpacity] = useState(new Animated.Value(visible ? 1 : 0));
  const [title, setTitle] = useState('');
  const [type, setType] = useState(true); // individual: true, group: false
  const [users, setUsers] = useState({ [String(Date.now())]: '' });

  useEffect(() => {
    // 초기화
    if (!visible) {
      setTitle('');
      setType(true);
      setUsers({ [String(Date.now())]: '' });
    }
  }, [visible]);

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

    // SECTION if type is [group]
    if (!type) {
      const hasNull = Object.keys(users).filter(user => users[user] === '');
      if (hasNull.length > 0) {
        alert('입력되지 않은 멤버가 있습니다.');
        return;
      }

      let isSame = false;
      Object.values(users).sort((a, b) =>
        a > b ? 1 : a < b ? -1 : (isSame = true)
      );
      if (isSame) {
        alert('이름이 같은 멤버가 있습니다.');
        return;
      }

      dispatch({
        type: 'ADD_LEDGER_LIST',
        newLedger: {
          title,
          type: 'group',
          key: String(Date.now()),
          member: users
        }
      });
      opacityAnimated(0).start(() => setAddModal(false));
      return;
    }

    // SECTION if type is [individual]
    if (type) {
      dispatch({
        type: 'ADD_LEDGER_LIST',
        newLedger: {
          title,
          type: 'individual',
          key: String(Date.now()),
          member: {}
        }
      });
      opacityAnimated(0).start(() => setAddModal(false));
      return;
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
            height: 420,
            backgroundColor: '#fff',
            shadowColor: '#00000090',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 1
          }}
        >
          <View style={styles.addItemTitle}>
            <Text style={{ fontSize: 18, color: '#666' }}>장부 등록</Text>
          </View>

          <View style={styles.division} />

          <View style={styles.addItemContent}>
            {/* SECTION Add Ledger Title */}
            <View style={styles.addItemSection}>
              <Text
                style={{
                  // fontWeight: 'bold',
                  fontSize: 18,
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
                  fontSize: 16,
                  color: '#666',
                  width: '80%',
                  borderBottomWidth: 1,
                  borderBottomColor: '#ccc',
                  paddingVertical: 6
                }}
              />
            </View>

            {/* SECTION Set Ledger Type */}
            <View style={styles.addItemSection}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 12 }}>
                  <Text
                    style={{
                      // fontWeight: 'bold',
                      fontSize: 18,
                      color: '#666'
                    }}
                  >
                    장부 타입
                  </Text>
                </View>

                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setType(true)}
                  style={{
                    ...styles.radioStyles,
                    borderRightWidth: 0,
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    backgroundColor: type ? '#1c90fb' : '#fff'
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: type ? '#fff' : '#1c90fb' }}
                  >
                    개인
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => setType(false)}
                  style={{
                    ...styles.radioStyles,
                    borderLeftWidth: 0,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                    backgroundColor: type ? '#fff' : '#1c90fb'
                  }}
                >
                  <Text
                    style={{ fontSize: 16, color: type ? '#1c90fb' : '#fff' }}
                  >
                    그룹
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* SECTION Add User Input */}
            {!type && (
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, color: '#666' }}>
                  장부 멤버 ({Object.keys(users).length})
                </Text>

                <ScrollView style={{ flex: 1 }}>
                  {Object.keys(users).map(key => (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 4
                      }}
                      key={key}
                    >
                      <TextInput
                        placeholder={'멤버'}
                        onEndEditing={event => {
                          let newer = JSON.parse(JSON.stringify(users));
                          newer[key] = event.nativeEvent.text;
                          setUsers(newer);
                        }}
                        style={styles.addMemberTextInput}
                      />

                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {
                          let newer = JSON.parse(JSON.stringify(users));
                          newer[String(Date.now())] = '';
                          setUsers(newer);
                        }}
                        style={{ fontSize: 16, padding: 6 }}
                      >
                        <Text>추가</Text>
                      </TouchableOpacity>

                      {Object.keys(users).length !== 1 && (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          onPress={() => {
                            if (Object.keys(users).length === 1) return;
                            let newer = JSON.parse(JSON.stringify(users));
                            delete newer[key];
                            setUsers(newer);
                          }}
                          style={{ fontSize: 16, padding: 6 }}
                        >
                          <Text>삭제</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          <View style={styles.division} />

          <TouchableOpacity style={styles.addItemAction} onPress={onAddTouch}>
            <Text style={{ fontSize: 16, color: '#1c90fb' }}>추가</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
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
  division: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginHorizontal: 16
  },
  addItemSection: { marginBottom: 20 },
  addItemAction: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  radioStyles: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#1c90fb'
  },
  addMemberTextInput: {
    fontSize: 16,
    color: '#666',
    width: '70%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 6,
    marginRight: 10
  }
});

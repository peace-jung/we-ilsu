import { AppLoading } from 'expo';
import * as Updates from 'expo-updates';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// redux setting
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import configureStore from './redux/configureStore';

import AppNavigator from './navigation/AppNavigator';

// get store config
const { persistor, store } = configureStore();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && (
              <StatusBar barStyle="light-content" hidden={false} />
            )}
            <AppNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

/**
 * handleAppUpdate
 * 앱 업데이트 확인 후 업데이트 진행
 */
const handleAppUpdate = async () => {
  const hasUpdate = await Updates.checkForUpdateAsync(); // 서버로부터 업데이트 확인
  if (hasUpdate.isAvailable) {
    await Updates.fetchUpdateAsync(); // 최신업데이트 동기화, 로컬 캐시에 저장
    Updates.reloadAsync();
  }
};

// 앱 로드시 필요한 리소스 미리 로딩
async function loadResourcesAsync() {
  await handleAppUpdate();

  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png')
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf')
    })
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});

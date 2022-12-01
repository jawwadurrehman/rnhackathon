import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {colors} from './src/styles';

const theme = {
  ...DefaultTheme,

  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
  },

  dark: false,
  roundness: 1,
};

const RNRedux = () => {
  //FOR CLEAR STORAGE
  //persistor.purge();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <App />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRedux);

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';

AppRegistry.registerComponent('testingserverside', () => App);

AppRegistry.runApplication('testingserverside', {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});

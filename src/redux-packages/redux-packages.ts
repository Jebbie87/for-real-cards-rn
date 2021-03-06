import {ConnectPackage, LoginPackage, LoginActions} from 'common-app';
import { ReduxPackageCombiner } from 'redux-package';

/* Meteor
import {ConnectServiceMeteor} from './common-app-meteor';
import {LoginServiceMeteor} from './common-app-meteor';
*/
declare let ConnectServiceMeteor, LoginServiceMeteor;

import { FEATURE_TOGGLE_USE_FIREBASE, featureToggleConfigs } from '../feature-toggle.config';
import { ConnectServiceFirebase } from '../common-app-firebase';
import { LoginServiceFirebase } from '../common-app-firebase';
import { NavigationPackage } from './index';
import App = firebase.app.App;

export class ReduxPackages {

  constructor(private firebase: App) {
    if (featureToggleConfigs[FEATURE_TOGGLE_USE_FIREBASE].setting) {
      const connectService = new ConnectServiceFirebase(firebase);
      const loginService = new LoginServiceFirebase(firebase);
      ReduxPackageCombiner.configure([
          new LoginPackage(loginService),
          new ConnectPackage(connectService),
          new NavigationPackage()
        ],
        null,
        {consoleLogging: true}
      );

    } else {
      const connectService = new ConnectServiceMeteor();
      const loginService = new LoginServiceMeteor();
      ReduxPackageCombiner.configure([
          new LoginPackage(loginService),
          new ConnectPackage(connectService)
        ],
        null,
        {consoleLogging: true}
      );
    }
  }
}

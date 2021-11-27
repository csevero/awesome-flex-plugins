import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

const PLUGIN_NAME = 'CustomNotificationsPlugin';

export default class CustomNotificationsPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);

    this.requestNotificationPermission();
  }

  //this method will trigger a popup on user browser's to allow notifications
  async requestNotificationPermission() {
    const permission = await window.Notification.requestPermission();

    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
    }
  }

  //you can use this method to push custom notification
  showNotification(notificationTitle, notificationBody) {
    const n = new Notification(notificationTitle, {
      body: notificationBody,
      icon: '/twilio-icon.png',
    });

    setTimeout(() => n.close(), 4000);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    //by default, twilio sent notification for new reservation, new messages and others. We can change the notifications defaults and make our own. The documentation can be found here https://www.twilio.com/docs/flex/developer/ui/notifications#browser-notifications
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`,
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}

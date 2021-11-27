import React from 'react';
import { AudioPlayerManager, VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

const PLUGIN_NAME = 'WelcomeMessagePlugin';

export default class WelcomeMessagePlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    // your custom message to send when accept a task
    manager.chatClient.on('channelJoined', payload => {
      // define a message to send into the channel - alternatively you could look it up here

      setTimeout(() => {
        let body = `Olá! Me chamo ${
          manager.workerClient.attributes.full_name.split(' ')[0]
        } e vou seguir com seu atendimento :D`;

        flex.Actions.invokeAction('SendMessage', {
          channelSid: payload.sid,
          body: body,
        });
      }, 500);
    });
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

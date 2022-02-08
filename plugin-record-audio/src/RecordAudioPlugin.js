import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import { AudioRecorder } from './components/AudioRecorder';
// import BubbleMessageWrapper from './components/BubbleMessageWrapper/BubbleMessageWrapper';

const PLUGIN_NAME = 'RecordAudioPlugin';

export default class RecordAudioPlugin extends FlexPlugin {
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
  async init(flex, manager) {
    flex.MessageInput.Content.add(
      <AudioRecorder key="record-audio-component" manager={manager} />,
    );

    //the lines bellow is optional if you already use the plugin-message-media https://github.com/twilio-labs/plugin-message-media
    // flex.MessageBubble.Content.add(<BubbleMessageWrapper key="image" />);

    // ignore "media not supported" errors
    // manager.strings.MediaMessageError = '';
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`,
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}

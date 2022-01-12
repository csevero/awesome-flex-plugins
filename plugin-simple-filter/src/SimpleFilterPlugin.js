import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import { extendFilter } from './CustomFilters';
import { getTwilioQueues } from './helpers/getTwilioQueues';

const PLUGIN_NAME = 'SimpleFilterPlugin';

export default class SimpleFilterPlugin extends FlexPlugin {
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
    // Docs to add filter on Flex UI - https://www.twilio.com/docs/flex/developer/ui/team-view-filters
    const queuesToFilter = await getTwilioQueues();

    extendFilter(manager, queuesToFilter);
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

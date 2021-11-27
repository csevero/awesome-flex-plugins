import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'FlexThemePlugin';

export default class FlexThemePlugin extends FlexPlugin {
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
    // This line tells Flex where to find the logo that renders in the top left corner
    flex.MainHeader.defaultProps.logoUrl = "https://s3.amazonaws.com/com.twilio.prod.twilio-docs/images/5011-pixel-just-word4x.original.png"
    // The configuration object describes what the different Flex components and subcomponents should look like
    const configuration = {
      colorTheme: {
        colors: {
          userAvailableColor: "#00b894",
          acceptColor: "#36D576",
          declineColor: "#F22F46"
        },
        overrides: {
          IncomingTaskCanvas: {
            Container: {
              background: "#0984e3"
            },
          },
          MainHeader: {
              Container: {
                  background: "#0D122B",
                  borderColor: "#fff"
              }
          },
          SideNav: {
              Container: {
                  background: "#0D122B",
                  borderColor: "#fff"
              },
              Button: {
                background: "#F22F46"
              }
          },
          NoTasksCanvas: {
            Container: {
              background: "#fff"
            },
          },
          UserActivityControls: {
              Item: {
                  lightHover: false
              },
              Items: {
                  background: "#F22F46",
              }
          },
          TaskList: {
            Container: {
              background: "#fff"
            },
            Item: {
              Icon: {
                background: "#0984e3"
              }
            }
          }
        }
      }
    }
    // Finally, we pass the configuration to the Flex manager to make the changes go live
    manager.updateConfig(configuration)
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}

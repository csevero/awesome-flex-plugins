import { default as styled } from 'react-emotion';

export const MainWrapper = styled('div')`
  // Remove the comments below and comments line 9-12 if you don't have the plugin message media already installed
  /* width: 100%; */
  /* display: flex; */
  /* -webkit-box-pack: center; */
  /* justify-content: center; */
  margin: 10px auto;
  position: absolute;
  top: 46px;
  right: 0;

  .audio-react-recorder {
    display: none;
  }

  button {
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    border: 1px solid #00000077;
    transition: all 0.2s;

    .Twilio-Icon {
      svg {
        width: 26px;
        height: 26px;
      }
    }

    &:hover {
      cursor: pointer;
      transform: translate3d(0, -3px, 0);
      box-shadow: 1px 1px 8px #00000055;
    }

    &:active {
      transform: translate3d(0, 0, 0);
      box-shadow: 1px 1px 5px #00000055;
    }
  }
`;

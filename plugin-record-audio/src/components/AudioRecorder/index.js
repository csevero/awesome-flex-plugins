import { Icon } from '@twilio/flex-ui';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';
import { useState } from 'react';
import { MainWrapper } from './styles';

const AudioRecorder = props => {
  const [recordStatus, setRecordStatus] = useState('');
  const [mp3Content, setMp3Content] = useState({
    blobUrl: '',
    file: {},
  });

  function playAudio() {
    const audio = new Audio(mp3Content.blobUrl);
    audio.play();
  }

  async function sendAudio() {
    const {
      channelSid,
      channel: {
        source: { friendlyName },
      },
    } = props;

    const { name: loggedWorkerName } = props.manager.workerClient;
    const channel = await props.manager.chatClient.getChannelBySid(channelSid);

    channel.once('messageAdded', async msg => {
      const { media, author } = msg;

      if (author === loggedWorkerName && media) {
        const mediaUrl = await media.getContentUrl();

        await sendMediaMessage(mediaUrl, friendlyName);
      }
    });

    await channel.sendMessage({
      contentType: 'audio/mpeg',
      media: mp3Content.file,
    });
  }

  async function sendMediaMessage(mediaUrl, friendlyName) {
    const body = {
      mediaUrl,
      to: friendlyName,
      channel: 'chat-whatsapp',
      Token: props.manager.store.getState().flex.session.ssoTokenPayload.token,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(body),
    };

    try {
      //you need to have a function that handle with files, you can use this folder how example: https://github.com/twilio-labs/plugin-message-media/tree/main/mms-handler/functions
      const response = await fetch(
        process.env.REACT_APP_SEND_MEDIA_ENDPOINT,
        options,
      );
      const json = await response.json();
      console.log(
        `[SendMediaService] Media message was set to ${friendlyName}`,
        json,
      );

      setMp3Content({ blobUrl: '', file: {} });
      setRecordStatus('');
    } catch (err) {
      console.error(`Error when sending media message to ${friendlyName}`, err);
    }
  }

  return (
    <MainWrapper>
      <AudioReactRecorder
        state={recordStatus}
        onStop={audioData => {
          setMp3Content({
            ...mp3Content,
            blobUrl: audioData.url,
            file: new File(
              [audioData.blob],
              `${new Date().getTime()}-workerAudioFile.mp3`,
              { type: 'audio/mpeg' },
            ),
          });
        }}
        backgroundColor="none"
        foregroundColor="none"
        canvasWidth={0}
        canvasHeight={0}
        type="audio/mpeg"
      />
      {(recordStatus === 'stop' || !recordStatus) && (
        <button
          aria-label="Gravar áudio"
          title="Gravar áudio"
          onClick={() => setRecordStatus(RecordState.START)}
        >
          <Icon icon="Mute" />
        </button>
      )}
      {recordStatus === 'start' && (
        <button
          aria-label="Pausar gravação"
          title="Pausar gravação"
          onClick={() => setRecordStatus(RecordState.STOP)}
        >
          <Icon icon="Hold" />
        </button>
      )}
      {mp3Content.blobUrl && (
        <button
          aria-label="Escutar áudio gravado"
          title="Escutar áudio gravado"
          onClick={() => playAudio()}
        >
          <Icon icon="Voice" />
        </button>
      )}
      {mp3Content.file && mp3Content.file.name && (
        <button
          aria-label="Enviar áudio"
          title="Enviar áudio"
          onClick={() => sendAudio()}
        >
          <Icon icon="SendLarge" />
        </button>
      )}
    </MainWrapper>
  );
};

export { AudioRecorder };

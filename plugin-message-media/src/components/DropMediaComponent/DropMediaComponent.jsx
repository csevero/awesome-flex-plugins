import React from 'react';
import { css } from 'react-emotion';
import { withTaskContext } from '@twilio/flex-ui';

// import DropHereIcon from './DropHereIcon.svg';
import { DropAreaStyle } from './DropMediaComponent.Style';
const DropHereIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;

class DropMediaComponent extends React.Component {

  dropAreaRef = React.createRef();

  // this counter is necessary to correctly control the drag enter and leave events
  // when the cursor hits a sub-component
  counter = 0;

  constructor(props) {
    super(props);

    this.state = {
      dragging: false
    };
  }

  handleDragEnter = (e) => {
    if (this.state.dragging === false) {
      this.setState({ dragging: true });
    }

    this.counter++;

    e.preventDefault();
    e.stopPropagation();
  }

  handleDragLeave = (e) => {
    this.counter--;

    if (this.counter === 0) {
      this.setState({ dragging: false });
    }

    e.preventDefault();
    e.stopPropagation();
  }

  handleDropOnInvalidArea = (e) => {
    this.counter = 0;
    this.setState({ dragging: false });

    e.preventDefault();
    e.stopPropagation();
  }

  handleDropOnDropArea = async (e) => {
    this.counter = 0
    this.setState({ dragging: false });

    e.preventDefault();
    e.stopPropagation();

    if (!e.dataTransfer || !e.dataTransfer.files[0]) {
      console.log('No file dropped');
      return;
    }

    const { sid: channelSid, channelDefinition, task } = this.props;

    if (!this.props.allowedChannels.includes(channelDefinition.name)) {
      console.log('Channel does not supports media');
      return;
    }

    const file = e.dataTransfer.files[0];
    if (file) {
      this.props.loading.current.show();
      return this.props.sendMediaService.sendMedia(file, channelSid, channelDefinition, task)
        .then(() => this.props.loading.current.hide());
    }

    return;
  }

  componentDidMount() {
    const div = this.dropAreaRef.current;

    window.addEventListener('dragenter', this.handleDragEnter);
    window.addEventListener('dragleave', this.handleDragLeave);
    window.addEventListener('drop', this.handleDropOnInvalidArea);
    div.addEventListener('drop', this.handleDropOnDropArea);
  }

  componentWillUnmount() {
    const div = this.dropAreaRef.current;

    window.removeEventListener('dragenter', this.handleDragEnter);
    window.removeEventListener('dragleave', this.handleDragLeave);
    window.removeEventListener('drop', this.handleDropOnInvalidArea);
    div.removeEventListener('drop', this.handleDropOnDropArea);
  }

  render() {
    if (this.state.dragging) {
      return (
        <div ref={this.dropAreaRef} className={DropAreaStyle}>
          <img src={DropHereIcon} alt="Drop files here" />
        </div>
      );
    }

    return (
      <div ref={this.dropAreaRef}></div>
    );
  }
}

export default withTaskContext(DropMediaComponent);

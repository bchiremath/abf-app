import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as io from 'socket.io-client';
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  input1: MediaStreamAudioSourceNode;
  globalStream: any;
  processor: any;
  context: AudioContext;
  title = 'app';
  selectedPlan: any = 2;
  profileForm = new FormGroup({
    plan: new FormControl(this.selectedPlan)
  });
  socket: any;
  streamStreaming = false;
  ngOnInit() {
    this.socket = io.connect('https://subscription-64f6d.appspot.com/');
    console.log(this.socket);
    this.socket.on('connect',  (data) => {
      console.log("from server: " + data);
      this.socket.emit('join', 'Server Connected to Client');
    });


    this.socket.on('messages',  (data) => {
      console.log("from server: " + data);
      console.log(data);
    });

    this.socket.on('speechData',  (data) => {
      // console.log(data.results[0].alternatives[0].transcript);
      var dataFinal = undefined || data.results[0].isFinal;

    });
  }
  onSubmit(profileForm) {
    console.log(profileForm.value);
  }

  initRecording() {
    this.socket.emit('startGoogleCloudStream', ''); //init socket Google Speech Connection
    this.streamStreaming = true;
    AudioContext = window['AudioContext'] || window['webkitAudioContext'];
    this.context = new AudioContext();
    this.processor = this.context.createScriptProcessor(2048, 1, 1);
    this.processor.connect(this.context.destination);
    this.context.resume();

    let handleSuccess = (stream) => {
      this.globalStream = stream;
      this.input1 = this.context.createMediaStreamSource(stream);
      this.input1.connect(this.processor);

      this.processor.onaudioprocess =  (e) => {
        this.microphoneProcess(e);
      };
    };

    navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    })
      .then(handleSuccess);

  }

  microphoneProcess(e) {
    let left = e.inputBuffer.getChannelData(0);
    let left16 = this.convertFloat32ToInt16(left);
    this.socket.emit('binaryData', left16);
  }

  convertFloat32ToInt16(buffer) {
    let l = buffer.length;
    let buf = new Int16Array(l / 3);
  
    while (l--) {
      if (l % 3 == 0) {
        buf[l / 3] = buffer[l] * 0xFFFF;
      }
    }
    return buf.buffer
  }
}

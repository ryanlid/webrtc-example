var localVideo = document.getElementById('localvideo');
var remoteVideo = document.getElementById('remotevideo');

var btnStart = document.getElementById('start');
var btnCall = document.getElementById('call');
var btnHangup = document.getElementById('hangup');

var offerSdp = document.getElementById('offer-sdp');
var answerSdp = document.getElementById('answer-sdp');

var localStram;
var pc1;
var pc2;

function getMediaStream(stream) {
  localVideo.srcObject = stream;
  localStram = stream;
}

function handleError(error) {
  console.log('handle error: ', error);
}

function getRemoteStream(e) {
  remoteVideo.srcObject = e.streams[0];
}

function getOffer(desc) {
  pc1.setLocalDescription(desc);
  console.log('offerSdp', desc);
  offerSdp.value = desc.sdp;

  // send desc to signal
  // receive desc from signal

  pc2.setRemoteDescription(desc);
  pc2.createAnswer().then(getAnswer).catch(handleError);
}

function getAnswer(desc) {
  pc2.setLocalDescription(desc);
  console.log('answerSdp', desc);
  answerSdp.value = desc.sdp;

  // send desc to signal
  // receive desc from signal

  pc1.setRemoteDescription(desc);
}

function start() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('getUserMedia is not supported!');
    return;
  } else {
    var constraints = {
      video: true,
      audio: false,
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getMediaStream)
      .catch((err) => {
        console.log(err);
      });
  }
}

function call() {
  pc1 = new RTCPeerConnection();

  pc2 = new RTCPeerConnection();

  pc1.onicecandidate = (e) => {
    pc2.addIceCandidate(e.candidate);
  };

  pc2.onicecandidate = (e) => {
    pc1.addIceCandidate(e.candidate);
  };

  pc2.ontrack = getRemoteStream;

  // 本地采集流
  localStram.getTracks().forEach((track) => {
    pc1.addTrack(track, localStram);
  });

  var offerOptions = {
    offerToRecieveAudio: 0,
    offerToRecieveVideo: 1,
  };

  // 本地媒体协商
  pc1.createOffer(offerOptions).then(getOffer).catch(handleError);
}

function hangup() {
  pc1.close();
  pc2.close();
  pc1 = null;
  pc2 = null;
}

btnStart.onclick = start;
btnCall.onclick = call;
btnHangup.onclick = hangup;

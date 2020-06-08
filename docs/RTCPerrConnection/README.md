# RTCPerrConnection

```js
const pc = new RTCPerrConnection([configutation]);
```

## 方法分类

媒体协商 过程

A：setLocalDescription

A: 收集候选者 candicate

A: 发送 offer

B: 接收 offer

B: setRemoteDescription

B: setLocalDescription

B: 发送 Answer

A: 接收 Answer

A: setRemoteDescription

createOffer

```js
aPromise = myPeerConnection.createOffer([options]);
```

createOffer

```js
aPromise = myPeerConnection.createAnswer([options]);
```

setLocalDescription

```js
aPromise = myPeerConnection.setLocalDescription(sessionDescription);
```

> 参数为 createOffer 或 createOffer 的结果

setRemoteDescription

```js
aPromise = myPeerConnection.setRemoteDescription(sessionDescription);
```

Stream/Track

addTrack

```js
rtpSender = myPc.addTrack(track, stream);
```

> track 添加到 RTCPeerConnection 中的媒体轨
> stream 指定 track 所在的 stream

removeTrack

```js
myPc.removeTrack(rtpSender);
```

事件

onnegotiationneeded 当需要协商的时候

onicecandidate 当收到 ice 候选者

传输相关方法

统计相关方法

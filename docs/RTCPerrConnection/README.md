# RTCPerrConnection

```js
const pc = new RTCPerrConnection([configutation]);
```

参数 configutation 可选

```js
// balanced 音频与视频轨使用各自的传输通道
// max-compat 每个轨使用自己的传输通道
// max-bundle 所有轨都绑定到同一个传输轨道
bundlePolicy = 'balanced';

// 授权可以使用连接的一组证书，（不提供，会自动产生）
certificates;

// 16位整数，用于指定预取的ICE候选者的个数
// 如果该值发生变化，它会触发重新收集候选者
iceCandidatePoolSize = 0;

// ICE传输策略：
// relay 只使用中继候选者
// all 可以使用任何类型的候选者
iceTransportPolicy = 'all';

// 由 RTCIceServer 组成，每个 RTCIceServer 都是一个 ICE 代理的服务
// credentail 凭据， TURN 使用
// credentialType 凭据类型：password 或 oauth
// urls 用于连接服务中的 url 数组
// username 用户名
iceServers;

// rtcp 复用策略
// 收集ICE候选者使用
// negotiate 收集 RTCP 与 RTP 复用的 ICE 候选者， 如果 RTCP 能复用就与 RTP 复用，如果不能复用则将它们单独使用
// require 默认值。 只收集 RTCP 与 RTP 复用的 ICE 候选者，如果不能复用，则失败。
rtcpMuxPolicy = 'require';

peerIdentity;
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

addIceCandidate

```js
aPromise = pc.addIceCandidate(candidate);

// candidate:
// candidate 候选者描述
// sdpMid 与后续者相关的媒体流的识别标签
// sdpMLineIndex 在SDP中m= 的索引值
// usernameFragment 包括了远端的唯一标识
```

事件

onnegotiationneeded 当需要协商的时候

onicecandidate 当收到 ice 候选者

传输相关方法

统计相关方法

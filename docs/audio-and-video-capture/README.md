# 音视频采集

通过 `getUserMedia` 获取音视频

[获取音视频流](./getUserStream.html)

```js
const promise = navigator.mediaDevices.getUserMedia(constraints);
```

通过 `getDisplayMedia` 获取音视频

[获取屏幕共享流](./getDisplayMedia.html)

```js
const promise = navigator.mediaDevices.getDisplayMedia(constraints);
```

通过 `enumerateDevices` 获取设备信息


[获取设备信息](./enumerateDevices.html)

```js
const promise = navigator.mediaDevices.enumerateDevices();
```

视频约束

| 参数       |    说明    |
| ---------- | :--------: |
| width      |            |
| height     |            |
| frameRate  |    帧率    |
| facingMode | 摄像头选择 |

facingMode 的可选值：

|     值      |    说明    |
| :---------: | :--------: |
|    user     | 前置摄像头 |
| environment |    后置    |
|    left     |  前置左侧  |
|    right    |  前置右侧  |

音频约束

|       参数       | 说明                 |
| :--------------: | -------------------- |
|      volume      | 声音大小 0~1         |
|    sampleRate    | 采样率               |
|    sampleSize    |
| echoCancellation | 回音消除             |
| autoGainControl  | 自动增益 true /false |
| noiseSuppression | 降噪                 |
|     latency      | 延迟效果             |
|   channelCount   | 声道                 |
|     deviceID     | 设备 id              |
|     groupID      | 设备组 id            |

示例

```js
const constraints = {
  audio: true,
  video: {
    width: {
      min: 300,
      max: 640,
    },
    height: {
      min: 300,
      max: 480,
    },
    frameRate: {
      min: 15,
      max: 30,
    },
  },
};
```

> 适配不同浏览器
>
> https://webrtc.github.io/adapter/adapter-latest.js

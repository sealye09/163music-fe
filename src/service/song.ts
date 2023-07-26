import request from "./request";

// 必选参数 : id : 音乐 id level: 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res
export function getSongUrl(id: number | string, level: string = "standard") {
  return request({
    url: "/song/url/v1",
    params: {
      id,
      level,
    },
  });
}

/**
 * 获取歌曲信息
 * @param id
 * @returns
 */
export function getSongDetail(id: number | string) {
  return request({
    url: "/song/detail",
    params: {
      ids: id,
    },
  });
}

/**
 * 获取歌曲歌词
 * @param id 歌曲ID
 * @returns 歌词
 */
export function getSongLyric(id: number | string) {
  return request({
    url: "/lyric",
    params: {
      id: id,
    },
  });
}

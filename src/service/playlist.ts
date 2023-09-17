import request from "@/utils/request";

/**
 * 获取歌单分类
 * @returns
 */
export function getCatlist() {
  return request({
    url: "/playlist/catlist",
  });
}

/**
 * 获取热门歌单分类
 * @returns
 */
export function getHotCatlist() {
  return request({
    url: "/playlist/hot",
  });
}

/**
 * 获取歌单
 * @param order 排序 'hot' 'new'
 * @param cat 类别
 * @param limit
 * @param offset 页数
 * @returns
 */
export function getPlaylist(
  order: string = "hot",
  cat: string = "全部",
  limit: number = 50,
  offset: number = 0
) {
  return request({
    url: "/top/playlist",
    params: {
      order: order,
      cat: cat,
      limit: limit,
      offset: offset,
    },
  });
}

/**
 * 获取推荐歌单（首页）
 * @param limit limit return number
 * @returns
 */
export function getRecommendPlaylist(limit: number = 20) {
  return request({
    url: "/personalized",
    params: {
      limit,
    },
  });
}

/**
 * 获取歌单详情
 * @param id 歌单id
 * @returns
 */
export function getPlaylistDetail(id: number | string) {
  return request({
    url: "/playlist/detail",
    params: {
      id,
    },
  });
}

/**
 * 获取歌单所有歌曲
 * @param id
 * @param limit
 * @param offest
 * @returns
 */
export function getAllTrack(id: number | string, limit?: number, offest: number = 0) {
  return request({
    url: "/playlist/track/all",
    params: {
      id,
      limit,
      offest,
    },
  });
}

/**
 * 获取歌单（网友精选）
 * @param order 排序（hot new）
 * @param cat 类别
 * @param limit 返回数量（默认50）
 * @param offest 分页
 * @returns
 */
export function getTopPlaylist(
  order: string = "hot",
  cat: string = "全部",
  limit: number = 50,
  offest: number = 0
) {
  return request({
    url: "/top/playlist",
    params: {
      order,
      cat,
      limit,
      offest,
    },
  });
}

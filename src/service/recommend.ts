import request from "../utils/request";

/**
 * 获取轮播图信息
 * @returns banners information
 */
export function getBanner() {
  return request({
    url: "/banner",
  });
}

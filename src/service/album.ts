import { GetAlbumResponse } from "@/types/response";
import request from "../utils/request";

/**
 * @brief 获取专辑内容
 * @param id
 * @returns
 */
export function getAlbum(id: number | string) {
  return request({
    url: "/album",
    params: {
      id: id,
    },
  });
}

/**
 * @brief area: ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * @returns
 */
export function getAllNewAlbum(area: string = "ALL", limit: number = 50, offset: number = 0) {
  return request({
    url: "/album/new",
    params: {
      area: area,
      limit: limit,
      offset: offset,
    },
  });
}

/**
 * 获取首页下的新碟上架
 * @returns
 */
export function getNewAlbums() {
  return request({
    url: "/album/newest",
  });
}

import request from './request';

/**
 * @brief 获取歌手热门50首歌
 * @param id 
 * @returns 
 */
export function getArtistHot(id: number | string) {
	return request({
		url: "/artist/songs",
		params: {
			id: id,
		}
	})
}

/**
 * @brief 获取歌手详情
 * @param id 
 * @returns 
 */
export function getArtistDetail(id: number | string) {
	return request({
		url: "artist/detail",
		params: {
			id: id,
		}
	})
}


/**
 * @brief 获取歌手信息和部分热歌
 * @param id 
 * @returns 
 */
export function getArtist(id: number | string) {
	return request({
		url: "/artists",
		params: {
			id: id,
		}
	})
}

/**
 * 
 * @param id 歌手id
 * @param limit 取出数量
 * @param offset 偏移量
 * @returns 
 */
export function getArtistAlbums(id: number | string, limit: number = 30, offset: number = 0) {
	return request({
		url: "/artist/album",
		params: {
			id: id,
			limit: limit,
			offset: offset,
		}
	})
}

/**
 * 获取歌手描述
 * @param id 歌手id
 * @returns 
 */
export function getArtistDescription(id: number | string) {
	return request({
		url: "/artist/desc",
		params: {
			id: id,
		}
	})
}

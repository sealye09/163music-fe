import request from './request';
/**
 * 获取搜索结果
 * @param keywords 关键词
 * @param limit 30
 * @param offset 0
 * @param type type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单,
 * @returns 
 */
export function getSearchResult(keywords: string, limit: number = 30, offset: number = 0, type: number = 1) {
	return request({
		url: '/cloudsearch',
		params: {
			keywords: keywords,
			limit: limit,
			offset: offset,
			type: type,
		}
	})
}

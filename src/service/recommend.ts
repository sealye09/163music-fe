import request from './request';

/**
 * 获取轮播图信息
 * @returns banners information
 */
export function getBanner() {
	return request({
		url: "/banner"
	});
}




/**
 * 获取首页下的新碟上架
 * @returns 
 */
export function getNewAlbums() {
	return request({
		url: '/album/newest'
	});
}




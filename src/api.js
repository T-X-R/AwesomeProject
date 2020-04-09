const BASE_URL = 'http://localhost:3000';

// 推荐音乐
export const LOGIN = BASE_URL + '/login/cellphone?phone=15210138579&password=12qwaszx12TXR';
// export const LOGIN = BASE_URL + '/login/cellphone';
//搜索歌曲
export const SEARCH_MUSIC = BASE_URL + '/search?keywords=';
//音乐是否可用
export const CHECK_MUSIC = BASE_URL + '/check/music?id=';
// 用户歌单
export const USER_PLAYLIST = BASE_URL + '/user/playlist?uid=';
// 用户信息
export const USER_DETAIL = BASE_URL + '/user/detail?uid=';
// 获取音乐url
export const MUSIC_URL = BASE_URL + '/song/url?id=';
// 获取音乐详情
export const MUSIC_DETAIL = BASE_URL + '/song/detail?ids=';
// 获取歌词
export const MUSIC_LYRIC = BASE_URL + '/lyric?id=';
// 歌手榜
export const HOT = BASE_URL + '/toplist/artist';

/* 网易云音乐api */
const BASE_URL = 'http://localhost:3000';
// 登录
export const LOGIN = BASE_URL + '/login/cellphone?phone=15210138579&password=12qwaszx12TXR';
// export const LOGIN = BASE_URL + '/login/cellphone';
// 搜索歌曲
export const SEARCH_MUSIC = BASE_URL + '/search?keywords=';
// 音乐是否可用
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

/* qq音乐api */
const BASE_URL2 = 'http://localhost:3200';
// 搜索歌曲
export const SEARCH_MUSIC2 = BASE_URL2 + '/getSearchByKey?key=';
// 音乐是否可用
export const CHECK_MUSIC2 = BASE_URL2 + '/check/music?id=';
// 获取音乐详情
export const MUSIC_DETAIL2 = BASE_URL2 + '/getSongInfo?songmid=';
// 获取歌词
export const MUSIC_LYRIC2 = BASE_URL2 + '/getLyric?songmid=';
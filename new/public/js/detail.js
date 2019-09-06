var videoObject = {
    container: '#video', //容器的ID或className
    variable: 'player',//播放函数名称
    flashplayer: true,
    poster: '/static/img/ashun.png',//封面图片
    video: document.getElementById('video-url').value
    // video: [//视频地址列表形式
    //     [video, 'video/mp4', '中文标清', 0],
    //     [video, 'video/mp4', '中文高清', 0],
    //     [video, 'video/mp4', '英文高清', 10],
    //     [video, 'video/mp4', '英文超清', 0],
    // ]
};
var player = new ckplayer(videoObject);
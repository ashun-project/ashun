
var aList = [
{
    name: '蔷薇福利导航',
    url: 'http://www.qweidh.xyz'
},
{
    name: '福利168导航',
    url: 'http://www.fuli168.xyz'
},
{
    name: '撸啊撸在线',
    url: 'http://www.laldh.online/'
},
{
    name: '女忧在线AV',
    url: 'http://www.yy110.xyz'
},
{
    name: '少女色導航',
    url: 'http://www.snsdh.xyz'
},
{
    name: '爱色导航',
    url: 'http://www.isedh.com'
},
{
    name: '亚色AV导航',
    url: 'http://www.yaseavdh.com'
},
{
    name: '九州福利导航',
    url: 'http://www.jzdh.in'
},
{
    name: '爱搜导航',
    url: 'http://www.isodh.com'
},
{
    name: '700福利导航',
    url: 'http://700.baidfx.com/'
},
{
    name: '火山小黄人导航',
    url: 'http://xiaohuangren.xyz/'
},   
{
    name: '快狐福利导航',
    url: 'http://www.9347.ml'
},   
{
    name: '华人社导航',
    url: 'http://www.huadh.xyz/'
},   
{
    name: '骑士导航',
    url: 'http://www.74fl.xyz/'
},   
{
    name: '品色堂导航',
    url: 'http://www.pstdh.xyz/'
},   
{
    name: '色狼窝导航',
    url: 'http://www.slwo1.xyz/'
},   
{
    name: '白洁导航',
    url: 'http://www.1368.ml'
},   
{
    name: '爱趣导航站',
    url: 'https://www.aiqudh.com'
},   
{
    name: '老司机在线',
    url: 'http://www.lsjdh.top'
},   
{
    name: '撸撸导航',
    url: 'http://www.laldh.space'
},   
{
    name: '一点啪在线',
    url: 'http://www.yidianpa.online'
},   
{
    name: '狼友导航',
    url: 'http://www.lydh.online'
}];
setTimeout(function () {
	var friendly = document.getElementsByClassName('friendly')[0];
	var aEvent = '';
	console.log(friendly , '======')
	for (var i = 0; i < aList.length; i++) {
    		aEvent = document.createElement('a');
    		aEvent.innerHTML = aList[i].name;
    		aEvent.href = aList[i].url;
    		friendly.appendChild(aEvent);
	}
     }, 1000);

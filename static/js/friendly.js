
var aList = [
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
    name: '白洁导航',
    url: 'http://www.1368.ml'
},
{
    name: '火山小黄人导航',
    url: 'http://xiaohuangren.xyz/'
},
{
    name: '银色导航',
    url: 'http://www.yinuuu.pw/'
},
{
    name: '一个色导航 ',
    url: 'http://www.ygssss.pw/'
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

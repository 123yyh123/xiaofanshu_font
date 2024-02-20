
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/category/category","pages/message/message","pages/mine/mine","pages/login/login","pages/login/forget","pages/login/register","pages/login/bindPhone","pages/editData/editData","pages/chat/chat","pages/category/test/test","pages/attentionAndFans/attentionAndFans","pages/attentionAndFans/attentionAndFans","pages/mine/otherMine","pages/attentionMessageList/attentionMessageList","pages/publishNotes/publishNotes","pages/modal/modal","pages/notesDetail/notesDetail","pages/topicIndex/topicIndex","pages/actionSheet/actionSheet","pages/category/test1/test1","pages/notesDetail/notesVideoDetail/notesVideoDetail","pages/notesDetail/notesVideoDetail/noteVideoD","pages/searchPage/searchPage","pages/searchPage/searchDetailPage","pages/setting/setting"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#ffffff","backgroundColor":"#ffffff"},"tabBar":{"backgroundColor":"#ffffff","borderStyle":"white","height":"40px","iconWidth":"37px","midButton":{"iconPath":"static/image/publish.png","iconWidth":"50px"},"list":[{"pagePath":"pages/index/index","iconPath":"/static/image/index.png","selectedIconPath":"static/image/index_select.png"},{"pagePath":"pages/category/category","iconPath":"/static/image/category.png","selectedIconPath":"static/image/category_select.png"},{"pagePath":"pages/message/message","iconPath":"/static/image/message.png","selectedIconPath":"static/image/message_select.png"},{"pagePath":"pages/mine/mine","iconPath":"static/image/mine.png","selectedIconPath":"static/image/mine_select.png"}]},"darkmode":false,"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"com.xiaofanshu","compilerVersion":"3.99","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/category/category","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/message/message","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":true}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登录","enablePullDownRefresh":false}},{"path":"/pages/login/forget","meta":{},"window":{"navigationBarTitleText":"忘记密码","enablePullDownRefresh":false}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册","enablePullDownRefresh":false}},{"path":"/pages/login/bindPhone","meta":{},"window":{"navigationBarTitleText":"绑定手机号","enablePullDownRefresh":false}},{"path":"/pages/editData/editData","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/chat/chat","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/category/test/test","meta":{"isNVue":true},"window":{"navigationBarTitleText":"swiper-sticky"}},{"path":"/pages/attentionAndFans/attentionAndFans","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/mine/otherMine","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/attentionMessageList/attentionMessageList","meta":{},"window":{"navigationBarTitleText":"新增关注","enablePullDownRefresh":true}},{"path":"/pages/publishNotes/publishNotes","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/modal/modal","meta":{"isNVue":true},"window":{"navigationStyle":"custom","animationType":"fade-in","background":"transparent","backgroundColor":"rgba(0,0,0,0)"}},{"path":"/pages/notesDetail/notesDetail","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/topicIndex/topicIndex","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/actionSheet/actionSheet","meta":{"isNVue":true},"window":{"navigationStyle":"custom","background":"transparent"}},{"path":"/pages/category/test1/test1","meta":{},"window":{"navigationBarTitleText":"分类","enablePullDownRefresh":true}},{"path":"/pages/notesDetail/notesVideoDetail/notesVideoDetail","meta":{"isNVue":true},"window":{"enablePullDownRefresh":false,"navigationStyle":"custom","navigationBarTextStyle":"white","background":"#000"}},{"path":"/pages/notesDetail/notesVideoDetail/noteVideoD","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom","navigationBarTextStyle":"white"}},{"path":"/pages/searchPage/searchPage","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/searchPage/searchDetailPage","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":true,"pullToRefresh":{"offset":"120px"}}},{"path":"/pages/setting/setting","meta":{},"window":{"navigationBarTitleText":"账号与安全","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});

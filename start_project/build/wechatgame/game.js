require('libs/weapp-adapter/index');
var Parser = require('libs/xmldom/dom-parser');
window.DOMParser = Parser.DOMParser;
require('libs/wx-downloader.js');
wxDownloader.REMOTE_SERVER_ROOT = "";
wxDownloader.SUBCONTEXT_ROOT = "";
require('src/settings');
require('main');
wx.showShareMenu();
//监听右上角的分享调用 
cc.loader.loadRes("texture/PurpleMonster", function (err, data) {
  wx.onShareAppMessage(function (res) {
    return {
      title: "不怕，就来PK！",
      imageUrl: data.url,
      success(res) {
        console.log("转发成功!!!")
        //common.diamond += 20;
      },
      fail(res) {
        console.log("转发失败!!!")
      }
    }
  })
});

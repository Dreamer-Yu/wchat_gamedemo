// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },
    toScene: function () {
        cc.director.loadScene("game")
    },
    share: function () { //分享按钮
        cc.log("点击分享按钮");
        // this.playBtnSound();
        //主动拉起分享接口
        cc.loader.loadRes("texture/share", function (err, data) {
            wx.shareAppMessage({
                title: "不怕，就来PK！",
                imageUrl: data.url,
                success(res) {
                    console.log("转发成功!!!")
                    // common.diamond += 20;
                },
                fail(res) {
                    console.log("转发失败!!!")
                }
            })
        });
    },
    toRankList() {
        cc.director.loadScene("rank");
    }
    // start () {

    // },

    // update (dt) {},
});

"use strict";
cc._RF.push(module, 'dd4e84TWtxMwqW9W0YZbLYJ', 'rank');
// script/rank.js

"use strict";

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
        display: cc.Sprite
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {
        this._isShow = true;
        this.tex = new cc.Texture2D();
    },
    onClick: function onClick() {
        wx.setUserCloudStorage({
            KVDataList: [{ key: "score", value: "123" }],
            success: function success() {
                console.log("set success");
                this._isShow = !this._isShow;
                // 发消息给子域
                wx.postMessage({
                    message: this._isShow ? 'Show' : 'Hide'
                });
            }
        });
    },
    _updaetSubDomainCanvas: function _updaetSubDomainCanvas() {
        if (!this.tex) {
            return;
        }
        var openDataContext = wx.getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        this.tex.initWithElement(sharedCanvas);
        this.tex.handleLoadedTexture();
        this.display.spriteFrame = new cc.SpriteFrame(this.tex);
    },
    update: function update() {
        this._updaetSubDomainCanvas();
    }
});

cc._RF.pop();
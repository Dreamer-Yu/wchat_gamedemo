(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9c36f/KQY1EGKmkAE4OkRH7', 'Game', __filename);
// script/Game.js

'use strict';

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
        starPrefab: {
            default: null,
            type: cc.Prefab
        },
        gameOverPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 星星产生后消失时间的随机范围
        maxStarDuration: 0,
        minStarDuration: 0,
        score: 0,
        // 地面节点，用于确定星星生成的高度
        ground: {
            default: null,
            type: cc.Node
        },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        scoreAudio: {
            default: null,
            url: cc.AudioClip
        }

        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        // 获取地平面的 y 轴坐标
        // this.groundY = this.ground.y;    
        // 生成一个新的星星
        this.timer = 0;
        this.starDuration = 0;
        this.spawnNewStar();
        this.score = 0;
        this.node.on(cc.Node.EventType.TOUCH_START, function (touch, event) {
            this.player.toux = touch.getLocation().x;
            return true;
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (touch, event) {
            var locx = touch.getLocation().x;

            // cc.log(this.player.acc)
            if (locx > this.player.toux) {
                this.player.getComponent('player').acc = 1;
            } else if (locx < this.player.toux) {
                this.player.getComponent('player').acc = -1;

                // cc.log(this.player.getComponent('player').acc)
            }
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (touch, event) {
            // var self=this;
            this.player.getComponent('player').acc = 0;
        }, this);
    },

    spawnNewStar: function spawnNewStar() {
        // 使用给定的模板在场景中生成一个新节点
        var newStar = cc.instantiate(this.starPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newStar);
        // 为星星设置一个随机位置
        newStar.setPosition(this.getNewStarPosition());
        newStar.getComponent('star').game = this;
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    },

    getNewStarPosition: function getNewStarPosition() {
        var randX = 0;
        // 根据地平面位置和主角跳跃高度，随机得到一个星星的 y 坐标
        var randY = this.ground.y + cc.random0To1() * this.player.getComponent('player').jumpHeight + 50;
        // 根据屏幕宽度，随机得到一个星星 x 坐标 
        var maxX = this.node.width / 2;
        randX = cc.randomMinus1To1() * maxX;
        // 返回星星坐标
        return cc.p(randX, randY);
    },

    start: function start() {},


    newgameover: function newgameover() {
        var newgame = cc.instantiate(this.gameOverPrefab);
        this.node.addChild(newgame);
        newgame.setPosition(0, 100);
        newgame.getComponent('gameover').game = this;
        newgame.getComponent('gameover').getScore();
        this.player.getComponent("player").unvis();
    },
    update: function update(dt) {
        // 每帧更新计时器，超过限度还没有生成新的星星
        // 就会调用游戏失败逻辑
        if (this.timer > this.starDuration) {
            this.gameOver();
            return;
        }
        this.timer += dt;
    },
    gameOver: function gameOver() {
        this.player.stopAllActions(); //停止 player 节点的跳跃动作
        this.newgameover();
        // cc.director.loadScene('game');
    },
    gainScore: function gainScore() {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score.toString();
        cc.audioEngine.playEffect(this.scoreAudio, false);
    }

});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        
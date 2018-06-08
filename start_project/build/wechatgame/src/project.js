require=function o(s,a,r){function u(e,t){if(!a[e]){if(!s[e]){var i="function"==typeof require&&require;if(!t&&i)return i(e,!0);if(p)return p(e,!0);var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}var c=a[e]={exports:{}};s[e][0].call(c.exports,function(t){return u(s[e][1][t]||t)},c,c.exports,o,s,a,r)}return a[e].exports}for(var p="function"==typeof require&&require,t=0;t<r.length;t++)u(r[t]);return u}({Game:[function(t,e,i){"use strict";cc._RF.push(e,"9c36f/KQY1EGKmkAE4OkRH7","Game"),cc.Class({extends:cc.Component,properties:{starPrefab:{default:null,type:cc.Prefab},gameOverPrefab:{default:null,type:cc.Prefab},maxStarDuration:0,minStarDuration:0,score:0,ground:{default:null,type:cc.Node},player:{default:null,type:cc.Node},scoreDisplay:{default:null,type:cc.Label},scoreAudio:{default:null,url:cc.AudioClip}},onLoad:function(){this.timer=0,this.starDuration=0,this.spawnNewStar(),this.score=0,this.node.on(cc.Node.EventType.TOUCH_START,function(t,e){return this.player.toux=t.getLocation().x,!0},this),this.node.on(cc.Node.EventType.TOUCH_MOVE,function(t,e){var i=t.getLocation().x;i>this.player.toux?this.player.getComponent("player").acc=1:i<this.player.toux&&(this.player.getComponent("player").acc=-1)},this),this.node.on(cc.Node.EventType.TOUCH_END,function(t,e){this.player.getComponent("player").acc=0},this)},spawnNewStar:function(){var t=cc.instantiate(this.starPrefab);this.node.addChild(t),t.setPosition(this.getNewStarPosition()),(t.getComponent("star").game=this).starDuration=this.minStarDuration+cc.random0To1()*(this.maxStarDuration-this.minStarDuration),this.timer=0},getNewStarPosition:function(){var t,e=this.ground.y+cc.random0To1()*this.player.getComponent("player").jumpHeight+50,i=this.node.width/2;return t=cc.randomMinus1To1()*i,cc.p(t,e)},start:function(){},newgameover:function(){var t=cc.instantiate(this.gameOverPrefab);this.node.addChild(t),t.setPosition(0,100),t.getComponent("gameover").game=this,t.getComponent("gameover").getScore(),this.player.getComponent("player").unvis()},update:function(t){this.timer>this.starDuration?this.gameOver():this.timer+=t},gameOver:function(){this.player.stopAllActions(),this.newgameover()},gainScore:function(){this.score+=1,this.scoreDisplay.string="Score: "+this.score.toString(),cc.audioEngine.playEffect(this.scoreAudio,!1)}}),cc._RF.pop()},{}],gameover:[function(t,e,i){"use strict";cc._RF.push(e,"c9ef46B3z1DGocwNOlGhnN3","gameover"),cc.Class({extends:cc.Component,properties:{yourscore:{default:null,type:cc.Label},game:{default:null,serializable:!1}},start:function(){},getScore:function(){this.yourscore.string="Score: "+this.game.score.toString()}}),cc._RF.pop()},{}],go:[function(t,e,i){"use strict";cc._RF.push(e,"c01cagiWUVD87l0ttm27pSI","go"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},toScene:function(){cc.director.loadScene("game")},share:function(){cc.log("点击分享按钮"),cc.loader.loadRes("texture/share",function(t,e){wx.shareAppMessage({title:"不怕，就来PK！",imageUrl:e.url,success:function(t){console.log("转发成功!!!")},fail:function(t){console.log("转发失败!!!")}})})},toRankList:function(){cc.director.loadScene("rank")}}),cc._RF.pop()},{}],player:[function(t,e,i){"use strict";cc._RF.push(e,"a056f1DCK5IWIjXJDqb3vFA","player"),cc.Class({extends:cc.Component,properties:{toux:0,jumpHeight:0,jumpDuration:0,maxMoveSpeed:0,accel:0,acc:0,jumpAudio:{default:null,url:cc.AudioClip}},setJumpAction:function(){var t=cc.moveBy(this.jumpDuration,cc.p(0,this.jumpHeight)).easing(cc.easeCubicActionOut()),e=cc.moveBy(this.jumpDuration,cc.p(0,-this.jumpHeight)).easing(cc.easeCubicActionIn()),i=cc.callFunc(this.playJumpSound,this);return cc.repeatForever(cc.sequence(t,e,i))},onLoad:function(){this.jumpAction=this.setJumpAction(),this.node.runAction(this.jumpAction),this.xSpeed=0},start:function(){},unvis:function(){},update:function(t){this.acc<0?this.xSpeed-=this.accel*t:0<this.acc?this.xSpeed+=this.accel*t:this.xSpeed=0,Math.abs(this.xSpeed)>this.maxMoveSpeed&&(this.xSpeed=this.maxMoveSpeed*this.xSpeed/Math.abs(this.xSpeed)),this.node.x+=this.xSpeed*t},playJumpSound:function(){cc.audioEngine.playEffect(this.jumpAudio,!1)}}),cc._RF.pop()},{}],play:[function(t,e,i){"use strict";cc._RF.push(e,"7fb9cgSskxOyblShevLQrxE","play"),cc.Class({extends:cc.Component,properties:{},start:function(){}}),cc._RF.pop()},{}],rank:[function(t,e,i){"use strict";cc._RF.push(e,"dd4e84TWtxMwqW9W0YZbLYJ","rank"),cc.Class({extends:cc.Component,properties:{display:cc.Sprite},start:function(){this._isShow=!0,this.tex=new cc.Texture2D},onClick:function(){var t=this;wx.setUserCloudStorage({KVDataList:[{key:"score",value:"123"}],success:function(){console.log("set success"),t._isShow=!t._isShow,wx.postMessage({message:t._isShow?"Show":"Hide"})}})},_updaetSubDomainCanvas:function(){if(this.tex){var t=wx.getOpenDataContext().canvas;this.tex.initWithElement(t),this.tex.handleLoadedTexture(),this.display.spriteFrame=new cc.SpriteFrame(this.tex)}},update:function(){this._updaetSubDomainCanvas()}}),cc._RF.pop()},{}],star:[function(t,e,i){"use strict";cc._RF.push(e,"1828bVj4otM+q5vQSXNDS1W","star"),cc.Class({extends:cc.Component,properties:{pickRadius:0,game:{default:null,serializable:!1}},getPlayerDistance:function(){var t=this.game.player.getPosition();return cc.pDistance(this.node.position,t)},onPicked:function(){this.game.spawnNewStar(),this.game.gainScore(),this.node.destroy()},start:function(){},update:function(t){if(this.getPlayerDistance()<this.pickRadius)this.onPicked();else{var e=1-this.game.timer/this.game.starDuration;this.node.opacity=50+Math.floor(205*e)}}}),cc._RF.pop()},{}]},{},["Game","gameover","go","play","player","rank","star"]);
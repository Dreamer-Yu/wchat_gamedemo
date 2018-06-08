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
        items: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        
    },
    gt: function (data){
        console.log("%o",data);
        for(var i= 0;i<data.length;i++){
            var nit = cc.instantiate(this.items);
            console.log(data[i]);
            this.node.addChild(nit);
            nit.getComponent('ItemTemplate').init({
                id: 1,
                itemName: data[i].nickname,
            });
            
        }
    },
    start () {
        // wx.getFriendCloudStorage({
        //     keyList:["score"],
        //     success:function(ugd){
        //         let ddd = ugd.data;
        //         for(let dc in ddd){
        //             console.log(dc.nickname);
        //         }
                
        //     }
        // });
        //this.gt();
        let bb = this;
        wx.getFriendCloudStorage({
            keyList:["score"],
            success:function(ugd){
                let ddd = ugd.data;
                //console.log("%o",ddd);
                //console.log("%o",bb.gt);
                bb.gt(ddd);
                
            }
        });
    },

    // update (dt) {},
});

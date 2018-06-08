
cc.Class({
    extends: cc.Component,

    properties: {
        display: cc.Node,
        ItemList:{
            default:null,
            type:cc.Node
        }
    },

    start () {
        wx.onMessage(data => {
            switch (data.message) {
                case 'Show':
                    this._show();
                    break;
                case 'Hide':
                    this._hide();
                    break;
            }
        });
    },

    _show () {
        this.ItemList.getComponent("ItemList").showRankList();
        let moveTo = cc.moveTo(0.5, 0, 73);
        this.display.runAction(moveTo);
    },

    _hide () {
        console.log("hide");
        let moveTo = cc.moveTo(0.5, 0, 1000);
        this.display.runAction(moveTo);
    }
});

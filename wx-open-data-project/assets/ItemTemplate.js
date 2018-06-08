cc.Class({
    extends: cc.Component,
    properties: {
        id: 0,
        itemName: cc.Label,

    },
    init:function(data){
        this.id = data.id;
        this.itemName.string = data.itemName;
    }
});
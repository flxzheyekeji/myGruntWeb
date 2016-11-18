/**
 * Created by Administrator on 2016/11/17.
 */

function inherit(o){
    if(o == null) throw "不能从null继承";
    if(Object.create){
        return Object.create(o.prototype);
    }
    var t = typeof o;
    if(t !== "object" && t !== "function") throw "只能从对象和构造函数继承";
    function f(){};
    f.prototype = o;
    return new f();
}

function EnumImgLegend(element,pics,duration){

    var EnumImgLegend = function(){throw "不能实例化图片类"};

    //设置每步运行多少
    var step = {};

    //记录单位
    var untis = {};

    //记录元素运行的最终状态
    var endState = {};

    //元素的开始状态。
    var eleState = {'right':-205,'transform':59 };

    var targetState = {"right":"745px", "transform":"rotateY(-59deg)"};

    //存储所有的图片对象
    EnumImgLegend.values = [];

    //存储所有运行图片对象
    EnumImgLegend.onmove = [];

    //这里定义移动图片出现的个数
    //这是一个常量。
    EnumImgLegend.MOVEPIC = 10;

    //定义是否添加元素的比较对象；
    EnumImgLegend.THRESHOULD = (function(){
        var wd = element.css("width").match(/\d+/g)[0];
        if(!isNaN(wd)){
            return parseInt(wd/EnumImgLegend.MOVEPIC);
        }
        return 0;
    })();

    if(!EnumImgLegend.THRESHOULD) throw "容器宽度不能为0";

    //这里的59，和-199，需要处理。
    // 由于“视距”和“容器宽度”和这个两个值之间的函数关系我不会。
    //如果能把这个函数关系解决掉，这里就不会写死，
    //也就是这个四维矩阵,图像旋转就是坐标轴变换。
    //  X 0 0 0
    //  0 Y 0 0
    //  0 0 Z 0
    //  0 0 0 1
    EnumImgLegend.prototype = {
        constructor: EnumImgLegend,
        transform:59,
        right:-199,
        value:null,
        name:null,
        isAdded:false,
        reset:function(){
            this.transform = 59;
            this.right = -199;
            this.isAdded = false;
            this.value.css({'transform':'rotateY(59deg)','right':'-205px'})
        }
    }

    EnumImgLegend.create = function(imgUri){
        var li = document.createElement("li");
        return $(li).addClass("cl-img").css({
            'transform':'rotateY(59deg)',
            'right':'-205px',
            'background-image':'url(' + imgUri + ')'
        });
    }

    EnumImgLegend.isStop = function(el){
        if(!el){
            debugger;
        }
        for(var k in endState){
            if(Number(eleState[k]) <= Number(endState[k]) && Number(el[k]) <= Number(endState[k])){
                return false
            };
            if(Number(eleState[k]) > Number(endState[k]) && Number(el[k]) > Number(endState[k])){
                return false
            }
            return true;
        }
    }

    //是否添加下一个元素到旋转数组中
    //判断依据：这个元素是否运动到一定位置
    //这里应该尽量运行少的代码。应该把它比较的对象先初始化好。
    //H这里先用大于定义其实有逻辑问题，这样插件可扩展性太差。
    EnumImgLegend.isAdd = function(el){
        if( Number(el.right) > EnumImgLegend.THRESHOULD){
            el.isAdded = true;
            return true;
        }
        return false;
    }


    //不用去取元素状态了
    //EnumImgLegend.eleAttrVal = function(ele,att){
    //    //娶过来的矩阵不会转换。
    //    if(att == "transform"){
    //        return 59;
    //    }
    //    var prop = ele.css(att);
    //    prop = $.isArray(prop) ? prop[0] : prop;
    //
    //    if(prop){
    //        return Number(prop.match(/\-?\d+/g)[0]);
    //    }
    //    else
    //        return 0;
    //}

    EnumImgLegend.addStep = function(el){
        for(var key in step){
            el[key] = (Number(el[key]) + Number(step[key])).toFixed(2);
        }
        return el;
    }

    EnumImgLegend.addUnits = function(el){
        var printStyle = {};
        for(var key in targetState){
            if(untis[key].length > 1){
                printStyle[key] = untis[key][0] + "(" + el[key] + untis[key][1] +")"
                break;
            }
            printStyle[key] =el[key] + untis[key][0];
        }
        return printStyle;
    }

    EnumImgLegend.init = function(){

        if(isNaN(duration)){
            throw "you mast input animale run time!";
        }
        duration = duration*1000/40;

        for(var key in targetState){
            endState[key] = targetState[key].toString().match(/\-?\d+/g)[0];
            untis[key]= targetState[key].toString().match(/[a-zA-Z]+/g);
            step[key] = ((endState[key] - eleState[key])/duration).toFixed(2);
        }

        for(var i = 0;i<pics.length;i++){
            var e = inherit(EnumImgLegend);
            //这里返回一个jquery对象
            e.value = EnumImgLegend.create(pics[i]);
            e.name = "pic" + i;
            EnumImgLegend.values.push(e);
            element.append(e.value);
        }

        //向移动队列注入一个元素
        EnumImgLegend.add();
    }

    //将第一个图片对象放到运行数组中；shift:去掉，脱掉的意思。
    EnumImgLegend.add = function(){
        EnumImgLegend.onmove.push(EnumImgLegend.values.shift());
    };

    //将移动后的元素取出，重置后放到原来的数组。
    EnumImgLegend.remove = function(){
        var eleShift = EnumImgLegend.onmove.shift();
        eleShift.reset();
        EnumImgLegend.values.push(eleShift);
    };

    //这里不穿参数只要是onmove数组中的元素都要执行移动。
    //这里面有一个问题，假如在40ms内，for函数没有执行玩，该怎么办呢?
    EnumImgLegend.animal = function(){
        var moveList = EnumImgLegend.onmove;
        setTimeout(function(){
            for(var i=0;i < moveList.length; i++){
                if(EnumImgLegend.isStop(moveList[i])){
                    console.log("remove")
                    //将数组第一项
                    EnumImgLegend.remove();
                }
                if(!moveList[i].isAdded && EnumImgLegend.isAdd(moveList[i])){
                    console.log("add")
                    //添加一向进来
                    EnumImgLegend.add();
                    console.log(moveList.length);
                }
                EnumImgLegend.addStep(moveList[i]);
                moveList[i].value.css(EnumImgLegend.addUnits(moveList[i]));
            }
            setTimeout(arguments.callee,20);
        },20);
    }

    EnumImgLegend.foreach = function(f,c){
        for(var i=0;i<this.values.length;i++){
            f.call(c,this.values[i]);
        }
    }

    EnumImgLegend.init();

    EnumImgLegend.animal();
}

$(document).ready(function(){
    var picList = ["css/img/nevermore.jpg","css/img/icegile.jpg",
        "css/img/kaer.jpg","css/img/lina.jpg",
        "css/img/PA.jpg","css/img/shengtang.jpg","css/img/tufu.jpg"];
    new EnumImgLegend($('.myCarousel'),picList,5);
})






/**
 * Created with JetBrains WebStorm.
 * User: hvidsten
 * Date: 2/8/13
 * Time: 2:19 PM
 * To change this template use File | Settings | File Templates.
 */
JXG.Options.axis.ticks.ticksDistance = 1;
JXG.Options.axis.ticks.drawLabels=true;
JXG.Options.axis.ticks.minorTicks=1;
var board = JXG.JSXGraph.initBoard('box', {boundingbox: [-10, 10, 10, -10], axis:false});
var xaxis = board.create('axis', [[0, 0], [1, 0]],
    {ticks: {label: {offset:[-3,-20]}, insertTicks:true, fixed:true}});
var yaxis = board.create('axis', [[0, 0], [0, 1]],
    {ticks: {label: {offset:[-15,0]}, insertTicks:true, fixed:true}});

//var ax1 = board.create('line', [[0,0],[1,0]]);
//board.create('ticks',[ax1, 1]);
board.create('grid', {gridx:1, gridy:1});
var urlHomeImg = "images/bird-house.jpg";
var urlGeoImg = "images/uccellino-trans.png";
var homeSize=2, geoSize=2;
var homeImg = board.create('image',[urlHomeImg, [0,0], [homeSize, homeSize]], {fixed:true});
var geoImg = board.create('image',[urlGeoImg, [0,0], [geoSize, geoSize]], {fixed:true});
var game = {homePos : [-8,8],
    geoPos: [6,-8],
    pt:board.create('point', [0,0], {visible:true})};
var tlist = [], solution_list=[];

var p1 = board.create('point', [0,0], {visible:false});
var p2 = board.create('point', [1,0], {visible:false});
var p3 = board.create('point', [0,1], {visible:false});
var ref_x_line = board.create('line', [p1,p2], {fixed:true});
var ref_y_line = board.create('line', [p1,p3], {fixed:true});
window.onload=function() {return makeGame('start')};

var rotCCW = function(angle) {
    var t = board.create("transform", [angle], {type:'rotate'});
    t.bindTo(geoImg);
    rotatePtBy(game.pt, angle);
    tlist.push([t, "rot", angle]);
    board.update();
}

var rotCW = function(angle) {
    var t = board.create("transform", [-angle], {type:'rotate'});
    t.bindTo(geoImg);
    rotatePtBy(game.pt, -angle);
    tlist.push([t, "rot", -angle]);
    board.update();
}

var rotatePtBy = function(pt, angle){
    var newx = Math.cos(angle)*pt.X()-Math.sin(angle)*pt.Y();
    var newy = Math.sin(angle)*pt.X()+Math.cos(angle)*pt.Y();
    pt.setPosition(JXG.COORDS_BY_USER, [newx, newy]);
}

var rotateXYBy = function(x,y,angle){
    var newx = Math.cos(angle)*x-Math.sin(angle)*y;
    var newy = Math.sin(angle)*x+Math.cos(angle)*y;
    return [newx, newy];
}

var refl = function(axis){
    var t;
    if(axis=='x') {
        t = board.create("transform", [ref_x_line], {type:'reflect'});
        reflectPtAbout(game.pt, 'x');
    }
    else{
        t = board.create("transform", [ref_y_line], {type:'reflect'});
        reflectPtAbout(game.pt, 'y');
    }
    t.bindTo(geoImg);
    tlist.push([t, "refl", axis]);
    board.update();
}

var reflectPtAbout=function(pt, axis) {
    var newx, newy;
    if(axis=='x') {
        newx = pt.X();
        newy = -pt.Y();
    }
    else{
        newx = -pt.X();
        newy = pt.Y();
    }
    pt.setPosition(JXG.COORDS_BY_USER, [newx, newy]);
}

var trans = function(direction){
    var t, delx=0, dely=0;
    switch(direction) {
        case 'left':
            t = board.create("transform", [-1,0], {type:'translate'});
            delx =-1;
            break;
        case 'right':
            t = board.create("transform", [1,0], {type:'translate'});
            delx =1;
            break;
        case 'up':
            t = board.create("transform", [0,1], {type:'translate'});
            dely =1;
            break;
        case'down':
            t = board.create("transform", [0,-1], {type:'translate'});
            dely =-1;
            break;
    }
    var p = game.pt;
    p.setPosition(JXG.COORDS_BY_USER, [p.X()+delx, p.Y()+dely]);
    t.bindTo(geoImg);
    tlist.push([t, "trans", direction]);
    board.update();
}



var doButtonClicked = function(type) {
    //console.log("got button click for:"+type);
    switch(type) {
        case 'rot-ccw':
            rotCCW(Math.PI/2.0);
            break;
        case 'rot-cw':
            rotCW(Math.PI/2.0);
            break;
        case 'refl-x':
            refl('x');
            break;
        case 'refl-y':
            refl('y');
            break;
        case 'trans-left':
            trans('left');
            break;
        case 'trans-right':
            trans('right');
            break;
        case 'trans-up':
            trans('up');
            break;
        case 'trans-down':
            trans('down');
            break;
    }
    updateGameState();
}

var buttonOver = function(type){
    //console.log("got button over for:"+type);
}
var buttonOut = function(type){
    //console.log("got button out for:"+type);
}

var placeImage = function(img, pos, size){
    var  x = pos[0]- (size/2.0);  //assumes size is a multiple of 2
    var  y = pos[1]- (size/2.0);
    img.transformations=[];
    var t = board.create("transform", [x,y], {type:'translate'});
    t.bindTo(img);
}

var makeGame = function(type) {
    tlist=[]; solution_list=[];
    hideSolution();
    if(type=='start')  {
        game.homePos = [-8,8];
        game.geoPos= [6,-8];
        solution_list=[[null,'trans','left'],[null,'trans','left'],[null,'refl','y'],[null,'refl','x']];
    }
    else{
        var home_quad = Math.round(Math.random()*3.0)+1.0;
        var sx=1, sy=1;
        switch(home_quad){
            case 1:
                sx = 1; sy=1;
                break;
            case 2:
                sx = -1; sy =1;
                break;
            case 3:
                sx = -1;  sy=-1;
                break;
            case 4:
                sx = 1; sy=-1;
        }
        var homex = sx*(Math.round(8.0*Math.random())+1);
        var homey = sy*(Math.round(8.0*Math.random())+1);
        game.homePos =[homex, homey];

        var xfrms =[Math.round(Math.random())+1.0, Math.round(Math.random()*2.0)+1.0,
            Math.round(Math.random())+1.0, Math.round(Math.random()*2.0)+1.0];

        var geoXY=[homex,homey];

        for(i=0;i<xfrms.length;i++) {
            var choice = Math.round(3.0*Math.random())+1;
            var x = geoXY[0], y=geoXY[1], angle, direction, axis;
            switch(xfrms[i]) {
                case 1:  // Rotation
                    if(choice == 1 || choice == 2) // 90 degrees ccw
                        angle = Math.PI/2.0;
                    else angle =  -Math.PI/2.0;
                    geoXY=rotateXYBy(x, y, angle);
                    solution_list.push([null, 'rot', -angle]);
                    break;
                case 2:   // Reflection
                    if(choice == 1 || choice == 2) {
                        geoXY=[x, -y];
                        solution_list.push([null, 'refl', 'x']);
                    }
                    else {
                        geoXY=[-x, y];
                        solution_list.push([null, 'refl', 'y']);
                    }
                    break;
                case 3:   //Translation
                    switch(choice){
                        case 1:
                            geoXY=[x-1, y];
                            solution_list.push([null, 'trans','right']);
                            break;
                        case 2:
                            geoXY=[x+1, y];
                            solution_list.push([null, 'trans','left']);
                            break;
                        case 3:
                            geoXY=[x, y+1];
                            solution_list.push([null, 'trans','down']);
                            break;
                        case 4:
                            geoXY=[x, y-1];
                            solution_list.push([null, 'trans','up']);
                            break;
                    }
                    break;

            }
        }
        //console.log("home: "+game.homePos+", geo: "+geoXY);
        var geox = geoXY[0], geoy = geoXY[1];
        var d =  Math.sqrt(Math.pow(geox-homex, 2)+Math.pow(geoy-homey, 2));
        if(d<4) { // add xfrm
            geoXY=rotateXYBy(geox, geoy, Math.PI/2.0);
            solution_list.push([null, 'rot', Math.PI/2.0]);
        }
        game.geoPos=geoXY;
    }
    solution_list = list_reverse(solution_list);
    placeImage(homeImg, game.homePos, homeSize);
    placeImage(geoImg, game.geoPos, geoSize);
    game.pt.setPosition(JXG.COORDS_BY_USER, game.geoPos);

    updateGameState();
    board.update();
}

var undo = function(){
    var t = tlist.pop();
    console.log("tlist ="+tlist);
    geoImg.transformations.pop();
    var type = t[1];
    switch(type) {
        case 'rot':
            var angle = t[2];
            rotatePtBy(game.pt, -angle);
            break;
        case 'trans':
            var direction = t[2];
            var p = game.pt;
            switch(direction) {
                case 'left':
                    p.setPosition(JXG.COORDS_BY_USER, [p.X()+1.0, p.Y()]);
                    break;
                case 'right':
                    p.setPosition(JXG.COORDS_BY_USER, [p.X()-1.0, p.Y()]);
                    break;
                case 'up':
                    p.setPosition(JXG.COORDS_BY_USER, [p.X(), p.Y()-1.0]);
                    break;
                case 'down':
                    p.setPosition(JXG.COORDS_BY_USER, [p.X(), p.Y()+1.0]);
                    break;
            }

            break;
        case 'refl':
            var axis = t[2];
            reflectPtAbout(game.pt, axis);
            break;
    }
    updateGameState();
    board.update();
}

var updateGameState=function(){
    document.getElementById("tlist").innerHTML=getTransfromListStr(tlist);
    if(checkForWin()) {
        alert("Way to go! Geo Thanks you!");
    }
}

var showSolution=function(){
    document.getElementById("sol_list").innerHTML="Solution List:<br>"+getTransfromListStr(solution_list);
}

var hideSolution=function(){
    document.getElementById("sol_list").innerHTML="";
}

var list_reverse=function(a) {
    var temp = [], len = a.length;
    if(len==0) return temp;
    if(len==1) return a;
    for (var i = (len - 1); i >-1; i--) {
        temp.push(a[i]);
    }
    return temp;
}

var getTransfromListStr = function(orig_xfrm_list){
    // Reverse so order is correct with matrices
    var xfrm_list =  list_reverse(orig_xfrm_list);
    //var xfrm_list=orig_xfrm_list;
    var str=''+xfrm_list.length+' xfrms: ';
    for(i=0; i<xfrm_list.length;i++) {
        var t = xfrm_list[i];
        var type = t[1];
        switch(type) {
            case 'rot':
                var angle = t[2];
                str = str+'R('+ (angle*180.0/Math.PI).toFixed(1)+'); ';
                break;
            case 'trans':
                var direction = t[2];
                switch(direction) {
                    case 'left':
                        str = str+'T(-1,0); ';
                        break;
                    case 'right':
                        str = str+ 'T(1,0); ';
                        break;
                    case 'up':
                        str = str+ 'T(0,1); ';
                        break;
                    case 'down':
                        str = str+ 'T(0,-1); ';
                        break;
                }

                break;
            case 'refl':
                var axis = t[2];
                str = str + 'r('+axis+'); ';
                break;
        }
    }
    return str;
}

var checkForWin =function(){
    var eps = 0.1;
    return Math.abs(game.pt.X()-game.homePos[0])<eps &&
        Math.abs(game.pt.Y()-game.homePos[1])<eps;
}

board.update();
            
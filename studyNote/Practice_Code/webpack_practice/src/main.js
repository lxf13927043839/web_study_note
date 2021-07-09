import $ from 'jquery'
// import mystyle from './css/index.css'
// 可以直接采用这种写法
import './css/index.css'
import './css/index.less'

$(function () {
    $('.box>ul>li:odd').css('backgroundColor','pink');
    $('.box>ul>li:even').css('backgroundColor','red');
});

class People {
    static s1 = {
        name: 'Tom',
    }
}

console.log(People.s1);


function checkCart(){
    var cookies = getCookies();
    if(cookies.username){
        postEvent('./getCart.do', null, function(json){
            if(json.err_code == 0){
                var div = document.getElementById('cartContent');
                if(json.err_msg == ""){
                    div.innerHTML = "<div><label>空空如也……</label><label>添加一些商品吧！</label></div>";
                }else{
                    div.innerHTML = json.err_msg;
                }
                var label = document.getElementById('price');
                label.innerHTML = "我的购物车 &nbsp;&nbsp;" + json.price + "元";
            }
        }, function(json){});
    }else{
        var div = document.getElementById('shopContent');
        div.innerHTML = "<div><label>需要登录</label><label>请先登录，才能查看自己的购物车。</label></div>";
        var label = document.getElementById('price');
        label.innerHTML = "我的购物车 &nbsp;&nbsp;0元";
    }
}

checkCart();

function changeCart(id, amount){
    var cookies = getCookies();
    if(cookies.username){
        postEvent('./changeCart.do', "id=" + id + "&amount=" + amount, function(json){
            if(json.err_code == 0){
                checkCart();
            }
        }, function(json){});
    }else{
        window.location.href = "./login.html";
    }
}

function clearCart(){
    var cookies = getCookies();
    if(cookies.username){
        postEvent('./clearCart.do', null, function(json){
            if(json.err_code == 0){
                checkCart();
            }
        }, function(json){});
    }else{
        window.location.href = "./login.html";
    }
}
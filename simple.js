jQuery.noConflict(); //追加
(function($) {
    const my_domain = "f2vsj.cybozu.com";
    //const category_master_appid = "731";
    const category_master_appid = "779";
    'use strict';
    kintone.events.on('app.record.index.show', function(event) {
        //増殖バグ防止
        if (document.getElementById('insert') !== null) {
            return;    
        }
        var myHeaderSpace = kintone.app.getHeaderMenuSpaceElement();

        //カテゴリーマスタから値を取得
        var session_check = JSON.parse(sessionStorage.getItem("new_records"));
        
        var params = {
            "app":category_master_appid,
            "query":"order by display_order asc limit 500"
        }
        if(session_check==null){
            kintone.api(
                kintone.api.url('/k/v1/records', true),
                'GET',params,
                function (resp) {
                    //関数呼び出し
                    valueSet(resp.records);
                    var session_category_master = JSON.stringify(resp.records);
                    sessionStorage.setItem( "new_records" , session_category_master);
                },
                function(error){
                    console.log(error);
                }
            )
        }else{
            valueSet(session_check);
        }
                

        function valueSet(records){
            if (event.viewName !== 'カテゴリー別知財情報一覧') {

                var h = document.documentElement.scrollHeight;
                var z = document.documentElement.clientHeight;
                var w = $(window).width();
                if(h == z && w<1900){
                   $(".body-top").css("overflow-y","scroll") 
                }

                var back_arry_true = [];
                if(back_arry_true!=null){
                    back_arry_true = JSON.parse(sessionStorage.getItem("super_json"));
                }
                //}
                var shobunrui_box =[];
                var each_selected = [];

                // sessionStorage.setItem( "test" , records ); 
                // var kari = sessionStorage.getItem("test");

                //一覧画面ヘッダー表示
                myHeaderSpace.style.display = "inline-flex";
                var all_delite = document.createElement("button");
                all_delite.innerHTML = "リセット";
                all_delite.setAttribute("id","all_delite");
                myHeaderSpace.appendChild(all_delite);
                var div0 = document.createElement("div");
                div0.setAttribute("id","insert0");
                var div = document.createElement("div");
                div.setAttribute("id","insert");
                div0.setAttribute("id","insert0");
                myHeaderSpace.appendChild(div);
                myHeaderSpace.appendChild(div0);
                var form0 = document.createElement("form");
                var form1 = document.createElement("form");
                var form2 = document.createElement("form");
                var form3 = document.createElement("form");
                var and_tag1 = document.createElement("p");
                var and_tag2 = document.createElement("p");
                form0.setAttribute("id","form0");
                form1.setAttribute("id","form1");
                form2.setAttribute("id","form2");
                form3.setAttribute("id","form3");
                and_tag1.setAttribute("id","and_tag1");
                and_tag1.innerHTML = "&";
                and_tag2.setAttribute("id","and_tag2");
                and_tag2.innerHTML = "&";
                form0.style.marginLeft = "5px";
                document.getElementById("insert0").appendChild(form0);
                document.getElementById("insert").appendChild(form1);
                document.getElementById("insert").appendChild(and_tag1);
                document.getElementById("insert").appendChild(form2);
                document.getElementById("insert").appendChild(and_tag2);
                document.getElementById("insert").appendChild(form3);
                var search_tag = document.createElement("p");
                search_tag.setAttribute("class","tags");
                var search = document.createElement("input");
                search.setAttribute("id", "syn_input");
                var btn_first = document.createElement("button");
                search_tag.innerHTML="類義語・部分一致検索";
                search_tag.setAttribute("id","search_tag");
                var info = document.createElement("i");
                info.setAttribute("class","fas fa-info-circle");
                info.setAttribute("title","出願日を指定する場合は以下の形式で入力してください\n　年指定：2019/\n　月指定：2019/05");
                btn_first.setAttribute("id","btn_first");
                btn_first.innerHTML = "検索";
                $("#btn_first").css({'background': '#3498db','color':'white','border-radius':'8px','font-size':'20px','height':'35px','width':'70px'});
                document.getElementById("form0").appendChild(search_tag);
                document.getElementById("form0").appendChild(search);
                document.getElementById("search_tag").appendChild(info);
                document.getElementById("form0").appendChild(btn_first);
                var md_tag = document.createElement("p");
                md_tag.setAttribute("class","tags");
                var md = document.createElement("input");
                md.setAttribute("id","md_showing");
                md.setAttribute("placeholder","すべて");
                md.setAttribute("readonly","readonly");
                md.value = sessionStorage.getItem("md_json");
                md_tag.innerHTML="商品カテゴリー";
                document.getElementById("form1").appendChild(md_tag);
                document.getElementById("form1").appendChild(md);
                var tec_tag = document.createElement("p");
                tec_tag.setAttribute("class","tags");
                var tec = document.createElement("input");
                tec.setAttribute("id","tec_showing");
                tec.setAttribute("placeholder","すべて");
                tec.setAttribute("readonly","readonly");
                tec.value = sessionStorage.getItem("tec_json");
                tec_tag.innerHTML="技術カテゴリー";
                document.getElementById("form2").appendChild(tec_tag);
                document.getElementById("form2").appendChild(tec);
                var func_tag = document.createElement("p");
                func_tag.setAttribute("class","tags");
                var func = document.createElement("input");
                func.setAttribute("id","func_showing");
                func.setAttribute("readonly","readonly");
                func.setAttribute("placeholder","すべて");
                func.value = sessionStorage.getItem("func_json");
                func_tag.innerHTML="機能効果カテゴリー";
                document.getElementById("form3").appendChild(func_tag);
                document.getElementById("form3").appendChild(func);
                var all_search = document.createElement("button");
                all_search.innerHTML = "検索";
                all_search.setAttribute("id","category_search");
                document.getElementById("insert").appendChild(all_search);
                if(md.value==""&&tec.value==""&&func.value==""){
                    //sessionStorage.clear();
                    sessionStorage.removeItem("new_json");
                    sessionStorage.removeItem("super_json");
                    sessionStorage.removeItem("md_json");
                    sessionStorage.removeItem("tec_json");
                    sessionStorage.removeItem("func_json");

                    back_arry_true = [];
                }
                
                myHeaderSpace.style.height = "60px";
                //myHeaderSpace.style.width = "1050px";
                myHeaderSpace.style.width = "1120px";
                myHeaderSpace.style.inlineHeight ="20px";

                //ヘッダー下部スペース
                var header = kintone.app.getHeaderSpaceElement();
                var header_inline = document.createElement("div");
                header_inline.setAttribute("class","header_inline");
               
                header.appendChild(header_inline);
                //検索条件表示
                var qw = document.createElement("p");
                qw.innerHTML="類義語・部分一致検索での検索結果";
                qw.setAttribute("class","qw");
                header_inline.appendChild(qw);
                //昇順降順スイッチ
                var swiching = document.createElement("div");
                swiching.setAttribute("class","switchArea");
                header_inline.appendChild(swiching);
                var checker = document.createElement("input");
                checker.setAttribute("type","checkbox");
                checker.setAttribute("id","swich1");
                swiching.appendChild(checker);
                var labeling = document.createElement("label");
                labeling.setAttribute("for","swich1");
                swiching.appendChild(labeling);
                var spans = document.createElement("span");
                labeling.appendChild(spans);
                var sw = document.createElement("div");
                sw.setAttribute("id","swImg");
                swiching.appendChild(sw);
    
                //件数の表示
                var kensu = document.createElement("p");
                kensu.setAttribute("class","kensu");
                kensu.innerHTML = "検索結果が1021件(最大表示件数400件)";
                header_inline.appendChild(kensu);

                //ダイアログを表示する関数を作成
                //モーダルの中身
                var dialog_1 =$(
                    '<div id="dialog_content_1" class="dialog_content" style="display:none">' +
                    '<div class="dialogModal_header" id="category_name"></div>' +
                    '<div class="dialogModal_content" style="width:1300px;background-color:white">' +
                        '<div id = "indicate_div">'+
                            '<p class="indicate">カテゴリーをクリックして選択（複数選択可）</p>'+
                            '<div id = "btn_putting">' +
                              
                            '</div>'+
                        '</div>'+
                        '<div class="tbl" style="display:flex">' + 
                            '<div id = "ajust-margin" style = "display:flex;margin:0 auto;">' +                        
                                '<div id = "inlist_box">' + 
                                '</div>' +
                                '<div id = "has_no_shobunrui">' +
                                '</div>'+
                            '</div>' +
                        '</div>'+
                    '</div>' +
                        
                    '</div>'
                );
                $(myHeaderSpace).append(dialog_1);

                //カテゴリーマスターから取得したrecordsを配列に仕分ける
                var daibunrui_box = [];
                var shobunruis_daibunrui = [];
                var daibunruis_categoryClass = [];
                var categoryClassification = [];
                var shobunruis_categoryClass = [];
                var daibunruis_category_code = []; 
                var shobunruis_category_code = [];
                $(function () {
                    for(var i = 0; i < records.length; i++){
                        //大分類
                        if(records[i].daibunrui_name.value == "" && records[i].category_classification_name.value !== ""){
                            daibunrui_box.push(records[i].category_name.value);
                            daibunruis_categoryClass.push(records[i].category_classification_name.value);
                            var pusher = {};
                            pusher.category_code = records[i].category_code.value;
                            pusher.daibunruis_name = records[i].category_name.value;
                            daibunruis_category_code.push(pusher);
                        }//小分類
                        else if(records[i].daibunrui_name.value !== "" && records[i].category_classification_name.value !== "" && records[i].category_name.value !== ""){
                            shobunrui_box.push(records[i].category_name.value);
                            shobunruis_daibunrui.push(records[i].daibunrui_name.value);
                            shobunruis_categoryClass.push(records[i].category_classification_name.value);
                            var pusher = {};
                            pusher.category_code = records[i].category_code.value;
                            pusher.shobunruis_name = records[i].category_name.value;
                            shobunruis_category_code.push(pusher);
                        }
                        //カテゴリー分類名
                        if(records[i].daibunrui_name.value === "" && records[i].category_classification_name.value === ""){
                            categoryClassification.push(records[i].category_name.value);
                        }
                    }
//                    console.log(records);
                    // if(back_arry_true!=null){
                    //     back_arry_true = JSON.parse(sessionStorage.getItem("new_json"));
                    // }
                });

                var list_put = function(e) {
                    //大分類を小分類の有無で分類
                    let set = new Set(shobunruis_daibunrui);
                    let sho_dai_fil = Array.from(set);
                    var daibunrui_ok = [];
                    var daibunrui_ng = [];
                    var param = e.data.category_num;
                    document.getElementById("category_name").innerHTML = param;

                    for(var i=0;i<daibunrui_box.length;i++){
                        if(daibunruis_categoryClass[i] == param){
                            var checker = "ng";
                            for(var k=0;k<sho_dai_fil.length;k++){
                                if(daibunrui_box[i]==sho_dai_fil[k]){
                                    daibunrui_ok.push(daibunruis_category_code[i]);
                                    checker = "ok";
                                    break;
                                }
                            }
                            if(checker == "ng"){
                                daibunrui_ng.push(daibunruis_category_code[i]);
                            }
                        }
                    }

                    //リストの成型 小分類がある大分類
                    for(var i=0; i<daibunrui_ok.length; i++){
                        
                        var list_box = document.createElement("ul");
                        list_box.setAttribute("id","list_box" + i);
                        list_box.setAttribute("class","list_box");
                        document.getElementById("inlist_box").appendChild(list_box);
                        //大分類li
                        var daibunrui_li = document.createElement("li");
                        daibunrui_li.setAttribute("class","choice sakerui daibunrui");
                        daibunrui_li.setAttribute("id",daibunrui_ok[i].category_code);
                        daibunrui_li.innerHTML = "‣" + daibunrui_ok[i].daibunruis_name + "全て"
                        document.getElementById("list_box" + i).appendChild(daibunrui_li);

                        var shobunrui_div = document.createElement("div");
                        shobunrui_div.setAttribute("class","list_content sakerui_child");
                        shobunrui_div.setAttribute("id","shobunrui_div" + i);
                        document.getElementById("list_box" + i).appendChild(shobunrui_div);
                        
                    　　//小分類li
                        for(var k=0; k<shobunrui_box.length; k++){
                            if(daibunrui_ok[i].daibunruis_name.toString() == shobunruis_daibunrui[k].toString() && shobunruis_categoryClass[k].toString() == param){
                                var shobunrui_li = document.createElement("li");
                                shobunrui_li.setAttribute("class","choice");
                                shobunrui_li.setAttribute("id",shobunruis_category_code[k].category_code);
                                shobunrui_li.innerHTML = "‣" + shobunrui_box[k]
                                document.getElementById("shobunrui_div" + i).appendChild(shobunrui_li);
                                $(shobunrui_li).css("padding-left","15px");
                            }
                        }
                    }
                    //selectedをつける
                    for(var k=0; k<daibunrui_ok.length; k++){
                        if(back_arry_true!=null){
                            for(var n=0;n<back_arry_true.length;n++){
                                if(daibunrui_ok[k].category_code == back_arry_true[n]){
                                    $("#" + daibunrui_ok[k].category_code).addClass("selected parent_check");
                                }
                            }
                        }
                    }
                    for(var k=0; k<shobunrui_box.length; k++){
                        if(back_arry_true!=null){
                            for(var n=0;n<back_arry_true.length;n++){
                                if(shobunruis_category_code[k].category_code == back_arry_true[n]){
                                    $("#" + shobunruis_category_code[k].category_code).addClass("selected");
                                }
                                var $parent = $("#" + shobunruis_category_code[k].category_code).parent().parent().children("");
                                if($parent.hasClass("parent_check") ){
                                    //なにもしない
                                }else if(shobunruis_category_code[k].category_code == back_arry_true[n]){
                                    $("#" + shobunruis_category_code[k].category_code).addClass("parent_check");
                                }
                            }
                        }
                    }

                    //リストの成型 小分類がない大分類
                    if(param !== "カテゴリー"){
                        for(var i=0; i<daibunrui_ng.length; i++){
                            var no_list_box = document.createElement("ul");
                            no_list_box.setAttribute("id","no_list_box" + i);
                            no_list_box.setAttribute("class","no_list_box");
                            no_list_box.setAttribute("class","no_shobunrui");
                            document.getElementById("has_no_shobunrui").appendChild(no_list_box);
                            var no_daibunrui_li = document.createElement("li");
                            no_daibunrui_li.setAttribute("class","choice no_shobunrui_parent");
                            no_daibunrui_li.setAttribute("class","choice sakerui daibunrui");
                            no_daibunrui_li.setAttribute("id",daibunrui_ng[i].category_code);
                            no_daibunrui_li.innerHTML = "‣" + daibunrui_ng[i].daibunruis_name;
                            document.getElementById("no_list_box" + i).appendChild(no_daibunrui_li);
                        }
                        if(param != "機能効果カテゴリー"){
                            $(".list_box").css("width","180px")
                            $(".no_shobunrui").css("width","180px")
                        }
                    }
                    //else{
                    //     var no_list_box = document.createElement("ul");
                    //     no_list_box.setAttribute("id","no_list_box");
                    //     no_list_box.setAttribute("class","no_list_box");
                    //     no_list_box.setAttribute("class","no_shobunrui");
                    //     document.getElementById("has_no_shobunrui").appendChild(no_list_box);
                    //     var no_list_box = document.createElement("li");
                    //     var no_daibunrui_li = document.createElement("li");
                    //     no_daibunrui_li.setAttribute("class","choice no_shobunrui_parent");
                    //     no_daibunrui_li.setAttribute("class","choice sakerui daibunrui");
                    //     no_daibunrui_li.setAttribute("id","000000");
                    //     no_daibunrui_li.innerHTML = "‣その他" ;
                    //     document.getElementById("no_list_box").appendChild(no_daibunrui_li);

                    //     var shobunrui_div = document.createElement("div");
                    //     shobunrui_div.setAttribute("class","list_content sakerui_child");
                    //     shobunrui_div.setAttribute("id","shobunrui_div");
                    //     document.getElementById("no_list_box").appendChild(shobunrui_div);
                    //     for(var i=0; i<daibunrui_ng.length; i++){
                    //             var shobunrui_li = document.createElement("li");
                    //             shobunrui_li.innerHTML = "‣" + daibunrui_ng[i].daibunruis_name
                    //             shobunrui_li.setAttribute("class","choice");
                    //             shobunrui_li.setAttribute("id",daibunrui_ng[i].category_code);
                    //             document.getElementById("shobunrui_div").appendChild(shobunrui_li);
                    //             $(shobunrui_li).css("padding-left","15px");
                    //     }
                    // }
                    //selectedとparent_checkつける
                    for(var k=0; k<daibunrui_ng.length; k++){
                        if(back_arry_true!=null){
                            for(var n=0;n<back_arry_true.length;n++){
                                if(daibunrui_ng[k].category_code == back_arry_true[n]){
                                    $("#" + daibunrui_ng[k].category_code).addClass("selected parent_check");
                                }
                                if(back_arry_true[n] === "000000"){
                                    $("#000000").addClass("selected parent_check");
                                }
                            }
                        }
                    }
                    if($("#000000").hasClass("parent_check")){
                        $("#000000").parent().children().children().removeClass("parent_check");
                    }

                    //ボタン
                    var btn_delite = document.createElement("button");
                    btn_delite.setAttribute("class","btn btn-delite");
                    btn_delite.setAttribute("id",param);
                    btn_delite.setAttribute("type","button");
                    btn_delite.innerHTML = "選択解除"
                    document.getElementById("btn_putting").appendChild(btn_delite);

                    var btn_decide = document.createElement("button");
                    btn_decide.setAttribute("class","btn btn-default btn-decide");
                    btn_decide.setAttribute("id",param);
                    btn_decide.setAttribute("type","button");
                    btn_decide.setAttribute("data-dialogmodal-but","cancel")
                    btn_decide.innerHTML = "確定"
                    document.getElementById("btn_putting").appendChild(btn_decide);

                    //開いた時点でselectedなものを配列に格納
                    for(var i=0 ;i<$(".selected").length;i++){
                        var input_check = $(".selected").eq(i).attr('id');
                        each_selected.push(input_check);
                    }
                    var h = document.documentElement.scrollHeight;
                    var z = document.documentElement.clientHeight;
                    var w = $(window).width();
                    if(h == z && w<1900){
                    $(".body-top").css("overflow-y","hidden") 
                    }
                    var windowWidth = $(window).width();
                    var width_ajust = (windowWidth - 1300)/2;
                    if(h == z){
                        //$(".dialogModal_content,.dialogModal,.dialogModal_top,.dialogModal_header,.dialogModal,.dialogModal_body,dialogModal_footer").css('marginLeft',width_ajust);
                        $(".dialogModal_content").css('marginLeft',width_ajust);

                    }else{
                        width_ajust += 8;
                        //$(".dialogModal_content,.dialogModal,.dialogModal_top,.dialogModal_header,.dialogModal,.dialogModal_body,dialogModal_footer").css('marginLeft',width_ajust);
                        $(".dialogModal_content").css('marginLeft',width_ajust);
                    }
                    
                }
                $(window).resize(function() {
                    // リロード
                    //location.reload();
                    var windowWidth = $(window).width();
                    var width_ajust = (windowWidth - 1300)/2;
                    //$(".dialogModal_content,.dialogModal_body").css('marginLeft',width_ajust);
                    if(windowWidth>1900){
                        //$(".dialogModal_content,.dialogModal,.dialogModal_top,.dialogModal_header,.dialogModal,.dialogModal_body,dialogModal_footer").css('marginLeft',width_ajust);
                        $(".dialogModal_content").css('marginLeft',width_ajust);
                    }else{
                        //width_ajust += 8;
                        //$(".dialogModal_content,.dialogModal,.dialogModal_top,.dialogModal_header,.dialogModal,.dialogModal_body,dialogModal_footer").css('marginLeft',width_ajust);
                        $(".dialogModal_content").css('marginLeft',width_ajust);
                    }
                    // var h = document.documentElement.scrollHeight;
                    // var z = document.documentElement.clientHeight;
                    // var w = $(window).width();
                    // if(h == z && w<1900){
                    //     $(".body-top").css("overflow-y","scroll") 
                    // }
                });

                $(document).on('click','.btn-decide', function(){

                    var target = document.getElementById("inlist_box")
                    while (target.firstChild) {
                        target.removeChild(target.firstChild);
                    }
                    var target = document.getElementById("has_no_shobunrui")
                    while (target.firstChild) {
                        target.removeChild(target.firstChild);
                    }
                    var target = document.getElementById("btn_putting");
                    while (target.firstChild) {
                        target.removeChild(target.firstChild);
                    }

                    //セッションを作る
                    var input_check_arry = [];
                    for(var i=0 ;i<$(".selected").length;i++){
                        var input_check = $(".selected").eq(i).attr('id');
                        input_check_arry.push(input_check);
                    }
                    //まずは選ばれたものをテキスト形式で羅列する。
                    //idとる　ID＝コード　
                    // var input_check = $(".selected").text();
                    // //"‣"を目印に配列を作り区切る
                    // var input_split = input_check.split("‣");
                    // //一番目の要素を削除
                    // input_split.shift();
                    //JSONへ変換
                    var jstr = JSON.stringify(input_check_arry);
                    //JSONをセッションに書き込み
                    sessionStorage.setItem("new_json",jstr);
                    //JSONを配列に変換
                    var back_arry = JSON.parse(sessionStorage.getItem("new_json"));

                    //決定を押したときに開いた時点でselectedだった配列を削除
                    if(back_arry_true!=null){
                        for(var k=0;k<back_arry_true.length;k++){
                            for(var i=0;i<each_selected.length;i++){
                                if(back_arry_true[k] == each_selected[i]){
                                    var num = back_arry_true.indexOf(back_arry_true[k]);
                                    back_arry_true.splice(num,1);
                                }    
                            }
                        }  
                    }  
                    each_selected = [];
                    
                    //選ばれものを大元のデータ配列に格納している。
                    if(back_arry_true!=null){
                        for(var i=0;i<back_arry.length;i++){
                            back_arry_true.push(back_arry[i]);
                        }
                    }
                    
                    var j_back_arry_true = JSON.stringify(back_arry_true);
                    sessionStorage.setItem("super_json",j_back_arry_true);
                    if(back_arry_true!=null){
                        back_arry_true = JSON.parse(sessionStorage.getItem("super_json"));
                    }
                    
                    //back_arry_true = back_arry;

                    var input_back = $(".parent_check").text();
                    var input_replace = input_back.replace("‣",",")
                    input_replace = input_replace.replace("‣",",");
                    input_replace = input_replace.replace("‣",",");
                    input_replace = input_replace.replace("‣",",");
                    var input_replace_number = input_replace.length;
                    if(document.getElementById("商品カテゴリー")!=null){
                        if (input_replace_number > 10){
                            md.value = input_replace.substr(1, 10) + "...";
                        }else{
                            md.value = input_replace.substr(1, 10);
                        }
                    }
                    if(document.getElementById("技術カテゴリー")!=null){
                        if (input_replace_number > 10){
                            tec.value = input_replace.substr(1, 10) + "...";
                        }else{
                            tec.value = input_replace.substr(1, 10);
                        }
                    }
                    if(document.getElementById("機能効果カテゴリー")!=null){
                        if (input_replace_number > 10){
                            func.value = input_replace.substr(1, 10) + "...";
                        }else{
                            func.value = input_replace.substr(1, 10);
                        }
                    }
                    var md_v = md.value
                    sessionStorage.setItem("md_json",md_v);
                    var tec_v = tec.value
                    sessionStorage.setItem("tec_json",tec_v);
                    var func_v = func.value
                    sessionStorage.setItem("func_json",func_v);
                });

                var showDialog = function() {
                    $('.dialog_content').dialogModal({
                        topOffset: 64,
                    });
                    
                    //sessionStorage.clear();
                    
                    //幅取得
                    var width_set1 = document.getElementById("inlist_box");
                    var obj = width_set1.style.width;
                    //var width_set2 = $("#has_no_shobunrui").width();
                    //var sum_width = width_set1 + width_set2;
                    console.log(obj);
                    if(daibunrui_box.length == 3){
                        $(".dialogModal .dialogModal_top .dialogModal_header").css("width","1300px");
                    }else{
                        $(".dialogModal .dialogModal_top .dialogModal_header").css("width","1300px");
                    }

                };
                $('#md_showing').on('click',{category_num:'商品カテゴリー'},list_put);
                $('#tec_showing').on('click',{category_num:'技術カテゴリー'},list_put);
                $('#func_showing').on('click',{category_num:'機能効果カテゴリー'},list_put);
                $('#md_showing,#tec_showing,#func_showing').on('click',showDialog);

                //大分類をクリック
                $(document).on('click','.sakerui',function(){
                    var $sakerui = $(this);
                    var $shobunrui_click = $sakerui.parent().children().children("li");
                    //大分類が選択されているときにクリックして大分類の選択を消したらその下の小分類の選択もすべて消える。
                    if($sakerui.hasClass('selected')){
                        $($shobunrui_click).removeClass('selected');
                    } else{
                        //大分類が選択されていない時に大分類をクリックするとその下の小分類もすべて選択される。
                        $($shobunrui_click).addClass('selected');
                    }
                });
                //子供をクリック
                $(document).on('click','.sakerui_child .choice',function(){
                    var $sakerui_child = $(this);
                    var $daibunrui_click = $sakerui_child.parent().parent().children("li");
                    if($($daibunrui_click).hasClass('selected')){
                        $($daibunrui_click).removeClass('selected');
                    }
                    // if ($(this).parent().$('.list_content>li').length == $('list_content>.selected').length) {
                    //     $daibunrui_click.addClass("selected");
                    // }

                });
                // hama add
                $(document).on('click','.choice', function(){
                    var $selected = $(this);
                    if($selected.hasClass('selected')){
                        $selected.removeClass('selected');
                    }else{
                        $selected.addClass('selected');
                    }
                });

                //親チェック
                $(document).on('click','.sakerui',function(){
                    var $sakerui = $(this);
                    var $shobunrui_click = $sakerui.parent().children().children("li");
                    //大分類が選択されているときにクリックして大分類の選択を消したらその下の小分類の選択もすべて消える。
                        $($shobunrui_click).removeClass('parent_check');
                    
                        //大分類が選択されていない時に大分類をクリックするとその下の小分類もすべて選択される。
                    
                    // var sample = document.getElementById("inlist_box").offsetWidth;
                    //     console.log(sample);
                    //親をクリックしたときに自分自身がparent_checkを持っていたらはずす、持っていなかったらつける
                    if($sakerui.hasClass('parent_check')){
                        $sakerui.removeClass('parent_check');
                    }else{
                        $sakerui.addClass('parent_check');
                    }
                });

                $(document).on('click','.sakerui_child .choice',function(){
                    var $sakerui_child = $(this);
                    var $sakerui_children = $(this).parent().children('li');
                    var $daibunrui_click = $sakerui_child.parent().parent().children("li");
                    var check_flag = "0"
                    if(!$daibunrui_click.hasClass('parent_check') && $sakerui_child.hasClass('parent_check')){
                        $sakerui_child.removeClass('parent_check')
                        check_flag = "1"
                    }
                    if(!$sakerui_child.hasClass('parent_check') && !$daibunrui_click.hasClass('parent_check') && check_flag=="0"){
                        $sakerui_child.addClass('parent_check')
                    }
                    if($daibunrui_click.hasClass('parent_check')){
                        $daibunrui_click.removeClass('parent_check');
                        $sakerui_children.addClass('parent_check');
                        $sakerui_child.removeClass('parent_check')
                    }
                });

                //個別の選択解除ボタンをクリック
                $(document).on('click','.btn-delite', function(){
                    var $each_selected = $(this).parent().parent().parent().find(".selected");
                    var $remove_select = $each_selected.text();
                    var remove_list = $remove_select.split("‣");
                    //一番目の要素を削除
                    remove_list.shift();
                    // for(var i;i<remove_list.length;i++){
                    //     back_arry_true.splice(remove_list[i],1);
                    // }
                    $each_selected.removeClass('selected parent_check');
                });

                //すべての選択解除
                $(document).on('click','#all_delite', function(){
                    md.value = "";
                    tec.value = "";
                    func.value = "";
                    $(".selected").removeClass(".selected");
                    $(".parent_check").removeClass(".parent_check");
                    sessionStorage.removeItem("new_json");
                    back_arry_true = [];
                    //sessionStorage.clear();
                    sessionStorage.removeItem("new_json");
                    sessionStorage.removeItem("super_json");
                    sessionStorage.removeItem("md_json");
                    sessionStorage.removeItem("tec_json");
                    sessionStorage.removeItem("func_json");

                    var url = "https://" + my_domain +"/k/" + kintone.app.getId();
                    location.href = encodeURI(url);
                });

                //モーダルの×ボタン
                $(document).on('click','.close', function(){
                    var target = document.getElementById("inlist_box")
                    while (target.firstChild) {
                        target.removeChild(target.firstChild);
                    }
                    var target = document.getElementById("has_no_shobunrui")
                    while (target.firstChild) {
                        target.removeChild(target.firstChild);
                    }
                    var target = document.getElementById("btn_putting")
                    while (target.firstChild) {
                        target.removeChild(target.firstChild);
                    }
                })
                $(document).on('click','#category_search', function(){
                    if(md.value!=""||tec.value!=""||func.value!=""){
                        if(back_arry_true!=null){
                            var str = back_arry_true.join(',');
                        }else{
                            var str = JSON.parse(sessionStorage.getItem("new_json"));
                            var j_true = JSON.stringify(str);
                            sessionStorage.setItem("super_json",j_true);
                        }
                        var url = "https://" + my_domain +"/k/" + kintone.app.getId() + "/?query=" 
                        var q = "";
                        if(md.value!=""){
                            q = 'product_code in ('+ str +')'
                        }
                        if(tec.value!=""){
                            if(q.length > 0){
                                q = q + " and "
                            }
                            q = q + 'technology_code in ('+ str +')'
                        }
                        if(func.value!=""){
                            if(q.length > 0 ){
                                q = q + " and "
                            }
                            q = q + 'function_code in ('+ str +')'
                        }
                        url = url + q;
                        location.href = encodeURI(url);
                    }
                })
            }
        }
    })  

    //詳細画面のハッシュタグのみ別指定
    kintone.events.on('app.record.detail.show', function(event){
        $(".control-inner-gaia a").parent().parent().parent().addClass("hash_tag");
        
        for(var k=0; k<$('.control-label-field-gaia').length; k++){
            var label_html = $('.control-value-label-gaia').eq(k).children().html()
            if(label_html=="発明者コメント" || label_html=="実施製品" || label_html=="調査日"){
                $('.control-label-field-gaia').eq(k).hide(); 
            }
        }
        var record = event.record;
        var email_name = record['email'].value
        var get_management_no = record['management_no'].value
        var get_family_no = record['family_no'].value
        var get_invention_name = record['invention_name'].value
        console.log(email_name)
        var email_link = document.createElement("a")
        email_link.innerHTML = email_name
        email_link.href = "mailto:" + email_name + "?body=管理番号："+get_management_no+"%0d%0aファミリー番号："+get_family_no+"%0d%0a発明の名称："+get_invention_name 
        kintone.app.record.getSpaceElement('email_ip').appendChild(email_link)

        //hashtag
        var get_hash = record['hash'].value
        var arry_get_hash = get_hash.split(" ")
        for(var i = 0; i<arry_get_hash.length; i++){
            var hash_content =  document.createElement("a")
            hash_content.innerHTML = "#" + arry_get_hash[i] + " "
            var url = "https://" + my_domain +"/k/" + kintone.app.getId() + "/?query= hash like \"" + arry_get_hash[i] +"\""
            var url_encode = encodeURI(url)
            hash_content.href = url_encode
            hash_content.target = "_blank"
            hash_content.style.display = "inline-block";
            kintone.app.record.getSpaceElement('put_hash').appendChild(hash_content)
        }

        var record = event.record;
        var subTable = record["inventor_table"].value;
        if (subTable.length === 0) { return event } // subtable record nothing
        // テーブルフィールドを取得
        var el = kintone.app.record.getFieldElement("inventor_table");

        function asyncProcess(val, len) {
            
            return new Promise((resolve, reject) => {
                var timer = setInterval(() => {
                    if (val.length - 1 === len) {
                        
                        clearInterval(timer);
                        resolve(val.length);
                    } else {
                        
                    }
                }, 100);
            });
        }
        asyncProcess(el.rows, subTable.length).then(
            response => {
                for (var i=1, len=response; i<len; i+=1) {
                    var email_table = el.rows[i].cells[3].textContent;
                    el.rows[i].cells[3].getElementsByTagName("a")[0].href = 'mailto:'+ email_table +"?body=管理番号："+get_management_no+"%0d%0aファミリー番号："+get_family_no+"%0d%0a発明の名称："+get_invention_name 
                }
                return event;
            },
            error => {
                return event;
            }
        );


    })
 })(jQuery);

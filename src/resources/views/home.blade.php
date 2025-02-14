<!--
*   extends：親ビューを継承する（読み込む）
*   親ビュー名：layout を指定
-->
@extends('layout')

<!--
*   section：子ビューにsectionでデータを定義する
*   セクション名：scripts を指定
-->
@section('styles')
<link href="/css/common.css" rel="stylesheet" type="text/css" media="all">
@endsection

<!--
*   section：子ビューにsectionでデータを定義する
*   セクション名：content を指定
*   用途：タスクを追加するページのHTMLを表示する
-->
@section('contents')
<h1>全店舗集計</h1>
<div class="bottom-space top-space">
    <a class="button" href="{{ route('syukei.today')}}">本日データ</a>
    <a class="button" href="{{ route('syukei.yesterday')}}">前日データ</a>
</div>

<h1>店舗別データ</h1>
<div id="div_1" class="bottom-space top-space">
    <a class="button" href="javascript:void(0)"
        onClick="document.getElementById('div_2').style.display='block';
                 document.getElementById('div_1').style.display='none';
                 document.getElementById('div_6').style.display='none'
                 document.getElementById('div_5').style.display='block';">地区別稼動報告書</a>
</div>

<div id="div_2" style="display:none" class="bottom-space top-space">
    <a class="button" href="javascript:void(0)"
        onClick="document.getElementById('div_2').style.display='none';
                 document.getElementById('div_1').style.display='block'">地区別稼動報告書</a>
    <div style="color: red; line-height: 20px;">※更新は12:30～となりますので<br>更新以前はそれぞれ1日前のデータとなります</div>
    <table class="bottom-space top-space">
        <colgroup>
            <col width="230">
            <col width="150">
            <col width="150">
        </colgroup>

        <thead></thead>
        <tbody id="TikuKudou_tbody"></tbody>
        <tfoot></tfoot>
    </table>
</div>
   
<div id="div_5" class="bottom-space top-space">
    <a class="button" href="javascript:void(0)"
        onClick="document.getElementById('div_6').style.display='block';
                 document.getElementById('div_5').style.display='none';
                 document.getElementById('div_2').style.display='none';
                 document.getElementById('div_1').style.display='block'">営業日報</a>
</div>

<div id="div_6" style="display:none" class="bottom-space top-space">
    <a class="button" href="javascript:void(0)"
        onClick="document.getElementById('div_6').style.display='none';
                 document.getElementById('div_5').style.display='block'">営業日報</a>
    <table class="bottom-space top-space">
        <colgroup>
            <col width="230">
            <col width="150">
            <col width="150">
        </colgroup>

        <thead></thead>
        <tbody id="Nippou_tbody"></tbody>
        <tfoot></tfoot>
    </table>
</div>

<h1>売上各種集計表</h1>
<div class="bottom-space top-space">
    <font size="2"><a class="button" href="./Hyou_106.html">期間売上(1日平均比較)</a></font>
</div>
<!-- <div class="bottom-space top-space"> -->
    <!-- <font size="2"><a class="button bottom-space top-space" href="./Hyou_106Q.html">期間売上_四半期(1日平均比較)</a></font> -->
<!-- </div> -->
<!-- <div class="bottom-space top-space"> -->
    <!-- <font size="2"><a class="button bottom-space top-space" href="./Hyou_106Y.html">期間売上_当期(1日平均比較)</a></font> -->
<!-- </div> -->

<script language="javascript">
    //今日
    var now = new Date();
    var nYear = now.getFullYear();
    var nMonth = now.getMonth();
    var nDate = now.getDate();

    //昨日
    var yesterday = new Date(nYear, nMonth, nDate - 1);
    var yYear = yesterday.getFullYear();
    var yMonth = yesterday.getMonth()+1;
    var yDate = yesterday.getDate();

    //2日前
    var yesterday2 = new Date(nYear, nMonth, nDate - 2);
    var yYear2 = yesterday2.getFullYear();
    var yMonth2 = yesterday2.getMonth()+1;
    var yDate2 = yesterday2.getDate();


    //現在時刻の取得
    myTime=now.getHours();

    if(myTime>=0 && myTime<9){
        document.write("<div class=bottom-space top-space>");
        document.write("<font size=2><a class=button href=./Menu41/UriageReport"+yYear2+yMonth2+yDate2+".html>売上状況報告書("+yMonth2+"/"+yDate2+")</a></font>");
        document.write("</div>");
        // document.write("<div class=bottom-space top-space>");
        // document.write("<font size=2><a class=button href=./Menu41/UriageReportQ"+yYear2+yMonth2+yDate2+".html>売上状況報告書_四半期("+yMonth2+"/"+yDate2+")</a></font>");
        // document.write("</div>");
    }
    else{
        document.write("<div class=bottom-space top-space>");
        document.write("<font size=2><a class=button href=./Menu41/UriageReport"+yYear+yMonth+yDate+".html>売上状況報告書("+yMonth+"/"+yDate+")</a></font>");
        document.write("</div>");
        // document.write("<div class=bottom-space top-space>");
        // document.write("<font size=2><a class=button href=./Menu41/UriageReportQ"+yYear+yMonth+yDate+".html>売上状況報告書_四半期("+yMonth+"/"+yDate+")</a></font>");
        // document.write("</div>");
    }

</script>
@endsection

<!--
*   section：子ビューで定義したデータを表示する
*   セクション名：scripts を指定
-->
@section('scripts')
<script src="js/menu.js"></script>
@endsection
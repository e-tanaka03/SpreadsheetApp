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
<link rel="stylesheet" href="/css/SyukeiD0.css" type="text/css">
@endsection

<!--
*   section：子ビューにsectionでデータを定義する
*   セクション名：content を指定
*   用途：タスクを追加するページのHTMLを表示する
-->
@section('contents')
<table class="bottom-space">

    <colgroup id="colgroup">
        <col width="33">
        <col width="128">
        <col width="110">
        <col width="110">
        <col width="67">
        <col width="67">
        <col width="67">
    </colgroup>

    <thead id="thead"></thead>

    <tbody id="tbody">
        <tr class="BorderTop Header">
            <td colspan="2" rowspan="2" class="BorderLeft">店　名</td>
            <td rowspan="2">店舗<br>売上合計</td>
            <td rowspan="2">粗利指標<br>合計</td>
            <td colspan="3" id="th_operate"></td>
            <td id="th_outInfo" class="BorderRight">アウト情報</td>
        </tr>
        <tr id="tr_outInfo" class="BorderTop-Bottom Header">
            <!-- <td colspan="2" rowspan="2" class="BorderLeft">店　名</td> -->
            <!-- <td colspan="2" rowspan="2" class="BorderLeft">店　名</td> -->
            <!-- <td rowspan="2">店舗(補)<br>売上合計</td> -->
            <!-- <td rowspan="2">粗利指標<br>合計</td> -->
            <td class="Kadou">稼動計</td>
            <td class="Kadou">Ｐ稼動</td>
            <td class="Kadou">Ｓ稼動</td>
        </tr>
    </tbody>

    <tfoot id="tfoot"></tfoot>

</table>

<table class="bottom-space">

    <colgroup id="sub_colgroup">
        <col width="33">
        <col width="128">
        <col width="110">
        <col width="110">
        <col width="67">
        <col width="67">
        <col width="67">
    </colgroup>

    <thead id="sub_thead"></thead>

    <tbody id="sub_tbody"></tbody>

    <tfoot id="sub_tfoot"></tfoot>

</table>
@endsection

<!--
*   section：子ビューで定義したデータを表示する
*   セクション名：scripts を指定
-->
@section('scripts')
<script src="js/SyukeiD0.js"></script>
@endsection
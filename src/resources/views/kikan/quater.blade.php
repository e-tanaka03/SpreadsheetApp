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
<link href="/css/Hyou_106Q.css" rel="stylesheet" type="text/css" media="all">
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
        <col width="110">
        <col width="110">
        <col width="110">
        <col width="110">
        <col width="110">
        <col width="110">
        <col width="110">
        <col width="110">
        <col width="110">
    </colgroup>

    <thead id="thead">
        <tr>
            <td></td>
            <td colspan="7" id="Title" class="TextLeft"></td>
            <td></td>
            <td></td>
            <td class="TextRight">更新：</td>
            <td colspan="2" id="Date" class="TextRight"></td>
        </tr>

        <tr>
            <td></td>
            <td colspan="4" id="Period"></td>
            <td colspan="3" id="Quarter"></td>
            <td></td>
            <td></td>
            <td></td>
            <td colspan="2" class="TextRight">単位：千円</td>
        </tr>
    </thead>

    <tbody id="tbody">
        <tr class="BorderRound Header">
            <td colspan="2">店　名</td>
            <td class="BorderRight-thin">客粗利</td>
            <td>補正<br>目標売上</td>
            <td>補正<br>実績売上</td>
            <td>達成率</td>
            <td>平均差異</td>
            <td class="BorderRight-thin">累計差異</td>
            <td>目標粗利</td>
            <td class="TextColor-Blue TextBold">実績粗利</td>
            <td>達成率</td>
            <td>平均差異</td>
            <td>累計差異</td>
        </tr>
    </tbody>

    <tfoot id="tfoot"></tfoot>

</table>
@endsection

<!--
*   section：子ビューで定義したデータを表示する
*   セクション名：scripts を指定
-->
@section('scripts')
<script src="js/Hyou_106Q.js"></script>
@endsection
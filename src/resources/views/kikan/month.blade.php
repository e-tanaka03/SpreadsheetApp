@php
$eigyobu_num = [0, 0, 0, 0];
$eigyobu_name = ["第\n一\n営\n業\n部", "第\n二\n営\n業\n部", 
                 "第\n三\n営\n業\n部", "第\n四\n営\n業\n部"];
$backcolor = ['BackColor-White', 'BackColor-Blue'];
$daiNeigyo = 0;

foreach($periodsales as $periodsale){
    $eigyobu_num[((int)(($periodsale->store_id)/100))-1]++;
}
@endphp
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
<!-- <link href="/css/common.css" rel="stylesheet" type="text/css" media="all"> -->
<link href="/css/Hyou_106.css" rel="stylesheet" type="text/css" media="all">
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
            <td colspan="5" id="Title" class="TextLeft"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="TextRight">更新：</td>
            <td colspan="2" id="Date" class="TextRight"></td>
        </tr>

        <tr>
            <td></td>
            <td colspan="4" id="Period"></td>
            <td></td>
            <td></td>
            <td></td>
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
            <td>目標売上</td>
            <td>実績売上</td>
            <td>達成率</td>
            <td>平均差異</td>
            <td class="BorderRight-thin">累計差異</td>
            <td>目標粗利</td>
            <td class="TextColor-Blue TextBold">実績粗利</td>
            <td>達成率</td>
            <td>平均差異</td>
            <td>累計差異</td>
        </tr>

        @foreach($periodsales as $periodsale)
            <tr>
                @if($daiNeigyo < (int)(($periodsale->store_id)/100))
                    <!-- 営業部名 -->
                    <td rowspan="{{ $eigyobu_num[$daiNeigyo] }}" class="BackColor-Green BorderLeft">{{ $eigyobu_name[$daiNeigyo] }}</td>
                    @php
                        $daiNeigyo++;
                    @endphp 
                @endif

                <!-- 店名 -->
                <td>{{ $periodsale->store_name }}</td>
                <!-- 客粗利 -->
                <td class="TextRight BorderRight-thin">{{ round( $periodsale->data2 / $periodsale->data3 ) }}</td>
                <!-- 目標売上 -->
                <td class="TextRight">{{ round( $periodsale->data5 ) }}</td>
                <!-- 実績売上 -->
                <td class="TextRight">{{ round( $periodsale->data1 / $periodsale->data4 ) }}</td>
                <!-- 達成率 -->
                @php
                    $achievement_rate = (($periodsale->data1 / $periodsale->data4) / $periodsale->data5) * 1000;
                @endphp
                <td class="TextRight">{{ (round($achievement_rate)) / 10 }}%</td>
                <!-- 平均差異 -->
                @if(($periodsale->data1 / $periodsale->data4) - $periodsale->data5 > 0)
                    <td class="TextRight">{{ round( ($periodsale->data1 / $periodsale->data4) - $periodsale->data5 ) }}</td>
                @else
                    <td class="TextRight TextColor-Red">{{ round( ($periodsale->data1 / $periodsale->data4) - $periodsale->data5 ) }}</td>
                @endif
                <!-- 累計差異 -->
                @if(($periodsale->data1 / $periodsale->data4) - $periodsale->data5 > 0)
                    <td class="TextRight">{{ round( (($periodsale->data1 / $periodsale->data4) - $periodsale->data5) * $periodsale->data4 ) }}</td>
                @else
                    <td class="TextRight TextColor-Red">{{ round( (($periodsale->data1 / $periodsale->data4) - $periodsale->data5) * $periodsale->data4 ) }}</td>
                @endif
                    
            </tr>
        @endforeach
    </tbody>

    <tfoot id="tfoot"></tfoot>

</table>

<table class="bottom-space">

    <colgroup id="sub_colgroup">
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
<!-- <script src="js/Hyou_106.js"></script> -->
@endsection
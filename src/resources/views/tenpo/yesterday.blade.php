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
<link rel="stylesheet" href="/css/SyukeiD1.css" type="text/css">
@endsection

<!--
*   section：子ビューにsectionでデータを定義する
*   セクション名：content を指定
*   用途：タスクを追加するページのHTMLを表示する
-->
@section('contents')
<table id="Syu">

    <colgroup>
        <col width=" 33">
        <col width="128">
        <col width=" 50">
        <col width=" 70">
        <col width=" 60">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
        <col width=" 50">
    </colgroup>

    <thead id="Syu_thead"></thead>

    <tbody id="Syu_tbody" class="BorderRound">
        <tr class="BackColor-Purple">
            <td rowspan="6" id="shop_name1" class="BorderRight-None"></td>
            <td>種別</td>
            <td>台</td>
            <td>(補)売上</td>
            <td class="BorderRight-thin">(補)割</td>
            <td>9:00</td>
            <td>10:00</td>
            <td>11:00</td>
            <td>12:00</td>
            <td>13:00</td>
            <td>14:00</td>
            <td>15:00</td>
            <td>16:00</td>
            <td>17:00</td>
            <td>18:00</td>
            <td>19:00</td>
            <td>20:00</td>
            <td>21:00</td>
            <td>22:00</td>
            <td>23:00</td>
            <td>24:00</td>
        </tr>

        <tr id="GreenRow"></tr>
        <tr id="YellowGreenRow" class="BackColor-YellowGreen"></tr>
        <tr id="DeepBlueRow"></tr>
        <tr id="ClearBlueRow" class="BackColor-ClearBlue"></tr>

        <tr id="Total">
            <td class="TextBold">合　計</td>
        </tr>

    </tbody>

    <tfoot id="Syu_tfoot">
        <tr>
            <td colspan="4">
                <div>
                    <img id="Picture">
                </div>
                <div class="paradiso bottom-space">
                    Spd App
                </div>
                <div id="shop_name2"></div>
            </td>
            <td colspan="17">
                <div style="width: 835px; margin-left: auto; margin-right: 0px;">
                    <canvas id="BarChart">
                        Canvas not supported...
                    </canvas>
                </div>
            </td>
        </tr>
    </tfoot>

</table>

<table id="Ki_Green" class="bottom-space">
    <colgroup>
        <col width=" 33">
        <col width="270">
        <col width=" 30">
        <col width=" 55">
        <col width=" 55">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
    </colgroup>

    <thead id="Ki_Green_thead">
        <tr>
            <td colspan="21"></td>
        </tr>
    </thead>

    <tbody id="Ki_Green_tbody" class="BorderRound"></tbody>

    <tfoot id="Ki_Green_tfoot"></tfoot>
</table>

<table id="Ki_YellowGreen" class="bottom-space">
    <colgroup>
        <col width=" 33">
        <col width="270">
        <col width=" 30">
        <col width=" 55">
        <col width=" 55">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
    </colgroup>

    <thead id="Ki_YellowGreen_thead">
        <tr>
            <td colspan="21"></td>
        </tr>
    </thead>

    <tbody id="Ki_YellowGreen_tbody" class="BorderRound"></tbody>

    <tfoot id="Ki_YellowGreen_tfoot"></tfoot>
</table>

<table id="Ki_DeepBlue" class="bottom-space">
    <colgroup>
        <col width=" 33">
        <col width="270">
        <col width=" 30">
        <col width=" 55">
        <col width=" 55">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
    </colgroup>

    <thead id="Ki_DeepBlue_thead">
        <tr>
            <td colspan="21"></td>
        </tr>
    </thead>

    <tbody id="Ki_DeepBlue_tbody" class="BorderRound"></tbody>

    <tfoot id="Ki_DeepBlue_tfoot"></tfoot>
</table>

<table id="Ki_ClearBlue" class="bottom-space">
    <colgroup>
        <col width=" 33">
        <col width="270">
        <col width=" 30">
        <col width=" 55">
        <col width=" 55">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
        <col width=" 45">
    </colgroup>

    <thead id="Ki_ClearBlue_thead">
        <tr>
            <td colspan="21"></td>
        </tr>
    </thead>

    <tbody id="Ki_ClearBlue_tbody" class="BorderRound"></tbody>

    <tfoot id="Ki_ClearBlue_tfoot"></tfoot>
</table>
@endsection

<!--
*   section：子ビューで定義したデータを表示する
*   セクション名：scripts を指定
-->
@section('scripts')
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
<script src="js/ShopkD1.js"></script>
@endsection
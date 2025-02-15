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

@endsection

<!--
*   section：子ビューで定義したデータを表示する
*   セクション名：scripts を指定
-->
@section('scripts')
<script src="js/menu.js"></script>
@endsection
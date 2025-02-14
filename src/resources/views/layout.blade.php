<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=500, user-scalable=no, shrink-to-fit=no" >
    <title>Spreadsheet App</title>
    @yield('styles')
</head>

<body>
    <header><a id="header" href="{{ route('home') }}">Spreadsheet App</a></header>
    <main>
        @yield('contents')
    </main>
    <footer>Copyright (C) 2024 - <script language="javascript">document.write(new Date().getFullYear())</script> Eita Tanaka All Rights Reserved.</footer>
    @yield('scripts')
</body>
</html>
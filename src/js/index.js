function checkIDPW(){
  // CSVファイルを取得
  let csv = new XMLHttpRequest();
  
  // CSVファイルへのパス
  csv.open("GET", "Csv/OogiyaList", false);
  
  // csvファイル読み込み失敗時のエラー対応
  try {
    // Shift_JISをUTF-8に変更
    csv.overrideMimeType('text/plain; charset=Shift_JIS');
    csv.send(null);
  } catch (err) {
    console.log(err);
  }
  
  // 配列を定義
  let KVS = {};
  
  // 改行ごとに配列化
  let lines = csv.responseText.split(/\r\n|\n/);
  
  // 1行ごとに処理
  for (let i = 0; i < lines.length; ++i) {
    let cells = lines[i].split(",");
    if (cells.length != 1) {
      KVS[cells[0]] = cells[1];
    }
  }

  let ID = document.getElementById("id");
  let PW = document.getElementById("pw");

  if( ID.value in KVS ){
    if( KVS[ID.value] == PW.value ){
      document.form.action = "./menu.html";
    }
    else{
      document.form.action = "./error.html";
    }
  }
  else{
    document.form.action = "./error.html";
  }
}

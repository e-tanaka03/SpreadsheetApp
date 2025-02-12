// CSVファイルを取得
let csv = new XMLHttpRequest();
 
// CSVファイルへのパス
csv.open("GET", "Csv/Menu_Oogiya.csv", false);
 
// csvファイル読み込み失敗時のエラー対応
try {
  // Shift_JISをUTF-8に変更
  csv.overrideMimeType('text/plain; charset=Shift_JIS');
  csv.send(null);
} catch (err) {
  console.log(err);
}
 
// 配列を定義
let csvArray = [];
 
// 改行ごとに配列化
let lines = csv.responseText.split(/\r\n|\n/);
 
// 1行ごとに処理
for (let i = 0; i < lines.length; ++i) {
  let cells = lines[i].split(",");
  if (cells.length != 1) {
    csvArray.push(cells);
  }
}

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

// 地区別稼動報告書と営業日報のtbodyを取得
const TK_tb = document.getElementById("TikuKudou_tbody");
const NP_tb = document.getElementById("Nippou_tbody");

for(let i = 1; i < csvArray.length; i++){
  // 地区別稼動報告書テーブル作成
  if( (csvArray[i][1] != "") || (csvArray[i][2] != "") ){
    const TKtr = document.createElement("tr");
    TK_tb.appendChild(TKtr);

    const name_TKtd = document.createElement("td");
    name_TKtd.textContent = csvArray[i][0];
    name_TKtd.setAttribute("class", "Name");
    TKtr.appendChild(name_TKtd);

    if( csvArray[i][1] != "" ){
      const today_TKtd = document.createElement("td");
      TKtr.appendChild(today_TKtd);

      const TKa = document.createElement("a");
      TKa.textContent = "本日";
      TKa.setAttribute("class", "button Today");
      TKa.href = "./" + csvArray[i][1];
      today_TKtd.appendChild(TKa);
    }
    if( csvArray[i][2] != "" ){
      const yesterday_TKtd = document.createElement("td");
      TKtr.appendChild(yesterday_TKtd);

      const TKa = document.createElement("a");
      TKa.textContent = "前日";
      TKa.setAttribute("class", "button Yesterday");
      TKa.href = "./" + csvArray[i][2];
      yesterday_TKtd.appendChild(TKa);
    }
  }

  // 営業日報テーブル作成
  if( (csvArray[i][3] != "") || (csvArray[i][4] != "") ){
    const NPtr = document.createElement("tr");
    NP_tb.appendChild(NPtr);

    const name_NPtd = document.createElement("td");
    name_NPtd.textContent = csvArray[i][0];
    name_NPtd.setAttribute("class", "Name");
    NPtr.appendChild(name_NPtd);

    if( csvArray[i][3] != "" ){
      const yesterday_NPtd = document.createElement("td");
      NPtr.appendChild(yesterday_NPtd);

      const NPa = document.createElement("a");
      NPa.textContent = "前日";
      NPa.setAttribute("class", "button Yesterday");
      if( csvArray[i][3] == "S_Nippou/S_NippouYYYYMD.html" ){
        NPa.href = "./S_Nippou/S_Nippou"+ yYear + yMonth + yDate +".html";
      }
      else{
        NPa.href = "./" + csvArray[i][3];
      }
      yesterday_NPtd.appendChild(NPa);
    }
    if( csvArray[i][4] != "" ){
      const TDB_NPtd = document.createElement("td");
      NPtr.appendChild(TDB_NPtd);

      const NPa = document.createElement("a");
      NPa.textContent = "前々日";
      NPa.setAttribute("class", "button TwoDayBefore");
      if( csvArray[i][4] == "S_Nippou/S_NippouYYYYMD.html" ){
        NPa.href = "./S_Nippou/S_Nippou"+ yYear2 + yMonth2 + yDate2 +".html";
      }
      else{
        NPa.href = "./" + csvArray[i][4];
      }
      TDB_NPtd.appendChild(NPa);
    }
  }
}
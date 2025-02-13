const backcoler = ['BackColor-White', 'BackColor-Blue'];                          // テーブルの背景色を交互にする用の配列
const TimeStamp = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];  // グラフとテーブルの時刻を記入する用
const TimeStamp2 = ["9<br>時", "10<br>時", "11<br>時", "12<br>時", "13<br>時", "14<br>時", "15<br>時", "16<br>時", "17<br>時", "18<br>時", "19<br>時", "20<br>時", "21<br>時", "22<br>時", "23<br>時", "24<br>時"];  // グラフとテーブルの時刻を記入する用
const TableBackColor = ["BackColor-Green", "BackColor-YellowGreen", "BackColor-DeepBlue", "BackColor-ClearBlue"];
const CommentArray = ["機種名", "台", "(補)<br>台売", "(補)<br>割数"];
const day = ['(日)','(月)','(火)','(水)','(木)','(金)','(土)'];                    // Date.getDayで取れる曜日をカッコつきで対応できる用の配列

function LoadCsvFile(FileName, csvArray){
  // CSVファイルを取得
  let csv = new XMLHttpRequest();
  
  // CSVファイルへのパス
  csv.open("GET", "Csv/" + FileName, false);
  
  // csvファイル読み込み失敗時のエラー対応
  try {
    // Shift_JISをUTF-8に変更
    csv.overrideMimeType('text/plain; charset=Shift_JIS');
    csv.send(null);
  } catch (err) {
    console.log(err);
  }
    
  // 改行ごとに配列化
  let lines = csv.responseText.split(/\r\n|\n/);
  
  // 1行ごとに処理
  for (let i = 0; i < lines.length; ++i) {
    let cells = lines[i].split(",");
    if (cells.length != 1) {
      csvArray.push(cells);
    }
  }
}

function InsertBRTag(InsertString){
  let InsertedString = "";

  for(let i = 0; i < InsertString.length; i++){
    if( i == InsertString.length - 1 ){
      InsertedString += InsertString[i];
    }
    else{
      InsertedString += InsertString[i] + "<br>";
    }
  }

  return InsertedString;
}

function getUrlQueries() {
  var queryStr = window.location.search.slice(1);  // 文頭?を除外
      queries = {};

  // クエリがない場合は空のオブジェクトを返す
  if (!queryStr) {
    return queries;
  }

  // クエリ文字列を & で分割して処理
  queryStr.split('&').forEach(function(queryStr) {
    // = で分割してkey,valueをオブジェクトに格納
    var queryArr = queryStr.split('=');
    queries[queryArr[0]] = queryArr[1];
  });

  return queries;
}


// URLより店舗番号のクエリを取得
const searchParams = getUrlQueries();

// 種別稼動の表を作成
let Syu_csvArray = [];
LoadCsvFile("S" + searchParams["ShopNum"] + "_SyuD1.csv", Syu_csvArray);

// 日付を解析
const date = new Date( Syu_csvArray[0][0] + " " + Syu_csvArray[0][1] );

// ヘッターの作成
const Syu_thead = document.getElementById("Syu_thead");

const h_tr = document.createElement("tr");
Syu_thead.appendChild(h_tr);
htd_date = document.createElement("td");
htd_date.setAttribute("colSpan", 2);
htd_date.setAttribute("id", "Date");
htd_date.textContent = (date.getMonth() + 1) + "月" + date.getDate() + "日" + day[date.getDay()];
h_tr.appendChild(htd_date);

htd_time = document.createElement("td");
htd_time.setAttribute("colSpan", 2);
htd_time.setAttribute("id", "Time");
if( date.getHours() != 0 ){
  htd_time.textContent = date.getHours() + "時" + date.getMinutes() + "分更新";
}
else{
  htd_time.textContent = "最終データ";
}
h_tr.appendChild(htd_time);

htd_title = document.createElement("td");
htd_title.setAttribute("colSpan", 14);
h_tr.appendChild(htd_title);

htd_unit = document.createElement("td");
htd_unit.setAttribute("colSpan", 3);
htd_unit.setAttribute("id", "Unit");
htd_unit.textContent = "売上単位：千円";
h_tr.appendChild(htd_unit);

// 種別の4行を持ってきて配列に入れる
const GreenRow        = document.getElementById("GreenRow");
const YellowGreenRow  = document.getElementById("YellowGreenRow");
const DeepBlueRow     = document.getElementById("DeepBlueRow");
const ClearBlueRow    = document.getElementById("ClearBlueRow");

let RowArray = [GreenRow, YellowGreenRow, DeepBlueRow, ClearBlueRow];
let RowNum = 0;

const ShopName1 = document.getElementById("shop_name1");
ShopName1.innerHTML = InsertBRTag(Syu_csvArray[0][2]);

let TotalData = []; //  合計行の台と(補)売上用の配列
let GraphData = []; //  合計行の時間ごとの街道合計、グラフ用のデータとして分けている
let SyuKVS    = {};

for( let i = 0; i < Syu_csvArray.length - 1; i++ ){
  SyuKVS[Syu_csvArray[i+1][0]] = i;
  
  for( let j = 1; j < 21; j++ ){
    tdj = 'td${j}';
    tdj = document.createElement("td");

    if( j == 1 ){
      tdj.setAttribute("class", TableBackColor[i] + " TextBold");
    }
    else if( j == 2 ){
      tdj.setAttribute("class", "dataText");
    }
    else if( j == 4 ){
      tdj.setAttribute("class", "TextRight BorderRight-thin dataText");
    }
    else if( j >= 3 ){
      tdj.setAttribute("class", "TextRight dataText");
    }

    if( (Syu_csvArray[i+1][j] != "") && (j < Syu_csvArray[i+1].length) ){
      if( j == 3 ){
        tdj.textContent = Math.round(Number(Syu_csvArray[i+1][j])).toLocaleString();
      }
      else if(j == 4 ){
        tdj.textContent = ((Math.round(Number(Syu_csvArray[i+1][j]) * 100)) / 100).toFixed(2);
      }
      else{
        tdj.textContent = Syu_csvArray[i+1][j];
      }

      if( (j == 2) || (j == 3) ){
        if( TotalData[j-2] == undefined ){
          TotalData[j-2] = Number(Syu_csvArray[i+1][j]);
        }
        else{
          TotalData[j-2] += Number(Syu_csvArray[i+1][j]);
        }
      }
      else if( j >= 5 ){
        if( GraphData[j-5] == undefined ){
          GraphData[j-5] = Number(Syu_csvArray[i+1][j]);
        }
        else{
          GraphData[j-5] += Number(Syu_csvArray[i+1][j]);
        }
      }
    }

    RowArray[i].appendChild(tdj);
  }
  RowNum++;
}

if( RowNum < 4 ){
  for( let i = RowNum; i < RowArray.length; i++ ){
    for( let j = 1; j < 21; j++ ){
      tdj = 'td${j}';
      tdj = document.createElement("td");
      if( j == 4 ){
        tdj.setAttribute("class", "BorderRight-thin");
      }
      RowArray[i].appendChild(tdj);
    }
  }
}

const Total = document.getElementById("Total");

for( i = 2; i < 21; i++ ){
  tdi = 'td${i}';
  tdi = document.createElement("td");

  if( i == 4 ){
    tdi.setAttribute("class", "TextRight BorderRight-thin dataText");
  }
  else if( i == 2 ){
    tdi.setAttribute("class", "dataText");
  }
  else if( i >= 3 ){
    tdi.setAttribute("class", "TextRight dataText");
  }

  if( (i == 2) || (i == 3) ){
    if( TotalData[i-2] != "" ){
      if( i == 2 ){
        tdi.textContent = TotalData[i-2];
      }
      else{
        tdi.textContent = Math.round(Number(TotalData[i-2])).toLocaleString();
      }
    }
  }
  // else if( i == 4 ){
  //   if( Syu_csvArray[0][4] != "" ){
  //     tdi.textContent = ((Math.round(Number(Syu_csvArray[0][4]) * 100)) / 100).toFixed(2);
  //   }
  // }
  else if( i >= 5 ){
    if( GraphData[i-5] != "" ){
      tdi.textContent = GraphData[i-5];
    }
  }

  Total.appendChild(tdi);
}

let barCtx = document.getElementById("BarChart");

let barConfig = {
  type: 'bar',
  data: {
    labels: TimeStamp,
    datasets: [{
      data: GraphData,
      backgroundColor: [
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
        '#c5c556',
      ],
      bordrWidth: 1,
    }]
  },
  options: {
    plugins: {
      legend: {
        display: false,
      }
    }
  },
};
let BarChart = new Chart(barCtx, barConfig);

let picture = document.getElementById("Picture");
picture.setAttribute("src", "Img/" + Syu_csvArray[0][3]);

const ShopName2 = document.getElementById("shop_name2");
ShopName2.textContent = Syu_csvArray[0][2];


// 機種稼働の表を作成
let Ki_csvArray = [];
LoadCsvFile("S" + searchParams["ShopNum"] + "_KiD1.csv", Ki_csvArray);

// 4つのテーブルをそれぞれ持ってくる
const GRtb = document.getElementById("Ki_Green_tbody");
const YGtb = document.getElementById("Ki_YellowGreen_tbody");
const DBtb = document.getElementById("Ki_DeepBlue_tbody");
const CBtb = document.getElementById("Ki_ClearBlue_tbody");

let TableArray = [GRtb, YGtb, DBtb, CBtb];

let TableNow = 0;   // 現在のテーブルの種類(PかP1かなど)を保存
let TableRow = 0;
let NameCol = {};  // 帯列を保存しておくオブジェクト

for(let i = 1; i < Ki_csvArray.length; i++){
  if( TableNow != SyuKVS[Ki_csvArray[i][0]] ){
    TableNow = SyuKVS[Ki_csvArray[i][0]];

    NameCol.setAttribute("rowSpan", TableRow + Math.ceil(TableRow /10));
    TableRow = 0
  }

  if( (TableRow % 10) == 0 ){
    tr_index = document.createElement("tr");
    tr_index.setAttribute("class", "BackColor-Purple");
    TableArray[TableNow].appendChild(tr_index);

    if( TableRow == 0 ){
      for( let j = 0; j < 21; j++ ){
        tdj = 'td${j}';
        tdj = document.createElement("td");
        if( j == 0 ){
          tdj.setAttribute("class", TableBackColor[TableNow]);
          tdj.innerHTML = InsertBRTag(Syu_csvArray[TableNow + 1][1]);
          NameCol = tdj;
        }
        else if( j <= 4 ){
          if( j == 4 ){
            tdj.setAttribute("class", "BorderRight-thin");
          }
          tdj.innerHTML = CommentArray[j-1];
        }
        else{
          tdj.innerHTML = TimeStamp2[j-5];
        }

        tr_index.appendChild(tdj);
      }
    }
    else{
      for( let j = 1; j < 21; j++ ){
        tdj = 'td${j}';
        tdj = document.createElement("td");
        if( j <= 4 ){
          if( j == 4 ){
            tdj.setAttribute("class", "BorderRight-thin");
          }
          tdj.innerHTML = CommentArray[j-1];
        }
        else{
          tdj.innerHTML = TimeStamp2[j-5];
        }

        tr_index.appendChild(tdj);
      }
    }
  }

  tri = document.createElement("tr");
  tri.setAttribute("class", backcoler[TableRow % 2]);
  TableArray[TableNow].appendChild(tri);

  for( let j = 1; j < 21; j++ ){
    tdj = 'td${j}';
    tdj = document.createElement("td");
    
    // クラス付与
    if( j == 1 ){
      tdj.setAttribute("class", "TextKisyu TextLeft");
    }
    else if( j == 2 ){
      tdj.setAttribute("class", "dataText");
    }
    else if( j == 3 ){
      tdj.setAttribute("class", "TextRight dataText");
    }
    else if( j == 4 ){
      tdj.setAttribute("class", "TextRight BorderRight-thin dataText");
    }
    else{
      tdj.setAttribute("class", "dataText");
    }
    
    // 記入
    if( Ki_csvArray[i][j] != "" ){
      if( j == 3 ){
        tdj.textContent = Number(Ki_csvArray[i][j]).toFixed(1);
      }
      else if( j == 4 ){
        tdj.textContent = Number(Ki_csvArray[i][j]).toFixed(2);
      }
      else{
        tdj.textContent = Ki_csvArray[i][j];
      }
    }

    tri.appendChild(tdj);
  }

  TableRow++;
}

// 最後のテーブルのNameColのrowspanを入れる
NameCol.setAttribute("rowSpan", TableRow + Math.ceil(TableRow /10));
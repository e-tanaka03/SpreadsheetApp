const eigyobu_num = [0, 0, 0, 0, 0];                                              // 営業部ごとの店舗数の数の配列(2024/01/26現在：統括直轄、第一～第四営業部まで対応)
const eigyobu_name = ['統<br>括<br>直<br>轄'      ,
                      '第<br>一<br>営<br>業<br>部', '第<br>二<br>営<br>業<br>部', 
                      '第<br>三<br>営<br>業<br>部', '第<br>四<br>営<br>業<br>部'];  // 営業部の名前(2024/01/26現在：統括直轄、第一～第四営業部まで対応)
const day = ['(日)','(月)','(火)','(水)','(木)','(金)','(土)'];                    // Date.getDayで取れる曜日をカッコつきで対応できる用の配列
const backcoler = ['BackColor-White', 'BackColor-Blue'];                          // テーブルの背景色を交互にするようの配列
const eigyobu_cycle = 100;                                                        // 営業部の割り当て周期の数値
const outInfo_width = "78";                                                       // アウト情報の1セルごとのサイズ


// CSVファイルを取得
let csv = new XMLHttpRequest();
let csv_sum = new XMLHttpRequest();
 
// CSVファイルへのパス
csv.open("GET", "Csv/SyukeiD0.csv", false);

// csvファイル読み込み失敗時のエラー対応
try {
  // Shift_JISをUTF-8に変更
  csv.overrideMimeType('text/plain; charset=Shift_JIS');
  csv.send(null);
} catch (err) {
  console.log(err);
}

csv_sum.open("GET", "Csv/SyukeiD0a.csv", false);
 
try {
  // Shift_JISをUTF-8に変更
  csv_sum.overrideMimeType('text/plain; charset=Shift_JIS');
  csv_sum.send(null);
} catch (err) {
  console.log(err);
}
 
// 配列を定義
let csvArray = [];
let csvSumArray = [];

 
// 改行ごとに配列化
let lines = csv.responseText.split(/\r\n|\n/);

// 1行ごとに処理
for (let i = 0; i < lines.length; ++i) {
  let cells = lines[i].split(",");
  if (cells.length != 1) {
    csvArray.push(cells);
  }
}

lines = csv_sum.responseText.split(/\r\n|\n/);

for (let i = 0; i < lines.length; ++i) {
  let cells = lines[i].split(",");
  if (cells.length != 1) {
    csvSumArray.push(cells);
  }
}
 
// テーブルのヘッド、ボディ、フットを取得
const th = document.getElementById("thead");
const tb = document.getElementById("tbody");
const tf = document.getElementById("tfoot");

// 統括直轄、第一～第四営業部の店舗数を数える
let daiNeigyo = 0;

for( let i = 0; i < eigyobu_num.length; i++ ){
  for( let j = 1; j < csvArray.length; j++){
    if( ((eigyobu_cycle * i) < csvArray[j][1]) && (csvArray[j][1] < (eigyobu_cycle * i + eigyobu_cycle)) ){
      daiNeigyo++;
    }
  }

  // 営業部ごとの店舗数を配列に格納
  eigyobu_num[i] = daiNeigyo;
  daiNeigyo = 0;
}

// 日付を解析
const date = new Date( csvArray[0][0] + " " + csvArray[0][1] );

// ヘッターを作成
let num_outInfo = 0;  // アウト情報の個数
let i = 2;
while( (csvArray[0][i] != "") && (csvArray[0].length > i) ){
  num_outInfo++;
  i++;
}

const th_outInfo = document.getElementById("th_outInfo");
const tr_outInfo = document.getElementById("tr_outInfo");
const th_operate = document.getElementById("th_operate");
const colgroup   = document.getElementById("colgroup");

th_outInfo.setAttribute("colSpan", num_outInfo);

// colgroupの追加
for(let i = 0; i < num_outInfo; i++){
  coli = 'col${i}';
  coli = document.createElement("col");
  coli.setAttribute("width", outInfo_width);
  colgroup.appendChild(coli);
}

for(let i = 2; i < 2 + num_outInfo; i++){
  tdi = 'td${i}';
  tdi = document.createElement("td");
  if( i == (2 + num_outInfo - 1) ){
    tdi.setAttribute("class", "BorderRight");
  }
  tdi.textContent = csvArray[0][i];
  tr_outInfo.appendChild(tdi);
}

const h_tr = document.createElement("tr");
th.appendChild(h_tr);
htd_date = document.createElement("td");
htd_date.setAttribute("colSpan", 2);
htd_date.setAttribute("id", "Date");
htd_date.textContent = (date.getMonth() + 1) + "月" + date.getDate() + "日" + day[date.getDay()];
h_tr.appendChild(htd_date);

htd_time = document.createElement("td");
htd_time.setAttribute("id", "Time");
if( date.getHours() != 0 ){
  htd_time.textContent = date.getHours() + "時" + date.getMinutes() + "分更新";
}
else{
  htd_time.textContent = "最終データ";
}
h_tr.appendChild(htd_time);

htd_title = document.createElement("td");
htd_title.setAttribute("colSpan", 5);
htd_title.setAttribute("id", "Title");
if( date.getHours() != 0 ){
  htd_title.textContent = "全店舗集計（本日）";
}
else{
  htd_title.textContent = "全店舗集計（" + (date.getMonth() + 1) + "/" + date.getDate() + "）";
}
h_tr.appendChild(htd_title);

htd_unit = document.createElement("td");
htd_unit.setAttribute("colSpan", num_outInfo-1);
htd_unit.setAttribute("id", "Unit");
htd_unit.textContent = "売粗単位：千円";
h_tr.appendChild(htd_unit);

if( date.getHours() != 0 ){
  th_operate.textContent = "定時稼動（" + date.getHours() + "時）"
}
else{
  th_operate.textContent = "積稼動情報"
}

// テーブルの作成
{
  let shop_name = 1;  // 各営業部の先頭の店舗名のインデックス用

  // 各営業部のテーブルの記入
  for( let eigyobu = 0; eigyobu < eigyobu_num.length; eigyobu++ ){
    if( eigyobu_num[eigyobu] > 0 ){
      daiNeigyo++;
      if( eigyobu > 0 ){
        shop_name += eigyobu_num[eigyobu-1];
      }

      for( let i = shop_name; i < shop_name + eigyobu_num[eigyobu] + 1; i++ ){
        const b_tr = document.createElement("tr");
        if( i == shop_name + eigyobu_num[eigyobu] ){
          b_tr.setAttribute("class", "BorderTop-Bottom SubTotal");
        }
        else{
          b_tr.setAttribute("class", backcoler[(i - shop_name) % 2]);
        }
        tb.appendChild(b_tr);

        if( i == shop_name ){
          td_eigyo = document.createElement("td");
          td_eigyo.setAttribute("rowSpan", eigyobu_num[eigyobu]+1);
          td_eigyo.setAttribute("class", "BackColor-White BorderLeft");
          td_eigyo.innerHTML = eigyobu_name[eigyobu];
          b_tr.appendChild(td_eigyo);
        }
        
        if( i < shop_name + eigyobu_num[eigyobu] ){
          for( let j = 0; j < csvArray[i].length; j++ ){
            if( j == 1 ){
              continue;
            }
            tdj = 'td${j}';
            tdj = document.createElement("td");

            if( j == 0 || csvArray[i][j] == "" || j > 6 ){
              if( j == csvArray[i].length - 1 ){
                tdj.setAttribute("class", "BorderRight TextRight");
                tdj.textContent = csvArray[i][j];
              }
              else if( j == 0 ){
                if( csvArray[i][2] != "" ){
                  const a = document.createElement("a");
                  a.textContent = csvArray[i][j];
                  a.href = "https://paradiso-ssl.xsrv.jp/WebData/ShopkD0.html?ShopNum=" + csvArray[i][1];
                  tdj.appendChild(a);
                }
                else{
                  tdj.textContent = csvArray[i][j];
                }
              }
              else{
                tdj.setAttribute("class", "TextRight");
                tdj.textContent = csvArray[i][j];
              }
            }
            else{
              if( j == 2 || j == 3 ){
                tdj.setAttribute("class", "TextRight TextBold");
              }
              else{
                tdj.setAttribute("class", "TextRight");
              }
              tdj.textContent = Math.round(Number(csvArray[i][j])).toLocaleString();
            }
            b_tr.appendChild(tdj);
          }
        }
        else{
          td_syokei = document.createElement("td");
          td_syokei.textContent = "小　計";
          b_tr.appendChild(td_syokei);

          for(let j = 2; j <= 6; j++){
            let syokei = 0;
            for(let k = shop_name; k < shop_name + eigyobu_num[eigyobu]; k++){
              syokei += Number(csvArray[k][j]);
            }

            tdj = 'td${j}';
            tdj = document.createElement("td");
            if( j == 2 || j == 3 ){
              tdj.setAttribute("class", "TextRight TextBold");
            }
            else{
              tdj.setAttribute("class", "TextRight");
            }
            // tdj.textContent = Math.round(syokei).toLocaleString(); → csvで小計をとるように変更
            tdj.textContent = Math.round(Number(csvSumArray[daiNeigyo][j])).toLocaleString();
            b_tr.appendChild(tdj);
          }

          for(let j = 7; j < csvArray[1].length; j++){
            let syokei = 0;
            let average = 0;

            for(let k = shop_name; k < shop_name + eigyobu_num[eigyobu]; k++){
              if( Number(csvArray[k][j]) > 0 ){
                average++;
                syokei += Number(csvArray[k][j]);
              }
            }

            if( average > 0 ){
              syokei /= average;
            }
            tdj = 'td${j}';
            tdj = document.createElement("td");
            if( j == csvArray[1].length - 1 ){
              tdj.setAttribute("class", "BorderRight TextRight");
            }
            else{
              tdj.setAttribute("class", "TextRight");
            }
            // if( syokei != 0 ) tdj.textContent = Math.trunc(syokei); → csvで小計をとるように変更
            if( csvSumArray[daiNeigyo][j] != 0 ) tdj.textContent = Math.trunc(Number(csvSumArray[daiNeigyo][j]));
            b_tr.appendChild(tdj);
          }
        }
      }
    }
  }

  // 合計の作成
  const tr = document.createElement("tr");
  tr.setAttribute("class", "Total");
  tf.appendChild(tr);

  td_sum = document.createElement("td");
  td_sum.setAttribute("colSpan", 2);
  td_sum.setAttribute("class", "BorderLeft");
  td_sum.textContent = "合　計";
  tr.appendChild(td_sum);

  for(let j = 2; j <= 6; j++){
    let sum = 0;
    for(let k = 1; k < csvArray.length; k++){
      sum += Number(csvArray[k][j]);
    }

    tdj = 'td${j}';
    tdj = document.createElement("td");
    if( j == 2 || j == 3 ){
      tdj.setAttribute("class", "TextRight TextBold");
    }
    else{
      tdj.setAttribute("class", "TextRight");
    }
    // tdj.textContent = Math.round(sum).toLocaleString(); → csvで合計をとるように変更
    tdj.textContent = Math.round(Number(csvSumArray[daiNeigyo + 1][j])).toLocaleString();
    tr.appendChild(tdj);
  }

  for(let j = 7; j < csvArray[1].length; j++){
    let sum = 0;
    let average = 0;

    for(let k = 1; k < csvArray.length; k++){
      if( Number(csvArray[k][j]) > 0 ){
        average++;
        sum += Number(csvArray[k][j]);
      }
    }

    if( average > 0 ){
      sum /= average;
    }
    tdj = 'td${j}';
    tdj = document.createElement("td");
    if( j == csvArray[1].length - 1 ){
      tdj.setAttribute("class", "BorderRight TextRight");
    }
    else{
      tdj.setAttribute("class", "TextRight");
    }
    // if( sum != 0 ) tdj.textContent = Math.trunc(sum); → csvで合計をとるように変更
    if( csvSumArray[daiNeigyo + 1][j] != 0 ) tdj.textContent = Math.trunc(Number(csvSumArray[daiNeigyo + 1][j]));
    tr.appendChild(tdj);
  }
}


// 20240603追加 二日町店を別テーブルに表示する
let hutukamachi = 1;
const sub_colgroup   = document.getElementById("sub_colgroup");

// colgroupの追加
for(let i = 0; i < num_outInfo; i++){
  coli = 'col${i}';
  coli = document.createElement("col");
  coli.setAttribute("width", outInfo_width);
  sub_colgroup.appendChild(coli);
}

// 二日町店が何行目かを保存
for(let i = 0; 0 < eigyobu_num.length; i++){
  if( eigyobu_num[i] != 0 ){
    hutukamachi += eigyobu_num[i];
    continue;
  }
  else{
    break;
  }
}

if( typeof csvArray[hutukamachi] === "undefined" ){
  throw new Error("二日町店が存在しなかったため別テーブルを作成せず終了");
}

// サブテーブルのヘッド、ボディ、フットを取得
const sub_th = document.getElementById("sub_thead");
const sub_tb = document.getElementById("sub_tbody");
const sub_tf = document.getElementById("sub_tfoot");

// サブテーブルの作成
if( csvArray[hutukamachi][1] > 900 ){
  const b_tr = document.createElement("tr");
  b_tr.setAttribute("class", backcoler[0] + " BorderTop");
  sub_tb.appendChild(b_tr);

  td_eigyo = document.createElement("td");
  td_eigyo.setAttribute("class", "BackColor-White BorderLeft");
  b_tr.appendChild(td_eigyo);

  for( let j = 0; j < csvArray[hutukamachi].length; j++ ){
    if( j == 1 ){
      continue;
    }
    tdj = 'td${j}';
    tdj = document.createElement("td");

    if( j == 0 || csvArray[hutukamachi][j] == "" || j > 6 ){
      if( j == csvArray[hutukamachi].length - 1 ){
        tdj.setAttribute("class", "BorderRight TextRight");
        tdj.textContent = csvArray[hutukamachi][j];
      }
      else if( j == 0 ){
        if( csvArray[hutukamachi][2] != "" ){
          const a = document.createElement("a");
          a.textContent = csvArray[hutukamachi][j];
          a.href = "https://paradiso-ssl.xsrv.jp/WebData/ShopkD0.html?ShopNum=" + csvArray[hutukamachi][1];
          tdj.appendChild(a);
        }
        else{
          tdj.textContent = csvArray[hutukamachi][j];
        }
      }
      else{
        tdj.setAttribute("class", "TextRight");
        tdj.textContent = csvArray[hutukamachi][j];
      }
    }
    else{
      if( j == 2 || j == 3 ){
        tdj.setAttribute("class", "TextRight TextBold");
      }
      else{
        tdj.setAttribute("class", "TextRight");
      }
      tdj.textContent = Math.round(Number(csvArray[hutukamachi][j])).toLocaleString();
    }
    b_tr.appendChild(tdj);
  }

  // 総合計の作成
  const tr = document.createElement("tr");
  tr.setAttribute("class", "Total BorderTop");
  sub_tf.appendChild(tr);

  td_sum = document.createElement("td");
  td_sum.setAttribute("colSpan", 2);
  td_sum.setAttribute("class", "BorderLeft TextBold");
  td_sum.textContent = "総　合　計";
  tr.appendChild(td_sum);

  for(let j = 2; j <= 6; j++){
    let sum = 0;
    for(let k = 1; k < csvArray.length; k++){
      sum += Number(csvArray[k][j]);
    }

    tdj = 'td${j}';
    tdj = document.createElement("td");
    if( j == 2 || j == 3 ){
      tdj.setAttribute("class", "TextRight TextBold");
    }
    else{
      tdj.setAttribute("class", "TextRight");
    }
    tdj.textContent = Math.round(Number(csvSumArray[daiNeigyo + 2][j])).toLocaleString();
    tr.appendChild(tdj);
  }

  for(let j = 7; j < csvArray[1].length; j++){
    let sum = 0;
    let average = 0;

    for(let k = 1; k < csvArray.length; k++){
      if( Number(csvArray[k][j]) > 0 ){
        average++;
        sum += Number(csvArray[k][j]);
      }
    }

    if( average > 0 ){
      sum /= average;
    }
    tdj = 'td${j}';
    tdj = document.createElement("td");
    if( j == csvArray[1].length - 1 ){
      tdj.setAttribute("class", "BorderRight TextRight");
    }
    else{
      tdj.setAttribute("class", "TextRight");
    }
    if( csvSumArray[daiNeigyo + 2][j] != 0 ) tdj.textContent = Math.trunc(Number(csvSumArray[daiNeigyo + 2][j]));
    tr.appendChild(tdj);
  }
}
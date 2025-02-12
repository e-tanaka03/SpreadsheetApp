const eigyobu_num = [0, 0, 0, 0, 0];                                              // 営業部ごとの店舗数の数の配列(2024/01/26現在：統括直轄、第一～第四営業部まで対応)
const eigyobu_name = ['統<br>括<br>直<br>轄'      ,
                      '第<br>一<br>営<br>業<br>部', '第<br>二<br>営<br>業<br>部', 
                      '第<br>三<br>営<br>業<br>部', '第<br>四<br>営<br>業<br>部'];  // 営業部の名前(2024/01/26現在：統括直轄、第一～第四営業部まで対応)
const backcoler = ['BackColor-White', 'BackColor-Blue'];                          // テーブルの背景色を交互にするようの配列
const eigyobu_cycle = 100;                                                        // 営業部の割り当て周期の数値


// CSVファイルを取得
let csv = new XMLHttpRequest();
 
// CSVファイルへのパス
csv.open("GET", "Csv/Hyou_106.csv", false);
 
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

// タイトルを表示
const title = document.getElementById("Title");
title.textContent = csvArray[0][0];

const period = document.getElementById("Period");
period.textContent = csvArray[0][1];

const date = document.getElementById("Date");
date.textContent = csvArray[0][3];

let shop_name = 1;  // 各営業部の先頭の店舗名のインデックス用
let elementTotal = [0, 0, 0, 0, 0, 0];  //  合計計算時用の各要素の足した配列
let elementAllTotal = [0, 0, 0, 0, 0, 0];  //  20240603追加:総合計計算時用の各要素の足した配列

// 各営業部のテーブルの記入
{
  for( let eigyobu = 0; eigyobu < eigyobu_num.length; eigyobu++ ){
    if( eigyobu_num[eigyobu] > 0 ){
      if( eigyobu > 0 ){
        shop_name += eigyobu_num[eigyobu-1];
      }

      let elementSubTotal = [0, 0, 0, 0, 0, 0]; //  小計計算時用の各要素の足した配列

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
          td_eigyo.setAttribute("class", "BackColor-Green BorderLeft");
          td_eigyo.innerHTML = eigyobu_name[eigyobu];
          b_tr.appendChild(td_eigyo);
        }
        
        let act_sales = 0.0;
        let act_GrossProfit = 0.0;

        if( i < shop_name + eigyobu_num[eigyobu] ){
          for( let j = 0; j < elementTotal.length; j++ ){
            elementTotal[j]    += Number(csvArray[i][j + 2]);
            elementAllTotal[j] += Number(csvArray[i][j + 2]);
            elementSubTotal[j] += Number(csvArray[i][j + 2]);
          }

          for( let j = 0; j < 12; j++ ){
            tdj = 'td${j}';
            tdj = document.createElement("td");
            if( j != 0 ){
              tdj.setAttribute("class", "TextRight");
            }
            
            // 店名
            if( j == 0 ){
              tdj.textContent = csvArray[i][0];
            }
            // 客粗利
            else if( j == 1 ){
              tdj.textContent = Math.round(Number(csvArray[i][3]) / Number(csvArray[i][4])).toLocaleString();
              tdj.setAttribute("class", "TextRight BorderRight-thin");
            }
            // 目標売上
            else if( j == 2 ){
              tdj.textContent = Math.round(Number(csvArray[i][6])).toLocaleString();
            }
            // 実績売上
            else if( j == 3 ){
              act_sales = Number(csvArray[i][2]) / Number(csvArray[i][5]);
              tdj.textContent = Math.round(act_sales).toLocaleString();
            }
            // 達成率
            else if( j == 4 ){
              let achievement_rate = (act_sales) / Number(csvArray[i][6]) * 1000;
              tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
            }
            // 平均差異
            else if( j == 5 ){
              tdj.textContent = Math.round(act_sales - Number(csvArray[i][6])).toLocaleString();
              if( act_sales - Number(csvArray[i][6]) < 0 ){
                tdj.setAttribute("class", "TextRight TextColor-Red");
              }
            }
            // 累計差異
            else if( j == 6 ){
              tdj.textContent = Math.round((act_sales - Number(csvArray[i][6])) * csvArray[i][5]).toLocaleString();
              if( act_sales - Number(csvArray[i][6]) < 0 ){
                tdj.setAttribute("class", "TextRight TextColor-Red BorderRight-thin");
              }
              else{
                tdj.setAttribute("class", "TextRight BorderRight-thin");
              }
            }
            // 目標粗利
            else if( j == 7 ){
              tdj.textContent = Math.round(Number(csvArray[i][7])).toLocaleString();
            }
            // 実績粗利
            else if( j == 8 ){
              act_GrossProfit = Number(csvArray[i][3]) / Number(csvArray[i][5]);
              tdj.textContent = Math.round(act_GrossProfit).toLocaleString();
            }
            // 達成率
            else if( j == 9 ){
              let achievement_rate = (act_GrossProfit) / Number(csvArray[i][7]) * 1000;
              tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
            }
            // 平均差異
            else if( j == 10 ){
              tdj.textContent = Math.round(act_GrossProfit - Number(csvArray[i][7])).toLocaleString();
              if( act_GrossProfit - Number(csvArray[i][7]) < 0 ){
                tdj.setAttribute("class", "TextRight TextColor-Red");
              }
            }
            // 累計差異
            else if( j == 11 ){
              tdj.textContent = Math.round((act_GrossProfit - Number(csvArray[i][7])) * csvArray[i][5]).toLocaleString();
              if( act_GrossProfit - Number(csvArray[i][7]) < 0 ){
                tdj.setAttribute("class", "TextRight TextColor-Red BorderRight");
              }
              else{
                tdj.setAttribute("class", "TextRight BorderRight");
              }
            }
            b_tr.appendChild(tdj);
          }
        }
        else{
          td_syokei = document.createElement("td");
          td_syokei.textContent = "小　計";
          b_tr.appendChild(td_syokei);

          for(let j = 1; j < 12; j++){
            tdj = 'td${j}';
            tdj = document.createElement("td");
            tdj.setAttribute("class", "TextRight");
            
            // 客粗利
            if( j == 1 ){
              tdj.textContent = Math.round(Number(elementSubTotal[1]) / Number(elementSubTotal[2])).toLocaleString();
              tdj.setAttribute("class", "TextRight BorderRight-thin");
            }
            // 目標売上
            else if( j == 2 ){
              tdj.textContent = Math.round(Number(elementSubTotal[4])).toLocaleString();
            }
            // 実績売上
            else if( j == 3 ){
              act_sales = Number(elementSubTotal[0]) / (Number(elementSubTotal[3]) / eigyobu_num[eigyobu]);
              tdj.textContent = Math.round(act_sales).toLocaleString();
            }
            // 達成率
            else if( j == 4 ){
              let achievement_rate = (act_sales) / Number(elementSubTotal[4]) * 1000;
              tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
            }
            // 平均差異
            else if( j == 5 ){
              tdj.textContent = Math.round(act_sales - Number(elementSubTotal[4])).toLocaleString();
              if( act_sales - Number(elementSubTotal[4]) < 0 ){
                tdj.setAttribute("class", "TextRight TextColor-Red");
              }
            }
            // 累計差異
            else if( j == 6 ){
              tdj.textContent = Math.round((act_sales - Number(elementSubTotal[4])) * (Number(elementSubTotal[3]) / eigyobu_num[eigyobu])).toLocaleString();
              if( act_sales - Number(elementSubTotal[4]) < 0 ){
                tdj.setAttribute("class", "TextRight TextColor-Red BorderRight-thin");
              }
              else{
                tdj.setAttribute("class", "TextRight BorderRight-thin");
              }
            }
            // 目標粗利
            else if( j == 7 ){
              tdj.textContent = Math.round(Number(elementSubTotal[5])).toLocaleString();
            }
            // 実績粗利
            else if( j == 8 ){
              act_GrossProfit = Number(elementSubTotal[1]) / (Number(elementSubTotal[3]) / eigyobu_num[eigyobu]);
              tdj.textContent = Math.round(act_GrossProfit).toLocaleString();
            }
            // 達成率
            else if( j == 9 ){
              let achievement_rate = (act_GrossProfit) / Number(elementSubTotal[5]) * 1000;
              tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
            }
            // 平均差異
            else if( j == 10 ){
              tdj.textContent = Math.round(act_GrossProfit - Number(elementSubTotal[5])).toLocaleString();
              if( act_GrossProfit - Number(elementSubTotal[5]) < 0 ){
                tdj.setAttribute("class", "TextRight TextColor-Red");
              }
            }
            // 累計差異
            else if( j == 11 ){
              tdj.textContent = Math.round((act_GrossProfit - Number(elementSubTotal[5])) * (Number(elementSubTotal[3]) / eigyobu_num[eigyobu])).toLocaleString();
              if( act_GrossProfit - Number(elementSubTotal[5]) < 0 ){
                tdj.setAttribute("class", "TextRight TextColor-Red BorderRight");
              }
              else{
                tdj.setAttribute("class", "TextRight BorderRight");
              }
            }
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

  let act_sales = 0.0;
  let act_GrossProfit = 0.0;

  for(let j = 1; j < 12; j++){
    tdj = 'td${j}';
    tdj = document.createElement("td");
    tdj.setAttribute("class", "TextRight");
            
    // 客粗利
    if( j == 1 ){
      tdj.textContent = Math.round(Number(elementTotal[1]) / Number(elementTotal[2])).toLocaleString();
      tdj.setAttribute("class", "TextRight BorderRight-thin");
    }
    // 目標売上
    else if( j == 2 ){
      tdj.textContent = Math.round(Number(elementTotal[4])).toLocaleString();
    }
    // 実績売上
    else if( j == 3 ){
      act_sales = Number(elementTotal[0] / (Number(elementTotal[3]) / (eigyobu_num[0] + eigyobu_num[1] + eigyobu_num[2] + eigyobu_num[3] + eigyobu_num[4])));
      tdj.textContent = Math.round(act_sales).toLocaleString();
    }
    // 達成率
    else if( j == 4 ){
      let achievement_rate = (act_sales / elementTotal[4]) * 1000;
      tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
    }
    // 平均差異
    else if( j == 5 ){
      tdj.textContent = Math.round(act_sales - Number(elementTotal[4])).toLocaleString();
      if( act_sales - Number(elementTotal[4]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red");
      }
    }
    // 累計差異
    else if( j == 6 ){
      tdj.textContent = Math.round((act_sales - Number(elementTotal[4])) * (Number(elementTotal[3]) / (eigyobu_num[0] + eigyobu_num[1] + eigyobu_num[2] + eigyobu_num[3] + eigyobu_num[4]))).toLocaleString();
      if( act_sales - Number(elementTotal[4]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red BorderRight-thin");
      }
      else{
        tdj.setAttribute("class", "TextRight BorderRight-thin");
      }
    }
    // 目標粗利
    else if( j == 7 ){
      tdj.textContent = Math.round(Number(elementTotal[5])).toLocaleString();
    }
    // 実績粗利
    else if( j == 8 ){
      act_GrossProfit = Number(elementTotal[1]) / (Number(elementTotal[3]) / (eigyobu_num[0] + eigyobu_num[1] + eigyobu_num[2] + eigyobu_num[3] + eigyobu_num[4]));
      tdj.textContent = Math.round(act_GrossProfit).toLocaleString();
    }
    // 達成率
    else if( j == 9 ){
      let achievement_rate = (act_GrossProfit) / Number(elementTotal[5]) * 1000;
      tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
    }
    // 平均差異
    else if( j == 10 ){
      tdj.textContent = Math.round(act_GrossProfit - Number(elementTotal[5])).toLocaleString();
      if( act_GrossProfit - Number(elementTotal[5]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red");
      }
    }
    // 累計差異
    else if( j == 11 ){
      tdj.textContent = Math.round((act_GrossProfit - Number(elementTotal[5])) * (Number(elementTotal[3]) / (eigyobu_num[0] + eigyobu_num[1] + eigyobu_num[2] + eigyobu_num[3] + eigyobu_num[4]))).toLocaleString();
      if( act_GrossProfit - Number(elementTotal[5]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red BorderRight");
      }
      else{
        tdj.setAttribute("class", "TextRight BorderRight");
      }
    }
    tr.appendChild(tdj);
  }
}


// 20240603追加 二日町店を別テーブルに表示する
let hutukamachi = 1;

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
  const tr_note1 = document.createElement("tr");
  tf.appendChild(tr_note1);

  td_note = document.createElement("td");
  td_note.setAttribute("colSpan", 13);
  td_note.setAttribute("id", "Note");
  td_note.setAttribute("class", "TextColor-Red");
  td_note.textContent = "※この期間売上はホールコンデータを元に作成されていますのでホールコンとの通信状況により誤差が生じる可能性があります。";
  tr_note1.appendChild(td_note);

  const tr_note2 = document.createElement("tr");
  tf.appendChild(tr_note2);

  td_note = document.createElement("td");
  td_note.setAttribute("colSpan", 13);
  td_note.setAttribute("id", "Note");
  td_note.setAttribute("class", "TextColor-Blue");
  td_note.textContent = "※実績粗利・・・粗利指標を使ってますので決算書の粗利とは誤差が生じております。";
  tr_note2.appendChild(td_note);

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
  td_eigyo.setAttribute("class", "BackColor-Green BorderLeft");
  b_tr.appendChild(td_eigyo);

  let act_sales = 0.0;
  let act_GrossProfit = 0.0;

  for( let j = 0; j < elementAllTotal.length; j++ ){
    elementAllTotal[j] += Number(csvArray[hutukamachi][j + 2]);
  }

  for( let j = 0; j < 12; j++ ){
    tdj = 'td${j}';
    tdj = document.createElement("td");
    if( j != 0 ){
      tdj.setAttribute("class", "TextRight");
    }
    
    // 店名
    if( j == 0 ){
      tdj.textContent = csvArray[hutukamachi][0];
    }
    // 客粗利
    else if( j == 1 ){
      tdj.textContent = Math.round(Number(csvArray[hutukamachi][3]) / Number(csvArray[hutukamachi][4])).toLocaleString();
      tdj.setAttribute("class", "TextRight BorderRight-thin");
    }
    // 目標売上
    else if( j == 2 ){
      tdj.textContent = Math.round(Number(csvArray[hutukamachi][6])).toLocaleString();
    }
    // 実績売上
    else if( j == 3 ){
      act_sales = Number(csvArray[hutukamachi][2]) / Number(csvArray[hutukamachi][5]);
      tdj.textContent = Math.round(act_sales).toLocaleString();
    }
    // 達成率
    else if( j == 4 ){
      let achievement_rate = (act_sales) / Number(csvArray[hutukamachi][6]) * 1000;
      tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
    }
    // 平均差異
    else if( j == 5 ){
      tdj.textContent = Math.round(act_sales - Number(csvArray[hutukamachi][6])).toLocaleString();
      if( act_sales - Number(csvArray[hutukamachi][6]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red");
      }
    }
    // 累計差異
    else if( j == 6 ){
      tdj.textContent = Math.round((act_sales - Number(csvArray[hutukamachi][6])) * csvArray[hutukamachi][5]).toLocaleString();
      if( act_sales - Number(csvArray[hutukamachi][6]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red BorderRight-thin");
      }
      else{
        tdj.setAttribute("class", "TextRight BorderRight-thin");
      }
    }
    // 目標粗利
    else if( j == 7 ){
      tdj.textContent = Math.round(Number(csvArray[hutukamachi][7])).toLocaleString();
    }
    // 実績粗利
    else if( j == 8 ){
      act_GrossProfit = Number(csvArray[hutukamachi][3]) / Number(csvArray[hutukamachi][5]);
      tdj.textContent = Math.round(act_GrossProfit).toLocaleString();
    }
    // 達成率
    else if( j == 9 ){
      let achievement_rate = (act_GrossProfit) / Number(csvArray[hutukamachi][7]) * 1000;
      tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
    }
    // 平均差異
    else if( j == 10 ){
      tdj.textContent = Math.round(act_GrossProfit - Number(csvArray[hutukamachi][7])).toLocaleString();
      if( act_GrossProfit - Number(csvArray[hutukamachi][7]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red");
      }
    }
    // 累計差異
    else if( j == 11 ){
      tdj.textContent = Math.round((act_GrossProfit - Number(csvArray[hutukamachi][7])) * csvArray[hutukamachi][5]).toLocaleString();
      if( act_GrossProfit - Number(csvArray[hutukamachi][7]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red BorderRight");
      }
      else{
        tdj.setAttribute("class", "TextRight BorderRight");
      }
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

  act_sales = 0.0;
  act_GrossProfit = 0.0;

  for(let j = 1; j < 12; j++){
    tdj = 'td${j}';
    tdj = document.createElement("td");
    tdj.setAttribute("class", "TextRight");
            
    // 客粗利
    if( j == 1 ){
      tdj.textContent = Math.round(Number(elementAllTotal[1]) / Number(elementAllTotal[2])).toLocaleString();
      tdj.setAttribute("class", "TextRight BorderRight-thin");
    }
    // 目標売上
    else if( j == 2 ){
      tdj.textContent = Math.round(Number(elementAllTotal[4])).toLocaleString();
    }
    // 実績売上
    else if( j == 3 ){
      act_sales = Number(elementAllTotal[0] / (Number(elementAllTotal[3]) / (csvArray.length - 1)));
      tdj.textContent = Math.round(act_sales).toLocaleString();
    }
    // 達成率
    else if( j == 4 ){
      let achievement_rate = (act_sales / elementAllTotal[4]) * 1000;
      tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
    }
    // 平均差異
    else if( j == 5 ){
      tdj.textContent = Math.round(act_sales - Number(elementAllTotal[4])).toLocaleString();
      if( act_sales - Number(elementAllTotal[4]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red");
      }
    }
    // 累計差異
    else if( j == 6 ){
      tdj.textContent = Math.round((act_sales - Number(elementAllTotal[4])) * (Number(elementAllTotal[3]) / (csvArray.length - 1))).toLocaleString();
      if( act_sales - Number(elementAllTotal[4]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red BorderRight-thin");
      }
      else{
        tdj.setAttribute("class", "TextRight BorderRight-thin");
      }
    }
    // 目標粗利
    else if( j == 7 ){
      tdj.textContent = Math.round(Number(elementAllTotal[5])).toLocaleString();
    }
    // 実績粗利
    else if( j == 8 ){
      act_GrossProfit = Number(elementAllTotal[1]) / (Number(elementAllTotal[3]) / (csvArray.length - 1));
      tdj.textContent = Math.round(act_GrossProfit).toLocaleString();
    }
    // 達成率
    else if( j == 9 ){
      let achievement_rate = (act_GrossProfit) / Number(elementAllTotal[5]) * 1000;
      tdj.textContent = (Math.round(achievement_rate) / 10).toFixed(1).toLocaleString() + "%";
    }
    // 平均差異
    else if( j == 10 ){
      tdj.textContent = Math.round(act_GrossProfit - Number(elementAllTotal[5])).toLocaleString();
      if( act_GrossProfit - Number(elementAllTotal[5]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red");
      }
    }
    // 累計差異
    else if( j == 11 ){
      tdj.textContent = Math.round((act_GrossProfit - Number(elementAllTotal[5])) * (Number(elementAllTotal[3]) / (csvArray.length - 1))).toLocaleString();
      if( act_GrossProfit - Number(elementAllTotal[5]) < 0 ){
        tdj.setAttribute("class", "TextRight TextColor-Red BorderRight");
      }
      else{
        tdj.setAttribute("class", "TextRight BorderRight");
      }
    }
    tr.appendChild(tdj);
  }

  const tr_note1 = document.createElement("tr");
  sub_tf.appendChild(tr_note1);

  td_note = document.createElement("td");
  td_note.setAttribute("colSpan", 13);
  td_note.setAttribute("id", "Note");
  td_note.setAttribute("class", "TextColor-Red");
  td_note.textContent = "※この期間売上はホールコンデータを元に作成されていますのでホールコンとの通信状況により誤差が生じる可能性があります。";
  tr_note1.appendChild(td_note);

  const tr_note2 = document.createElement("tr");
  sub_tf.appendChild(tr_note2);

  td_note = document.createElement("td");
  td_note.setAttribute("colSpan", 13);
  td_note.setAttribute("id", "Note");
  td_note.setAttribute("class", "TextColor-Blue");
  td_note.textContent = "※実績粗利・・・粗利指標を使ってますので決算書の粗利とは誤差が生じております。";
  tr_note2.appendChild(td_note);
}
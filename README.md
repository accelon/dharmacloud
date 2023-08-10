# dharmacloud
dharmacloud selected text 

# 金剛經 source https://drive.google.com/drive/folders/0B97kVdkFekWZflB6YzBiLXZJVU5VM3AwSjJyRXd1RmN6YlYtOVJWUWpCTmdGWE9fSE92Mms?resourcekey=0-I76OLzmHtCtGiDMvshxicg
ཚĲ 改為 ཚ
 ི  去除前面多餘空白
 英譯 http://www.vincentpoon.com/diamond-sutra.html
 

 node extract-nissaya.js //將 nissaya.js 
 分解成 
 dc_sanskrit/vcpp.off          //梵文本
 dc_sanskrit/sanskritdict.off  //從梵文查中文
 off/zhdict.off                //從中文查梵文


 node fetchfolio.js bkid //產生 每行頁碼及原書圖版換行文字 ，貼到
 https://docs.google.com/spreadsheets/d/1MVVBbS60aHA1QfQrj9n9ghuUiy5rx6F1rNDBKFa2Ti8/edit#gid=1457692547

 

心經梵文:
https://www2.hf.uio.no/polyglotta/index.php?page=record&vid=1175&mid=1992992


node gen-timestamp.js
產生 時間軸  off/timestamp.tsv 及 off/timestamp_sanskrit.tsv



找出所有詞條
ptk dump dc dc.txt
ptk listwords dc.txt zhwiki-20230701-pages-articles-multistream-index.txt
//rename to dc-wikipedia.csv
ptk listwords dc.txt fgdzd-entries.txt
//rename to dc-fgdzd.csv

得到 兩個 csv ，合併產生 tsv
node gen-dictentry.js



## 錯誤記錄

增一阿含卷8  pb3 cb581c10 「持衣钵」「捨除衣钵」

cb585b19 善知識人不作是念....  金剛經原型？

增一 卷23 頁6~10  錯版

cb666a28 大畏之林口=>大畏之狀
# <font class="h2">**打包字體說明書**</font>

將切割好的手寫字 png 檔打包成 ttf 檔流程 :dog: 
網址：https://github.com/chiaoooo/PngToTTF


### 需要先 npm install 的套件如下：
``` 
potrace == 2.1.8
svgicons2svgfont == 12.0.0
graceful-fs == 4.2.11
path == 0.12.7
progress == 2.0.3
```


### 下載專案進行轉換

``` 
git clone https://github.com/chiaoooo/PngToTTF
mkdir svg_separate
mkdir final_font 
``` 




### PNG ---> SVG

``` 
node potrace.js
```

> 套件來源 https://www.npmjs.com/package/potrace

* 記得將 input 路徑改為自己的 png 資料夾
* svg 會存在 svg_separate

### SVG ---> SVG

``` 
pip install picosvg
pico.bat
``` 
> 套件來源 https://github.com/googlefonts/picosvg

這個步驟為了讓 svg 中的 fill-rule="evenodd" 不被下一個步驟的 svgicons2svgfont 忽略。==處理 14000 個字耗時約 2.5 小時。==

* 處理過的 SVG 會存在 pico 資料夾
* fillrule 的比較：

| NoneZero                                     | EvenOdd |
| --------------------------------------------- | -------- |
| ![](https://hackmd.io/_uploads/HySD7ASfa.png) | ![](https://hackmd.io/_uploads/rJU_mCSG6.png) |

<br>如果不做這個步驟直接打包，在 fontforge 顯示會長這樣：
![](https://hackmd.io/_uploads/HJwYN0rG6.png)

放大圖：


| 曲 | 曙 | 曾 |
| -------- | -------- | -------- |
| ![](https://hackmd.io/_uploads/S1GL40HMp.png)    | ![](https://hackmd.io/_uploads/ByWUBABfT.png)| ![](https://hackmd.io/_uploads/H16kBRrfa.png)    |

<br>

### SVG ---> SVG (打包成一個 SVG 檔)
> 套件來源：https://www.npmjs.com/package/svgicons2svgfont 

這個步驟跟 https://chiaoooo.github.io/font-svg-viewer/ 不同的地方是不採取替換再打包的方法，而是直接打包現有的 svg 檔，節省空間及時間 ( 31026 kb 縮小至 9252 kb / 12 小時縮短至 2 分鐘 )。
```
node readfile.js
```

* 完成以後會在 final_font 裡面看到 fontpico.svg，將它丟入 FontForge 內並完成後續設定。

### SVG ---> TTF
進入 FontForge 以後可以看到字不會有黑一塊一塊的，就代表成功了!
![](https://hackmd.io/_uploads/BJkrfeLGp.png)

* 點選 Element ---> Font info，在這邊可以修改字體名稱
![](https://hackmd.io/_uploads/SkC_aRHGp.png)

* 點選左邊那排的 OS/2 ---> Charsets ---> MS Code Pages 取消 Default 的打勾 ---> 選取 950 ---> ok！
![](https://hackmd.io/_uploads/SygB0CHGa.png)

* 點選 File ---> Generate Fonts 輸出成 ttf 檔（跳出訊息都選 yes / generate）
![](https://hackmd.io/_uploads/rJMZJJLGp.png)

<br><br>
### 完成 !


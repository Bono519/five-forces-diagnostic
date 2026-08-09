# 五力壓力量測 · 產業結構診斷工具

以 Porter 五力架構為基礎的互動式產業結構診斷工具。30 題一問一答，產出五力壓力羅盤、壓力雷達圖、策略建議與可交付的 PDF 報告。純前端、零後端、可離線執行的 PWA。

**線上使用**：`https://<帳號>.github.io/<儲存庫名稱>/`

![五力壓力羅盤](assets/screenshot-forces.png)

*示範數據，非實際企業資料。*

## 量測設計

- 分析邊界設定 5 題（不計分）＋ 五力評分 25 題，每力 5 項驅動因子
- 五點語意錨定量表，方向統一為「分數愈高＝該力壓力愈大」
- 產業吸引力指數 ＝ 6 −（五力平均分數），區間 1.00–5.00
- 判讀門檻：≤ 2.4 低壓力｜2.5–3.4 中度｜≥ 3.5 高壓力
- 策略建議採規則式對應（5 力 × 3 級＝15 組、45 項行動），非統計推論

## 部署

上傳全部檔案後，至 **Settings → Pages**，Source 選 `Deploy from a branch`，Branch 選 `main` / `root`。

全專案採相對路徑，置於任何子目錄皆可運作。修改程式後請同步調高 `sw.js` 首行的 `CACHE` 版號，否則使用者端會續用舊快取。

## 資料與隱私

所有作答內容與案件紀錄僅儲存於使用者裝置的瀏覽器本機空間，不傳送至任何伺服器。本專案無後端、無資料庫、無追蹤程式碼。

## 架構依據

Porter, M. E. (1979). How Competitive Forces Shape Strategy. *Harvard Business Review*, 57(2), 137–145.
Porter, M. E. (1980). *Competitive Strategy*. New York: Free Press.
Porter, M. E. (2008). The Five Competitive Forces That Shape Strategy. *Harvard Business Review*, 86(1), 25–40.

## 免責聲明

五力評分係由受評單位或訪視顧問依現況主觀自評產生，屬結構性初步判讀，不構成投資、財務或法律建議。報告中「所需資源」與「預估期程」為規劃層級參考值。正式引用前應併同外部統計、實際財務數據與同業標竿交叉驗證。

# FORGE — The everyday boot, forged to last.

> 极限出海 · 24小时实战营 参赛作品
> **组别 / Team：TripleO**
> **标签：`#wkuhack2026`**

**线上站点：** https://nemo208.github.io/forge/

---

## 一句话

从「白牌鞋厂」到「海外独立站 DTC 品牌」的全流程跃迁 —— 用真实货盘、真实素材、真实 SKU 跑通 **建站 → 素材生成 → 投放冷启动 → 真实交易闭环** 四条链路。

## 我们做了什么

| 环节 | 交付 |
| --- | --- |
| **建站** | 单文件静态站 FORGE（hash 路由 SPA）：Home / Shop / Product / Fit Studio / Story / Launch / FAQ / Checkout |
| **素材生成** | 直接用货盘影棚图（800×800 主图 / 白底 / 多角度），无 CGI、无侵权元素；广告创意在 Launch 页直接展示 |
| **投放冷启动** | Launch 页给出 4 阶段漏斗 + Meta/TikTok/Google 渠道预算 + CPM/CTR/CPA/ROAS KPI |
| **交易闭环** | 真实 SKU / 材质 / 码段 / 交期，购物车 → 结算 → 订单确认的完整 demo 闭环 |

## 产品与货盘

- **主货盘：D — 传统男靴**（真实货号）
  - `14534-H` 超纤内里 · 黑色（The Original）
  - `11295-J` 网纱内里 · 棕色 / 漆皮 / 红色（The Breather）
- 出厂 ¥98 / 控价 ¥148，DTC 定价 $69–79，尺码 EU 38–46，现货 48h 发货
- **材质诚实**：超纤 = premium microfiber（vegan），漆皮 = patent coating，绝不冒充真皮

## 个性化定制 —— Fit Studio（足部特征扫描）

- 纯端侧 Canvas 灰度分割：四角采样背景 → 阈值二值化 → 包围盒 → 长宽比
- 由长宽比映射 **脚长 / 脚宽 / 足弓分类 → EU 尺码（38–46）→ 内里推荐（微纤 / 网纱）**
- 结果写入 localStorage，产品页自动预选尺码
- 照片**全程本地处理，不上传**

## 技术栈

- 纯原生 HTML + CSS + JS（单文件，无构建、无依赖）
- 端侧图像处理：Canvas `getImageData` 灰度分割
- 部署：GitHub Pages（`main` 分支）

## 目录结构

```
index.html    # 全部站点（结构 + 样式 + 逻辑，hash 路由）
img/          # 16 张真实产品图（自 D:\hack 货盘压缩到 800px）
README.md
```

## 路由

`#/` `#/shop` `#/product/:id` `#/fit` `#/story` `#/launch` `#/faq` `#/checkout`

## 合规声明

- 不含任何商标 / 侵权潮玩元素（已排除 3D 打印货盘中的侵权款）
- 材质、价格、货源全部如实标注；Story 页公开成本与定价公式

## 更新 / 部署

```bash
git add -A && git commit -m "..." && git push origin main
# GitHub Pages 自动重建 -> https://nemo208.github.io/forge/
```

---

*Built in 24 hours by **TripleO** — `#wkuhack2026`.*

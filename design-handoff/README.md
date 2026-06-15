# UI Handoff Workflow

这个目录用于把当前 HTML 视觉稿交给 Stitch、Figma 或后续 Xcode 实现。目标是减少截图来回猜测，让每次修改都能定位到页面、组件、状态和设计 token。

## 当前源文件

- HTML mockup: `design-mockups/TomatoHome_Proposed_UI_2026-05-31.html`
- Onboarding preview: `design-mockups/TomatoOnboarding_Proposed_UI_2026-06-07.html`
- Tomato-theme onboarding preview: `design-mockups/TomatoOnboarding_TomatoTheme_2026-06-07.html`
- 目标产品: 番茄 Tomato，网约车/送餐司机净收入驾驶助手
- 当前屏幕: Onboarding 首次启动流程；Home 首页，包含深色车内模式与浅色日间模式

## 推荐流程

1. 在 Stitch 或 Figma 中继续细化 UI/UX/VD。
2. 修改时保留组件命名，尽量使用本目录里的 `DESIGN.md` 作为设计系统说明。
3. 最终稿定稿后导出 Figma link、Stitch project link、PNG 截图、设计 tokens 或 inspect 信息。
4. 发回给 Codex 时，使用 `CHANGE_REQUEST_TEMPLATE.md` 描述改动范围。
5. Codex 按组件 ID 和 token 实现 SwiftUI/Xcode 版本，并只改指定范围。

## 为什么这样做

以前的问题是修改请求主要靠截图和自然语言，例如“这个按钮颜色不对”。这会导致三个风险：

- 无法确定是深色模式、浅色模式，还是两个模式都要改。
- 无法确定是背景色、文字色、描边、阴影，还是状态色。
- 实现时可能顺手影响其他组件。

现在 HTML 已经加入稳定 `data-design-id`。以后你可以直接说：

```text
Home.ShiftCard.Actions.End
只改 dark mode。文字色改 #FF6B64，border 改 rgba(255,107,100,.55)，不要改按钮高度、padding、圆角。
```

## 工具建议

首选：Figma 作为最终设计源。它最适合精确管理 spacing、tokens、components、variants 和开发交付。

Stitch 适合：快速生成视觉方向、扩展页面、做多方案探索、把自然语言/截图/code context 转成 UI 草案。

Codex/Xcode 适合：在最终设计明确后，把稿子转成可运行的 SwiftUI app，并接入真实状态、数据和部署逻辑。

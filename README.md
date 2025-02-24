# Tauri + Vue + TypeScript

这个模板应该能帮助您快速开始使用 Vue 3 和 TypeScript 在 Vite 中进行开发。该模板使用 Vue 3 的 `<script setup>` 单文件组件，查看 [script setup 文档](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) 了解更多信息。

## 推荐 IDE 设置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（Vue 官方扩展） + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode)（Tauri 插件） + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)（Rust 语言支持）

## 对 `.vue` 导入的 TypeScript 类型支持

由于 TypeScript 无法直接处理 `.vue` 导入的类型信息，它们默认会被垫片处理为通用 Vue 组件类型。在大多数情况下，如果您不关心模板之外的组件属性类型，这样已经足够了。然而，如果您希望获得实际的属性类型（例如在使用手动 `h(...)` 调用时进行属性验证），可以通过以下步骤启用 Volar 的接管模式：

1. 在 VS Code 的命令面板中运行 `Extensions: Show Built-in Extensions`，找到 `TypeScript and JavaScript Language Features`，右键选择 `Disable (Workspace)`。默认情况下，当原生的 TypeScript 扩展被禁用时，接管模式会自动启用。
2. 通过命令面板运行 `Developer: Reload Window` 重新加载 VS Code 窗口。

您可以在[这里](https://github.com/johnsoncodehk/volar/discussions/471)了解更多关于接管模式的信息。

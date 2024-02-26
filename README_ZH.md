# Vue 3 + TypeScript + Vite

这个模板能帮助你开始在 Vite 中使用 Vue 3 和 TypeScript 进行开发。模板使用了 Vue 3 的 `<script setup>` 单文件组件（SFC），查看[脚本设置文档](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)了解更多信息。

## 推荐的 IDE 设置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（禁用 Vetur）+ [TypeScript Vue 插件 (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)。

## TS 中 `.vue` 导入的类型支持

默认情况下，TypeScript 无法处理 `.vue` 导入的类型信息，因此我们用 `vue-tsc` 替换了 `tsc` 命令行工具进行类型检查。在编辑器中，我们需要 [TypeScript Vue 插件 (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) 以让 TypeScript 语言服务识别 `.vue` 类型。

如果你觉得独立的 TypeScript 插件不够快，Volar 还实现了一个性能更好的[接管模式](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669)。你可以按照以下步骤启用它：

1. 禁用内置的 TypeScript 扩展
   1. 从 VSCode 的命令面板运行 `Extensions: Show Built-in Extensions`
   2. 找到 `TypeScript and JavaScript Language Features`，右键选择 `Disable (Workspace)`
2. 通过命令面板运行 `Developer: Reload Window` 来重新加载 VSCode 窗口。

# Gemini Interaction Fixer

🔧 一个专门修复Google Gemini双栏布局交互问题的用户脚本集合

## 📋 问题描述

在Google Gemini中，当点击PDF链接进入双栏布局时，左侧的对话历史区域会完全失去交互能力：
- ❌ 无法滚动查看历史对话
- ❌ 无法选择文字内容
- ❌ 鼠标点击无响应

## 🎯 问题根源

经过深入分析发现，问题的根本原因是Gemini在PDF查看器激活时，会将整个`<chat-app>`元素设置为`aria-hidden="true"`，这个ARIA属性不仅对屏幕阅读器隐藏内容，同时也阻止了所有鼠标和键盘交互。

```javascript
// Gemini的问题代码逻辑
const chatApp = document.querySelector('chat-app');
chatApp.setAttribute('aria-hidden', 'true'); // 🚨 导致交互失效
```

## 🚀 解决方案

本仓库提供了多个版本的修复脚本：

### 1. 紧凑修复器 (推荐)
**文件**: `gemini-compact-fix.user.js`

- ✅ 小巧的可拖拽界面
- ✅ 自动/手动修复模式
- ✅ 完整的问题修复逻辑
- ✅ 不影响页面内容显示

### 2. 终极修复器
**文件**: `gemini-ultimate-fix.user.js`

- ✅ 详细的诊断功能
- ✅ 多层次修复策略
- ✅ 实时状态显示
- ✅ 强制交互功能

### 3. 其他版本
- `gemini-simple-fix.user.js` - 简单版本
- `gemini-aria-fix.user.js` - ARIA专门修复
- `gemini-attribute-protector.user.js` - 属性保护器

## 📦 安装方法

### 前提条件
1. 安装浏览器扩展：[Tampermonkey](https://www.tampermonkey.net/) 或 [Greasemonkey](https://www.greasespot.net/)

### 安装步骤
1. 点击想要使用的脚本文件
2. 点击 "Raw" 按钮查看原始代码
3. 复制所有代码
4. 在Tampermonkey中创建新脚本
5. 粘贴代码并保存
6. 刷新Gemini页面

## 🎛️ 使用方法

### 紧凑修复器
1. 安装后在页面顶部中央会出现小型修复器面板
2. 点击 **自动** 启动自动修复模式
3. 点击 **修复** 进行手动修复
4. 点击 **—** 最小化面板
5. 拖拽面板到合适位置

### 快捷键
- `Ctrl+Shift+G` - 启动/停止自动修复
- `Ctrl+Shift+H` - 手动修复一次
- `Ctrl+Shift+M` - 最小化/恢复面板

## 🔧 修复原理

### 核心修复逻辑
```javascript
// 1. 移除阻止交互的ARIA属性
chatApp.removeAttribute('aria-hidden');

// 2. 强制启用交互属性
chatApp.style.setProperty('pointer-events', 'auto', 'important');
chatApp.style.setProperty('user-select', 'text', 'important');

// 3. 修复容器尺寸问题
chatContent.style.setProperty('display', 'flex', 'important');
chatContent.style.setProperty('min-height', '500px', 'important');

// 4. 移除遮挡层
// 5. 修复底部内容显示
```

### 为什么有效？
- **精准定位**: 直击`aria-hidden`这个根本原因
- **全面修复**: 处理所有相关的CSS和布局问题
- **持续保护**: 防止Gemini重新破坏修复
- **优先级保证**: 使用`!important`确保修复不被覆盖

## 🐛 问题排查

### 常见问题

**Q: 安装后看不到修复器面板？**
A: 检查Tampermonkey是否启用，确认脚本在Gemini页面上激活

**Q: 修复后左侧内容底部被遮挡？**
A: 使用最新版本的紧凑修复器，已包含底部内容修复

**Q: 修复效果不持久？**
A: 启用自动修复模式，脚本会持续监控并修复

### 调试信息
打开浏览器控制台(F12)查看详细的修复日志：
```
🔧 Gemini紧凑修复器已加载
✅ 紧凑修复器：修复了 3 个问题，移除了 0 个遮罩
🔧 已修复底部内容遮挡问题
```

## 📊 兼容性

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## 🤝 贡献

欢迎提交Issue和Pull Request！

### 开发环境
1. Fork本仓库
2. 创建功能分支
3. 在Tampermonkey中测试
4. 提交PR

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

感谢所有测试和反馈的用户，特别是在问题调试过程中提供详细日志的贡献者。

## 📞 联系

如有问题或建议，请通过GitHub Issues联系。

---

**⭐ 如果这个项目对你有帮助，请给个Star支持一下！**

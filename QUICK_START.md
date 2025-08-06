# 🚀 快速开始指南

## 📋 问题现象

在Google Gemini中点击PDF链接后：
- ❌ 左侧对话历史无法滚动
- ❌ 无法选择文字内容  
- ❌ 鼠标点击无响应

## ⚡ 快速解决

### 1️⃣ 安装Tampermonkey
- [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- [Firefox](https://addons.mozilla.org/firefox/addon/tampermonkey/)
- [Edge](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)

### 2️⃣ 选择脚本（推荐紧凑修复器）

**紧凑修复器** - 最佳选择 ⭐
```
scripts/gemini-compact-fix.user.js
```

### 3️⃣ 安装脚本
1. 复制脚本代码
2. 在Tampermonkey中创建新脚本
3. 粘贴代码并保存
4. 刷新Gemini页面

### 4️⃣ 使用方法
- 页面顶部会出现小型修复器面板
- 点击 **自动** 启动自动修复
- 点击 **修复** 手动修复一次

## 🎯 脚本选择指南

| 脚本 | 特点 | 适用场景 |
|------|------|----------|
| 🎯 **紧凑修复器** | 小巧界面，功能完整 | **推荐日常使用** |
| 🔧 终极修复器 | 详细诊断，功能最全 | 需要调试信息 |
| ⚡ 简单修复器 | 轻量级，基础功能 | 低配置设备 |
| 🎭 ARIA修复器 | 专门修复ARIA问题 | 只有ARIA问题 |
| 🛡️ 属性保护器 | 防止属性被重置 | 修复容易被覆盖 |

## ⌨️ 快捷键

- `Ctrl+Shift+G` - 启动/停止自动修复
- `Ctrl+Shift+H` - 手动修复一次
- `Ctrl+Shift+M` - 最小化/恢复面板

## 🐛 常见问题

**Q: 看不到修复器面板？**
A: 检查Tampermonkey是否启用，确认脚本激活

**Q: 修复效果不持久？**
A: 启用自动修复模式，脚本会持续监控

**Q: 底部内容被遮挡？**
A: 使用最新版本，已包含底部修复

## 🔍 调试信息

按F12打开控制台查看日志：
```
🔧 Gemini紧凑修复器已加载
✅ 紧凑修复器：修复了 3 个问题
```

## 📞 获取帮助

- 查看 [README.md](README.md) 了解详细信息
- 查看 [故障排除指南](CONTRIBUTING.md#问题排查)
- 提交 [GitHub Issue](https://github.com/your-repo/issues)

---

**🎉 享受修复后的流畅体验！**

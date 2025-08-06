#!/bin/bash

# Gemini Interaction Fixer - GitHub仓库初始化脚本
# 使用方法: chmod +x init-repo.sh && ./init-repo.sh

echo "🚀 开始初始化 Gemini Interaction Fixer GitHub仓库..."

# 检查是否在正确的目录
if [ ! -f "README.md" ] || [ ! -d "scripts" ]; then
    echo "❌ 错误: 请在项目根目录运行此脚本"
    exit 1
fi

# 初始化Git仓库
echo "📁 初始化Git仓库..."
git init

# 添加所有文件
echo "📝 添加项目文件..."
git add .

# 创建初始提交
echo "💾 创建初始提交..."
git commit -m "🎉 Initial commit: Gemini Interaction Fixer v1.0.0

✨ 功能特性:
- 🔧 修复Gemini双栏布局交互失效问题
- 🎯 精准移除aria-hidden属性阻断
- 💪 强制启用交互属性和布局修复
- 🛡️ 持续监控和保护机制
- 🎨 小巧美观的可拖拽控制面板
- ⌨️ 便捷的快捷键支持

📦 包含脚本:
- gemini-compact-fix.user.js (紧凑修复器 - 推荐)
- gemini-ultimate-fix.user.js (终极修复器)
- gemini-simple-fix.user.js (简单修复器)
- gemini-aria-fix.user.js (ARIA专门修复器)
- gemini-attribute-protector.user.js (属性保护器)

🔧 解决问题:
- ❌ 左侧对话历史无法滚动
- ❌ 无法选择文字内容
- ❌ 鼠标点击无响应
- ❌ 底部内容被遮挡

📊 兼容性:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

🎯 技术亮点:
- 识别aria-hidden为问题根源
- 多层次修复策略 (ARIA + CSS + 布局)
- 使用!important确保修复优先级
- 高效的DOM监控和修复机制"

echo "✅ Git仓库初始化完成!"
echo ""
echo "🔗 下一步操作:"
echo "1. 在GitHub上创建新仓库 'gemini-interaction-fixer'"
echo "2. 执行以下命令连接远程仓库:"
echo ""
echo "   git remote add origin https://github.com/YOUR_USERNAME/gemini-interaction-fixer.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. 设置仓库描述和标签:"
echo "   描述: 🔧 修复Google Gemini双栏布局交互问题的用户脚本集合"
echo "   标签: userscript, tampermonkey, gemini, google, pdf, interaction, fix, aria, accessibility"
echo ""
echo "📚 详细设置指南请查看: setup-github-repo.md"
echo ""
echo "🎉 项目已准备就绪，祝你的开源项目成功！"

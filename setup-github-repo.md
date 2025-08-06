# GitHub仓库设置指南

## 🚀 创建GitHub仓库

### 1. 在GitHub上创建新仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 填写仓库信息：
   - **Repository name**: `gemini-interaction-fixer`
   - **Description**: `🔧 修复Google Gemini双栏布局交互问题的用户脚本集合`
   - **Visibility**: Public (推荐) 或 Private
   - **Initialize this repository with**: 不要勾选任何选项（我们已有文件）

### 2. 本地Git初始化

在项目目录中执行以下命令：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 创建初始提交
git commit -m "🎉 Initial commit: Gemini Interaction Fixer v1.0.0

- ✨ 添加紧凑修复器（推荐版本）
- ✨ 添加终极修复器（功能完整版）
- ✨ 添加简单修复器（轻量版）
- ✨ 添加ARIA专门修复器
- ✨ 添加属性保护器
- 📝 完善项目文档和说明
- 🔧 修复Gemini双栏布局交互失效问题"

# 添加远程仓库（替换为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/gemini-interaction-fixer.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 3. 仓库设置优化

#### 3.1 设置仓库描述和标签
在GitHub仓库页面：
1. 点击右上角的 ⚙️ "Settings"
2. 在 "General" 部分：
   - **Description**: `🔧 修复Google Gemini双栏布局交互问题的用户脚本集合`
   - **Website**: 可以留空或填写相关链接
   - **Topics**: 添加标签
     ```
     userscript, tampermonkey, gemini, google, pdf, interaction, fix, aria, accessibility
     ```

#### 3.2 启用Issues和Discussions
1. 在 "Features" 部分确保勾选：
   - ✅ Issues
   - ✅ Discussions (推荐)
   - ✅ Wiki (可选)

#### 3.3 设置分支保护规则
1. 进入 "Settings" → "Branches"
2. 点击 "Add rule"
3. 设置规则：
   - **Branch name pattern**: `main`
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging

### 4. 创建Release

#### 4.1 创建第一个Release
1. 在仓库主页点击 "Releases"
2. 点击 "Create a new release"
3. 填写信息：
   - **Tag version**: `v1.0.0`
   - **Release title**: `🎉 Gemini Interaction Fixer v1.0.0`
   - **Description**:
     ```markdown
     ## 🚀 首次发布

     修复Google Gemini双栏布局交互问题的用户脚本集合。

     ### ✨ 主要功能
     - 修复PDF双栏模式下左侧对话区域交互失效
     - 支持自动和手动修复模式
     - 小巧美观的可拖拽控制面板
     - 多种脚本版本满足不同需求

     ### 📦 包含脚本
     - `gemini-compact-fix.user.js` - 紧凑修复器（推荐）
     - `gemini-ultimate-fix.user.js` - 终极修复器
     - `gemini-simple-fix.user.js` - 简单修复器
     - `gemini-aria-fix.user.js` - ARIA专门修复器
     - `gemini-attribute-protector.user.js` - 属性保护器

     ### 🔧 安装方法
     1. 安装 [Tampermonkey](https://www.tampermonkey.net/)
     2. 选择合适的脚本文件
     3. 复制代码到Tampermonkey
     4. 保存并启用

     ### 📊 兼容性
     - ✅ Chrome 90+
     - ✅ Firefox 88+
     - ✅ Edge 90+
     - ✅ Safari 14+
     ```

#### 4.2 上传脚本文件
在Release页面可以上传脚本文件作为附件，方便用户下载。

### 5. 设置GitHub Pages（可选）

如果想要创建项目网站：

1. 进入 "Settings" → "Pages"
2. 在 "Source" 部分选择：
   - **Source**: Deploy from a branch
   - **Branch**: main
   - **Folder**: / (root)
3. 保存设置

### 6. 添加README徽章

在README.md顶部添加一些徽章：

```markdown
# Gemini Interaction Fixer

![GitHub release (latest by date)](https://img.shields.io/github/v/release/YOUR_USERNAME/gemini-interaction-fixer)
![GitHub](https://img.shields.io/github/license/YOUR_USERNAME/gemini-interaction-fixer)
![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/gemini-interaction-fixer)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/gemini-interaction-fixer)

🔧 一个专门修复Google Gemini双栏布局交互问题的用户脚本集合
```

### 7. 社区设置

#### 7.1 创建Issue模板
创建 `.github/ISSUE_TEMPLATE/` 目录和模板文件：

- `bug_report.md` - Bug报告模板
- `feature_request.md` - 功能请求模板

#### 7.2 创建Pull Request模板
创建 `.github/pull_request_template.md`

### 8. 推广和分享

#### 8.1 相关社区
- Reddit: r/userscripts, r/chrome
- GitHub Topics: 添加相关标签
- 用户脚本网站: Greasyfork, OpenUserJS

#### 8.2 SEO优化
- 使用描述性的仓库名称
- 添加详细的描述和标签
- 保持README的更新和完整性

## 📋 检查清单

创建仓库后的检查项目：

- [ ] 仓库创建完成
- [ ] 所有文件已推送
- [ ] 仓库描述和标签已设置
- [ ] Issues和Discussions已启用
- [ ] 第一个Release已创建
- [ ] README徽章已添加
- [ ] 分支保护规则已设置（可选）
- [ ] GitHub Pages已配置（可选）

## 🎯 推荐仓库名称

如果 `gemini-interaction-fixer` 已被占用，可以考虑：

- `gemini-pdf-interaction-fix`
- `gemini-dual-pane-fixer`
- `gemini-aria-interaction-fix`
- `google-gemini-interaction-fixer`
- `gemini-userscript-collection`

---

**祝你的开源项目成功！** 🎉

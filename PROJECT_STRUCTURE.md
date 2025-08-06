# 项目结构说明

## 📁 文件组织

```
gemini-interaction-fixer/
├── README.md                           # 项目主要说明文档
├── LICENSE                            # MIT许可证
├── CHANGELOG.md                       # 版本更新日志
├── CONTRIBUTING.md                    # 贡献指南
├── PROJECT_STRUCTURE.md              # 项目结构说明（本文件）
├── .gitignore                        # Git忽略文件配置
│
├── 📁 scripts/                       # 用户脚本文件夹
│   ├── gemini-compact-fix.user.js    # 紧凑修复器（推荐）
│   ├── gemini-ultimate-fix.user.js   # 终极修复器
│   ├── gemini-simple-fix.user.js     # 简单修复器
│   ├── gemini-aria-fix.user.js       # ARIA专门修复器
│   └── gemini-attribute-protector.user.js # 属性保护器
│
├── 📁 docs/                          # 文档文件夹
│   ├── installation-guide.md         # 详细安装指南
│   ├── troubleshooting.md           # 故障排除指南
│   ├── technical-details.md         # 技术细节说明
│   └── screenshots/                 # 截图文件夹
│       ├── before-fix.png           # 修复前截图
│       ├── after-fix.png            # 修复后截图
│       └── panel-interface.png      # 面板界面截图
│
└── 📁 examples/                      # 示例和测试文件夹
    ├── test-cases.md                # 测试用例
    └── demo-scenarios.md            # 演示场景
```

## 📋 文件说明

### 核心脚本文件

#### 🎯 gemini-compact-fix.user.js (推荐)
- **用途**: 主要推荐使用的修复脚本
- **特点**: 
  - 小巧的可拖拽界面
  - 自动/手动修复模式
  - 完整的问题修复逻辑
  - 不影响页面内容显示
- **适用场景**: 日常使用，追求简洁体验的用户

#### 🔧 gemini-ultimate-fix.user.js
- **用途**: 功能最全面的修复脚本
- **特点**:
  - 详细的诊断功能
  - 多层次修复策略
  - 实时状态显示
  - 强制交互功能
- **适用场景**: 需要详细调试信息的用户，开发者

#### ⚡ gemini-simple-fix.user.js
- **用途**: 最轻量的修复脚本
- **特点**:
  - 代码简洁
  - 资源占用少
  - 基础修复功能
- **适用场景**: 低配置设备，只需基础功能的用户

#### 🎭 gemini-aria-fix.user.js
- **用途**: 专门修复ARIA属性问题
- **特点**:
  - 专注于aria-hidden问题
  - 轻量级实现
  - 针对性强
- **适用场景**: 只有ARIA问题的用户

#### 🛡️ gemini-attribute-protector.user.js
- **用途**: 防止属性被重新设置
- **特点**:
  - 持续监控属性变化
  - 自动恢复被修改的属性
  - 保护修复效果
- **适用场景**: 修复效果容易被覆盖的情况

### 文档文件

#### 📖 README.md
- 项目主要介绍
- 安装和使用方法
- 问题说明和解决方案
- 快速开始指南

#### 📝 CHANGELOG.md
- 版本更新历史
- 新功能和修复记录
- 开发历程回顾

#### 🤝 CONTRIBUTING.md
- 贡献指南和规范
- 开发环境设置
- 代码提交流程
- 测试要求

#### ⚖️ LICENSE
- MIT开源许可证
- 使用权限和限制说明

## 🔄 版本管理

### 分支策略
- `main` - 主分支，稳定版本
- `develop` - 开发分支，新功能集成
- `feature/*` - 功能分支
- `hotfix/*` - 紧急修复分支

### 标签规范
- `v1.0.0` - 正式版本
- `v1.0.0-beta.1` - 测试版本
- `v1.0.0-alpha.1` - 预览版本

## 🎯 开发指南

### 新增脚本
1. 在 `scripts/` 目录创建新文件
2. 遵循命名规范：`gemini-[功能名]-fix.user.js`
3. 添加完整的用户脚本头部信息
4. 更新README.md中的脚本列表

### 修改现有脚本
1. 在对应文件中进行修改
2. 更新版本号和修改日期
3. 在CHANGELOG.md中记录变更
4. 进行充分测试

### 添加文档
1. 在 `docs/` 目录创建相应文档
2. 使用Markdown格式
3. 保持与现有文档风格一致
4. 添加必要的截图和示例

## 🧪 测试策略

### 测试环境
- Chrome 90+ (主要测试)
- Firefox 88+ (兼容性测试)
- Edge 90+ (兼容性测试)
- Safari 14+ (兼容性测试)

### 测试场景
- 基础功能测试
- 边界情况测试
- 性能测试
- 兼容性测试

### 测试文档
- `examples/test-cases.md` - 详细测试用例
- `examples/demo-scenarios.md` - 演示场景

## 📊 项目统计

### 代码行数（估算）
- 紧凑修复器: ~500行
- 终极修复器: ~800行
- 简单修复器: ~200行
- ARIA修复器: ~150行
- 属性保护器: ~300行

### 文档页数
- README: ~150行
- 贡献指南: ~200行
- 技术文档: ~100行
- 其他文档: ~300行

## 🚀 部署和发布

### 发布流程
1. 完成功能开发和测试
2. 更新版本号和文档
3. 创建Pull Request
4. 代码审查和合并
5. 创建Release标签
6. 发布到相关平台

### 分发渠道
- GitHub Releases
- Greasyfork (计划中)
- OpenUserJS (计划中)
- 用户手动安装

---

这个项目结构旨在提供清晰的组织方式，便于维护和扩展。如有建议或改进意见，欢迎提出！

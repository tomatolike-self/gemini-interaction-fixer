// ==UserScript==
// @name         Gemini紧凑修复器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  紧凑版Gemini双栏布局修复工具，小巧不占地方
// @author       You
// @match        https://gemini.google.com/*
// @match        https://aistudio.google.com/*
// @match        https://gemini.google.com/app/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let isAutoFixing = false;
    let fixInterval = null;
    let compactPanel = null;
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    // 创建紧凑修复面板
    function createCompactPanel() {
        if (compactPanel) return;

        compactPanel = document.createElement('div');
        compactPanel.id = 'compact-fix-panel';
        compactPanel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            background: rgba(0, 0, 0, 0.9);
            color: #00ff00;
            border: 1px solid #00ff00;
            border-radius: 6px;
            padding: 8px;
            font-family: monospace;
            font-size: 10px;
            z-index: 999999;
            box-shadow: 0 2px 8px rgba(0, 255, 0, 0.3);
            transition: box-shadow 0.3s ease, transform 0.1s ease;
            cursor: move;
            user-select: none;
        `;

        // 拖拽功能
        compactPanel.onmousedown = (e) => {
            // 如果点击的是按钮，不启动拖拽
            if (e.target.tagName === 'BUTTON') return;

            isDragging = true;
            const rect = compactPanel.getBoundingClientRect();
            dragOffset.x = e.clientX - rect.left;
            dragOffset.y = e.clientY - rect.top;

            compactPanel.style.transition = 'none';
            compactPanel.style.transform = 'none';
            compactPanel.style.left = rect.left + 'px';
            compactPanel.style.top = rect.top + 'px';

            e.preventDefault();
        };

        // 鼠标悬停效果（仅在非拖拽状态）
        compactPanel.onmouseenter = () => {
            if (!isDragging) {
                compactPanel.style.boxShadow = '0 4px 12px rgba(0, 255, 0, 0.5)';
            }
        };

        compactPanel.onmouseleave = () => {
            if (!isDragging) {
                compactPanel.style.boxShadow = '0 2px 8px rgba(0, 255, 0, 0.3)';
            }
        };

        // 标题
        const title = document.createElement('div');
        title.textContent = '🔧 修复器';
        title.style.cssText = 'font-weight: bold; margin-bottom: 6px; text-align: center; color: #00ff00; cursor: move;';

        // 双击标题恢复到中心位置
        title.ondblclick = () => {
            compactPanel.style.transition = 'all 0.3s ease';
            compactPanel.style.left = '50%';
            compactPanel.style.top = '10px';
            compactPanel.style.transform = 'translateX(-50%)';
            console.log('🔧 面板已重置到中心位置');

            setTimeout(() => {
                compactPanel.style.transition = 'box-shadow 0.3s ease, transform 0.1s ease';
            }, 300);
        };

        // 状态指示器
        const status = document.createElement('div');
        status.id = 'compact-status';
        status.textContent = '待机';
        status.style.cssText = 'text-align: center; margin-bottom: 6px; font-size: 9px; color: #ffff00;';

        // 按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; gap: 3px;';

        // 自动修复按钮
        const autoBtn = document.createElement('button');
        autoBtn.id = 'auto-fix-btn';
        autoBtn.textContent = '自动';
        autoBtn.style.cssText = 'background: #4CAF50; color: white; border: none; padding: 4px 6px; border-radius: 3px; cursor: pointer; font-size: 9px; flex: 1;';

        // 手动修复按钮
        const manualBtn = document.createElement('button');
        manualBtn.id = 'manual-fix-btn';
        manualBtn.textContent = '修复';
        manualBtn.style.cssText = 'background: #FF9800; color: white; border: none; padding: 4px 6px; border-radius: 3px; cursor: pointer; font-size: 9px; flex: 1;';

        // 最小化按钮
        const minimizeBtn = document.createElement('button');
        minimizeBtn.id = 'minimize-btn';
        minimizeBtn.textContent = '—';
        minimizeBtn.style.cssText = 'background: #666; color: white; border: none; padding: 4px 6px; border-radius: 3px; cursor: pointer; font-size: 9px; width: 20px;';

        buttonContainer.appendChild(autoBtn);
        buttonContainer.appendChild(manualBtn);
        buttonContainer.appendChild(minimizeBtn);

        compactPanel.appendChild(title);
        compactPanel.appendChild(status);
        compactPanel.appendChild(buttonContainer);

        document.body.appendChild(compactPanel);

        // 绑定事件
        setupCompactEvents();
        setupDragEvents();
    }

    // 设置事件处理
    function setupCompactEvents() {
        document.getElementById('auto-fix-btn').onclick = (e) => {
            e.stopPropagation();
            if (isAutoFixing) {
                stopAutoFix();
            } else {
                startAutoFix();
            }
        };

        document.getElementById('manual-fix-btn').onclick = (e) => {
            e.stopPropagation();
            performUltimateFix();
        };

        document.getElementById('minimize-btn').onclick = (e) => {
            e.stopPropagation();
            minimizePanel();
        };
    }

    // 设置拖拽事件
    function setupDragEvents() {
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;

            // 限制在视窗范围内
            const maxX = window.innerWidth - compactPanel.offsetWidth;
            const maxY = window.innerHeight - compactPanel.offsetHeight;

            const constrainedX = Math.max(0, Math.min(newX, maxX));
            const constrainedY = Math.max(0, Math.min(newY, maxY));

            compactPanel.style.left = constrainedX + 'px';
            compactPanel.style.top = constrainedY + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                compactPanel.style.transition = 'box-shadow 0.3s ease, transform 0.1s ease';
                console.log('🔧 面板位置已保存');
            }
        });
    }

    // 开始自动修复
    function startAutoFix() {
        isAutoFixing = true;
        updateStatus('运行中', '#00ff00');
        
        const autoBtn = document.getElementById('auto-fix-btn');
        autoBtn.textContent = '停止';
        autoBtn.style.background = '#f44336';
        
        // 立即执行一次修复
        performUltimateFix();
        
        // 每2秒检查并修复
        fixInterval = setInterval(() => {
            performUltimateFix();
        }, 2000);
        
        console.log('🟢 紧凑修复器：自动修复已启动');
    }

    // 停止自动修复
    function stopAutoFix() {
        isAutoFixing = false;
        updateStatus('待机', '#ffff00');
        
        const autoBtn = document.getElementById('auto-fix-btn');
        autoBtn.textContent = '自动';
        autoBtn.style.background = '#4CAF50';
        
        if (fixInterval) {
            clearInterval(fixInterval);
            fixInterval = null;
        }
        
        console.log('🔴 紧凑修复器：自动修复已停止');
    }

    // 执行终极修复
    function performUltimateFix() {
        let fixedCount = 0;

        // 1. 修复chat-app的aria-hidden
        const chatApp = document.querySelector('chat-app');
        if (chatApp && chatApp.getAttribute('aria-hidden') === 'true') {
            chatApp.removeAttribute('aria-hidden');
            console.log('🔧 修复了chat-app的aria-hidden');
            fixedCount++;
        }

        // 2. 强化chat-app交互属性
        if (chatApp) {
            chatApp.style.setProperty('pointer-events', 'auto', 'important');
            chatApp.style.setProperty('user-select', 'text', 'important');
            fixedCount++;
        }

        // 3. 修复chat-container
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.setProperty('pointer-events', 'auto', 'important');
            chatContainer.style.setProperty('user-select', 'text', 'important');
            chatContainer.style.setProperty('overflow-y', 'auto', 'important');
            chatContainer.style.setProperty('z-index', '10', 'important');

            // 确保底部有足够的内边距，防止内容被遮挡
            chatContainer.style.setProperty('padding-bottom', '20px', 'important');

            // 确保容器高度正确计算
            const containerRect = chatContainer.getBoundingClientRect();
            if (containerRect.height > 0) {
                chatContainer.style.setProperty('max-height', '100%', 'important');
                chatContainer.style.setProperty('box-sizing', 'border-box', 'important');
            }

            fixedCount++;
        }

        // 4. 修复chat-window-content的0x0问题
        const chatContent = document.querySelector('chat-window-content');
        if (chatContent) {
            const rect = chatContent.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) {
                chatContent.style.setProperty('display', 'flex', 'important');
                chatContent.style.setProperty('flex-direction', 'column', 'important');
                chatContent.style.setProperty('flex-grow', '1', 'important');
                chatContent.style.setProperty('height', 'auto', 'important');
                chatContent.style.setProperty('min-height', '500px', 'important');
                chatContent.style.setProperty('width', 'auto', 'important');
                chatContent.style.setProperty('min-width', '300px', 'important');
                console.log('🔧 修复了chat-window-content的0x0问题');
                fixedCount++;
            }
        }

        // 5. 强制启用所有左侧容器的交互并修复显示问题
        const leftContainers = document.querySelectorAll('[class*="chat"], [class*="conversation"], [class*="message"]');
        leftContainers.forEach((container) => {
            const rect = container.getBoundingClientRect();
            if (rect.left < 400 && rect.width > 100) {
                container.style.setProperty('pointer-events', 'auto', 'important');
                container.style.setProperty('user-select', 'text', 'important');
                container.style.setProperty('cursor', 'text', 'important');

                // 确保内容不被遮挡
                if (container.classList.contains('chat-container') ||
                    container.querySelector('[class*="message"]')) {
                    container.style.setProperty('padding-bottom', '20px', 'important');
                    container.style.setProperty('margin-bottom', '10px', 'important');
                }
            }
        });

        // 6. 特别处理可能包含对话内容的容器
        const messageContainers = document.querySelectorAll('[class*="message-content"], [class*="conversation-content"], [data-test-id*="conversation"]');
        messageContainers.forEach((container) => {
            const rect = container.getBoundingClientRect();
            if (rect.left < 400 && rect.width > 100) {
                container.style.setProperty('padding-bottom', '20px', 'important');
                container.style.setProperty('margin-bottom', '10px', 'important');
                container.style.setProperty('overflow', 'visible', 'important');
            }
        });

        // 7. 移除可疑遮罩层
        const overlays = document.querySelectorAll('div[style*="position: absolute"], div[style*="position: fixed"]');
        let removedOverlays = 0;
        overlays.forEach(overlay => {
            const rect = overlay.getBoundingClientRect();
            const style = window.getComputedStyle(overlay);
            
            // 如果是覆盖左侧区域的高z-index透明层
            if (rect.left < 400 && rect.width > 200 && rect.height > 300 && 
                style.zIndex > 1000 && 
                overlay.id !== 'compact-fix-panel' &&
                (style.backgroundColor === 'transparent' || style.backgroundColor === 'rgba(0, 0, 0, 0)')) {
                
                overlay.style.setProperty('display', 'none', 'important');
                removedOverlays++;
            }
        });

        // 8. 修复底部内容遮挡问题
        fixBottomContentClipping();

        if (fixedCount > 0 || removedOverlays > 0) {
            updateStatus('已修复', '#00ff00');
            console.log(`✅ 紧凑修复器：修复了 ${fixedCount} 个问题，移除了 ${removedOverlays} 个遮罩`);

            // 3秒后恢复状态
            setTimeout(() => {
                if (isAutoFixing) {
                    updateStatus('运行中', '#00ff00');
                } else {
                    updateStatus('待机', '#ffff00');
                }
            }, 3000);
        }
    }

    // 修复底部内容遮挡问题
    function fixBottomContentClipping() {
        // 查找所有可能包含对话内容的容器
        const contentSelectors = [
            '.chat-container',
            '[data-test-id*="conversation"]',
            '[class*="conversation"]',
            '[class*="chat-content"]',
            '[class*="message-list"]',
            'chat-window-content'
        ];

        contentSelectors.forEach(selector => {
            const containers = document.querySelectorAll(selector);
            containers.forEach(container => {
                const rect = container.getBoundingClientRect();

                // 如果是左侧区域的容器
                if (rect.left < 400 && rect.width > 200 && rect.height > 100) {
                    // 确保有足够的底部空间
                    container.style.setProperty('padding-bottom', '30px', 'important');

                    // 检查是否有滚动条，如果有则确保滚动到底部时内容可见
                    if (container.scrollHeight > container.clientHeight) {
                        container.style.setProperty('scroll-padding-bottom', '30px', 'important');
                    }

                    // 确保容器不会被底部元素遮挡
                    const computedStyle = window.getComputedStyle(container);
                    if (computedStyle.position === 'relative' || computedStyle.position === 'absolute') {
                        container.style.setProperty('bottom', 'auto', 'important');
                    }
                }
            });
        });

        // 特别处理最后一个消息元素
        const lastMessages = document.querySelectorAll('[class*="message"]:last-child, [class*="conversation-turn"]:last-child');
        lastMessages.forEach(message => {
            const rect = message.getBoundingClientRect();
            if (rect.left < 400) {
                message.style.setProperty('margin-bottom', '30px', 'important');
                message.style.setProperty('padding-bottom', '20px', 'important');
            }
        });

        console.log('🔧 已修复底部内容遮挡问题');
    }

    // 更新状态显示
    function updateStatus(text, color) {
        const status = document.getElementById('compact-status');
        if (status) {
            status.textContent = text;
            status.style.color = color;
        }
    }

    // 最小化面板
    function minimizePanel() {
        const panel = compactPanel;
        const title = panel.children[0];  // 标题元素
        const status = panel.children[1]; // 状态元素
        const buttonContainer = panel.children[2]; // 按钮容器
        const isMinimized = panel.style.height === '20px';

        if (isMinimized) {
            // 恢复面板
            panel.style.height = 'auto';
            panel.style.width = '120px';
            panel.style.cursor = 'move';

            // 恢复状态显示
            status.style.display = 'block';

            // 恢复按钮容器显示
            buttonContainer.style.display = 'flex';

            // 恢复最小化按钮文本
            document.getElementById('minimize-btn').textContent = '—';

            // 恢复标题显示
            title.textContent = '🔧 修复器';
            title.style.marginBottom = '6px';
            title.style.textAlign = 'center';
            title.style.paddingLeft = '0px';

            // 移除恢复按钮（如果存在）
            const restoreBtn = document.getElementById('restore-btn');
            if (restoreBtn) {
                restoreBtn.remove();
            }

            console.log('🔧 面板已恢复');
        } else {
            // 最小化面板
            panel.style.height = '20px';
            panel.style.width = '80px';
            panel.style.cursor = 'move';

            // 隐藏状态显示
            status.style.display = 'none';

            // 隐藏按钮容器
            buttonContainer.style.display = 'none';

            // 修改标题显示
            title.textContent = '🔧';
            title.style.marginBottom = '0px';
            title.style.textAlign = 'left';
            title.style.paddingLeft = '5px';

            // 创建独立的恢复按钮
            const restoreBtn = document.createElement('button');
            restoreBtn.id = 'restore-btn';
            restoreBtn.textContent = '+';
            restoreBtn.style.cssText = `
                position: absolute;
                right: 5px;
                top: 50%;
                transform: translateY(-50%);
                background: #4CAF50;
                color: white;
                border: none;
                width: 16px;
                height: 16px;
                border-radius: 2px;
                cursor: pointer;
                font-size: 12px;
                font-weight: bold;
                line-height: 1;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
            `;

            // 绑定恢复按钮事件
            restoreBtn.onclick = (e) => {
                e.stopPropagation();
                minimizePanel();
            };

            // 添加恢复按钮到面板
            panel.appendChild(restoreBtn);

            console.log('🔧 面板已最小化，点击右侧+号恢复');
        }
    }

    // 添加键盘快捷键
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+Shift+G 切换自动修复
            if (event.ctrlKey && event.shiftKey && event.key === 'G') {
                event.preventDefault();
                if (isAutoFixing) {
                    stopAutoFix();
                } else {
                    startAutoFix();
                }
            }
            
            // Ctrl+Shift+H 手动修复一次
            if (event.ctrlKey && event.shiftKey && event.key === 'H') {
                event.preventDefault();
                performUltimateFix();
            }
            
            // Ctrl+Shift+M 最小化/恢复面板
            if (event.ctrlKey && event.shiftKey && event.key === 'M') {
                event.preventDefault();
                minimizePanel();
            }
        });
    }

    // 初始化
    function init() {
        console.log('🔧 Gemini紧凑修复器已加载');
        
        // 等待DOM加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    createCompactPanel();
                    addKeyboardShortcuts();
                    console.log('🔧 紧凑修复器面板已创建');
                    console.log('💡 快捷键：Ctrl+Shift+G 自动修复，Ctrl+Shift+H 手动修复，Ctrl+Shift+M 最小化');
                    console.log('🖱️ 拖拽：点击面板空白区域拖拽移动，双击标题重置位置');
                }, 1000);
            });
        } else {
            setTimeout(() => {
                createCompactPanel();
                addKeyboardShortcuts();
                console.log('🔧 紧凑修复器面板已创建');
                console.log('💡 快捷键：Ctrl+Shift+G 自动修复，Ctrl+Shift+H 手动修复，Ctrl+Shift+M 最小化');
                console.log('🖱️ 拖拽：点击面板空白区域拖拽移动，双击标题重置位置');
            }, 1000);
        }
    }

    // 启动
    init();

})();

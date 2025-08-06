// ==UserScript==
// @name         Gemini终极修复器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  全面诊断和修复Gemini双栏布局的所有交互问题
// @author       You
// @match        https://gemini.google.com/*
// @match        https://aistudio.google.com/*
// @match        https://gemini.google.com/app/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let isActive = false;
    let fixPanel = null;

    // 创建终极修复面板
    function createUltimateFixPanel() {
        if (fixPanel) return;

        fixPanel = document.createElement('div');
        fixPanel.id = 'ultimate-fix-panel';
        fixPanel.style.cssText = `
            position: fixed;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            width: 350px;
            max-height: 80vh;
            background: rgba(0, 0, 0, 0.95);
            color: #00ff00;
            border: 3px solid #00ff00;
            border-radius: 10px;
            padding: 15px;
            font-family: 'Courier New', monospace;
            font-size: 11px;
            z-index: 999999;
            box-shadow: 0 0 30px rgba(0, 255, 0, 0.8);
            overflow-y: auto;
        `;

        // 标题
        const title = document.createElement('div');
        title.textContent = '🚀 Gemini终极修复器';
        title.style.cssText = 'font-size: 16px; font-weight: bold; margin-bottom: 10px; color: #00ff00; text-align: center; text-shadow: 0 0 10px #00ff00;';

        // 按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 5px; margin-bottom: 10px;';

        // 全面诊断按钮
        const diagnoseBtn = document.createElement('button');
        diagnoseBtn.id = 'full-diagnose';
        diagnoseBtn.textContent = '🔍 全面诊断';
        diagnoseBtn.style.cssText = 'background: #0066cc; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer; font-size: 10px; font-weight: bold;';

        // 终极修复按钮
        const ultimateFixBtn = document.createElement('button');
        ultimateFixBtn.id = 'ultimate-fix';
        ultimateFixBtn.textContent = '⚡ 终极修复';
        ultimateFixBtn.style.cssText = 'background: #ff6600; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer; font-size: 10px; font-weight: bold;';

        // 强制交互按钮
        const forceInteractBtn = document.createElement('button');
        forceInteractBtn.id = 'force-interact';
        forceInteractBtn.textContent = '💪 强制交互';
        forceInteractBtn.style.cssText = 'background: #cc0066; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer; font-size: 10px; font-weight: bold;';

        // 重置页面按钮
        const resetBtn = document.createElement('button');
        resetBtn.id = 'reset-page';
        resetBtn.textContent = '🔄 重置页面';
        resetBtn.style.cssText = 'background: #666666; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer; font-size: 10px; font-weight: bold;';

        buttonContainer.appendChild(diagnoseBtn);
        buttonContainer.appendChild(ultimateFixBtn);
        buttonContainer.appendChild(forceInteractBtn);
        buttonContainer.appendChild(resetBtn);

        // 显示区域
        const displayArea = document.createElement('div');
        displayArea.id = 'fix-display';
        displayArea.style.cssText = `
            background: rgba(0, 0, 0, 0.8);
            padding: 10px;
            border-radius: 5px;
            max-height: 400px;
            overflow-y: auto;
            font-size: 9px;
            line-height: 1.3;
            border: 1px solid #00ff00;
            white-space: pre-wrap;
            color: #ffffff;
        `;
        displayArea.textContent = '点击"全面诊断"开始分析问题...';

        fixPanel.appendChild(title);
        fixPanel.appendChild(buttonContainer);
        fixPanel.appendChild(displayArea);

        document.body.appendChild(fixPanel);

        // 绑定事件
        setupUltimateEvents();
    }

    // 设置事件处理
    function setupUltimateEvents() {
        document.getElementById('full-diagnose').onclick = () => {
            performFullDiagnosis();
        };

        document.getElementById('ultimate-fix').onclick = () => {
            performUltimateFix();
        };

        document.getElementById('force-interact').onclick = () => {
            forceInteraction();
        };

        document.getElementById('reset-page').onclick = () => {
            resetPage();
        };
    }

    // 全面诊断
    function performFullDiagnosis() {
        const display = document.getElementById('fix-display');
        let report = '🔍 开始全面诊断...\n\n';

        // 1. 检查chat-app
        const chatApp = document.querySelector('chat-app');
        if (chatApp) {
            const rect = chatApp.getBoundingClientRect();
            const style = window.getComputedStyle(chatApp);
            report += '=== CHAT-APP 状态 ===\n';
            report += `尺寸: ${Math.round(rect.width)}x${Math.round(rect.height)}\n`;
            report += `位置: ${Math.round(rect.left)}, ${Math.round(rect.top)}\n`;
            report += `aria-hidden: ${chatApp.getAttribute('aria-hidden') || 'null'}\n`;
            report += `pointer-events: ${style.pointerEvents}\n`;
            report += `user-select: ${style.userSelect}\n`;
            report += `z-index: ${style.zIndex}\n`;
            report += `position: ${style.position}\n\n`;
        }

        // 2. 检查chat-container
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            const rect = chatContainer.getBoundingClientRect();
            const style = window.getComputedStyle(chatContainer);
            report += '=== CHAT-CONTAINER 状态 ===\n';
            report += `尺寸: ${Math.round(rect.width)}x${Math.round(rect.height)}\n`;
            report += `位置: ${Math.round(rect.left)}, ${Math.round(rect.top)}\n`;
            report += `pointer-events: ${style.pointerEvents}\n`;
            report += `user-select: ${style.userSelect}\n`;
            report += `overflow-y: ${style.overflowY}\n`;
            report += `z-index: ${style.zIndex}\n`;
            report += `可滚动: ${chatContainer.scrollHeight > chatContainer.clientHeight + 5}\n\n`;
        }

        // 3. 检查chat-window-content
        const chatContent = document.querySelector('chat-window-content');
        if (chatContent) {
            const rect = chatContent.getBoundingClientRect();
            const style = window.getComputedStyle(chatContent);
            report += '=== CHAT-WINDOW-CONTENT 状态 ===\n';
            report += `尺寸: ${Math.round(rect.width)}x${Math.round(rect.height)}\n`;
            report += `display: ${style.display}\n`;
            report += `visibility: ${style.visibility}\n`;
            report += `opacity: ${style.opacity}\n`;
            
            if (rect.width === 0 && rect.height === 0) {
                report += '❌ 发现0x0问题！\n';
            }
            report += '\n';
        }

        // 4. 检查遮罩层
        const overlays = document.querySelectorAll('div[style*="position: absolute"], div[style*="position: fixed"]');
        let suspiciousOverlays = 0;
        overlays.forEach(overlay => {
            const rect = overlay.getBoundingClientRect();
            const style = window.getComputedStyle(overlay);
            
            // 检查是否覆盖左侧区域
            if (rect.left < 400 && rect.width > 200 && rect.height > 300 && 
                style.zIndex > 1000 && overlay.id !== 'ultimate-fix-panel') {
                suspiciousOverlays++;
            }
        });
        report += `=== 遮罩层检查 ===\n`;
        report += `可疑遮罩层: ${suspiciousOverlays}个\n\n`;

        // 5. 检查PDF查看器
        const pdfViewer = document.querySelector('.drive-viewer');
        if (pdfViewer) {
            const rect = pdfViewer.getBoundingClientRect();
            const style = window.getComputedStyle(pdfViewer);
            report += '=== PDF查看器状态 ===\n';
            report += `尺寸: ${Math.round(rect.width)}x${Math.round(rect.height)}\n`;
            report += `位置: ${Math.round(rect.left)}, ${Math.round(rect.top)}\n`;
            report += `z-index: ${style.zIndex}\n`;
            report += `display: ${style.display}\n\n`;
        }

        // 6. 检查事件监听器
        report += '=== 事件监听器检查 ===\n';
        if (chatContainer) {
            const events = getEventListeners ? getEventListeners(chatContainer) : {};
            report += `chat-container事件: ${Object.keys(events).join(', ') || '无法检测'}\n`;
        }

        // 7. 布局类型
        const isDoubleColumn = document.querySelector('.chat-container') && 
                              document.querySelector('[class*="drive"], [class*="viewer"]');
        report += `\n=== 布局信息 ===\n`;
        report += `布局类型: ${isDoubleColumn ? '双栏布局' : '单栏布局'}\n`;
        report += `页面URL: ${window.location.href}\n`;

        display.textContent = report;
        console.log('🔍 全面诊断完成');
        console.log(report);
    }

    // 终极修复
    function performUltimateFix() {
        const display = document.getElementById('fix-display');
        let report = '⚡ 开始终极修复...\n\n';
        let fixedCount = 0;

        // 1. 修复chat-app
        const chatApp = document.querySelector('chat-app');
        if (chatApp) {
            if (chatApp.getAttribute('aria-hidden') === 'true') {
                chatApp.removeAttribute('aria-hidden');
                report += '✅ 修复了chat-app的aria-hidden\n';
                fixedCount++;
            }
            
            // 强制设置样式
            chatApp.style.setProperty('pointer-events', 'auto', 'important');
            chatApp.style.setProperty('user-select', 'text', 'important');
            report += '✅ 强化了chat-app的交互属性\n';
            fixedCount++;
        }

        // 2. 修复chat-container
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.setProperty('pointer-events', 'auto', 'important');
            chatContainer.style.setProperty('user-select', 'text', 'important');
            chatContainer.style.setProperty('overflow-y', 'auto', 'important');
            chatContainer.style.setProperty('z-index', '10', 'important');
            report += '✅ 强化了chat-container的所有交互属性\n';
            fixedCount++;
        }

        // 3. 修复chat-window-content
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
                report += '✅ 修复了chat-window-content的0x0问题\n';
                fixedCount++;
            }
        }

        // 4. 移除可疑遮罩层
        const overlays = document.querySelectorAll('div[style*="position: absolute"], div[style*="position: fixed"]');
        let removedOverlays = 0;
        overlays.forEach(overlay => {
            const rect = overlay.getBoundingClientRect();
            const style = window.getComputedStyle(overlay);
            
            // 如果是覆盖左侧区域的高z-index透明层
            if (rect.left < 400 && rect.width > 200 && rect.height > 300 && 
                style.zIndex > 1000 && 
                overlay.id !== 'ultimate-fix-panel' &&
                (style.backgroundColor === 'transparent' || style.backgroundColor === 'rgba(0, 0, 0, 0)')) {
                
                overlay.style.setProperty('display', 'none', 'important');
                removedOverlays++;
            }
        });
        if (removedOverlays > 0) {
            report += `✅ 移除了${removedOverlays}个可疑遮罩层\n`;
            fixedCount++;
        }

        // 5. 强制启用所有左侧容器的交互
        const leftContainers = document.querySelectorAll('[class*="chat"], [class*="conversation"], [class*="message"]');
        leftContainers.forEach((container, index) => {
            const rect = container.getBoundingClientRect();
            if (rect.left < 400 && rect.width > 100) {
                container.style.setProperty('pointer-events', 'auto', 'important');
                container.style.setProperty('user-select', 'text', 'important');
                container.style.setProperty('cursor', 'text', 'important');
            }
        });
        report += `✅ 强化了${leftContainers.length}个左侧容器的交互\n`;
        fixedCount++;

        report += `\n⚡ 终极修复完成！共修复${fixedCount}个问题\n`;
        display.textContent = report;
        console.log('⚡ 终极修复完成');
    }

    // 强制交互
    function forceInteraction() {
        const display = document.getElementById('fix-display');
        let report = '💪 强制启用交互...\n\n';

        // 移除所有可能阻止交互的属性
        const allElements = document.querySelectorAll('*');
        let modifiedCount = 0;
        
        allElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            
            // 如果元素在左侧区域
            if (rect.left < 400 && rect.width > 50 && rect.height > 20) {
                const style = window.getComputedStyle(element);
                
                if (style.pointerEvents === 'none') {
                    element.style.setProperty('pointer-events', 'auto', 'important');
                    modifiedCount++;
                }
                
                if (style.userSelect === 'none') {
                    element.style.setProperty('user-select', 'text', 'important');
                    modifiedCount++;
                }
                
                if (element.getAttribute('aria-hidden') === 'true') {
                    element.removeAttribute('aria-hidden');
                    modifiedCount++;
                }
            }
        });

        report += `💪 强制修改了${modifiedCount}个元素的交互属性\n`;
        report += '💪 所有左侧元素现在应该可以交互了！\n';
        
        display.textContent = report;
        console.log('💪 强制交互完成');
    }

    // 重置页面
    function resetPage() {
        const display = document.getElementById('fix-display');
        display.textContent = '🔄 正在重置页面...';
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    // 初始化
    function init() {
        console.log('🚀 Gemini终极修复器已加载');
        
        // 等待DOM加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(createUltimateFixPanel, 2000);
            });
        } else {
            setTimeout(createUltimateFixPanel, 2000);
        }

        // 添加键盘快捷键
        document.addEventListener('keydown', (event) => {
            // Ctrl+Shift+U 打开终极修复器
            if (event.ctrlKey && event.shiftKey && event.key === 'U') {
                event.preventDefault();
                if (fixPanel) {
                    fixPanel.style.display = fixPanel.style.display === 'none' ? 'block' : 'none';
                }
            }
        });
    }

    // 启动
    init();

})();

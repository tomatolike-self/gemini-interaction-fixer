// ==UserScript==
// @name         Gemini简单修复器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  简单直接的Gemini双栏布局修复工具
// @author       You
// @match        https://gemini.google.com/*
// @match        https://aistudio.google.com/*
// @match        https://gemini.google.com/app/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let isAutoFixing = false;
    let fixInterval = null;

    // 创建简单的修复按钮
    function createSimpleFixButton() {
        const button = document.createElement('button');
        button.id = 'simple-fix-btn';
        button.textContent = '🔧 修复交互';
        button.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 999999;
            background: #ff4444;
            color: white;
            border: 2px solid #ffffff;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(255, 68, 68, 0.4);
            transition: all 0.3s ease;
        `;
        
        button.onmouseover = () => {
            button.style.background = '#ff6666';
            button.style.transform = 'scale(1.05)';
        };
        
        button.onmouseout = () => {
            button.style.background = '#ff4444';
            button.style.transform = 'scale(1)';
        };
        
        button.onclick = () => {
            if (isAutoFixing) {
                stopAutoFix();
            } else {
                startAutoFix();
            }
        };
        
        document.body.appendChild(button);
        console.log('🔧 简单修复器按钮已创建');
    }

    // 开始自动修复
    function startAutoFix() {
        isAutoFixing = true;
        const button = document.getElementById('simple-fix-btn');
        button.textContent = '⏹️ 停止修复';
        button.style.background = '#4CAF50';
        
        console.log('🟢 开始自动修复模式');
        
        // 立即执行一次修复
        performFix();
        
        // 每秒检查并修复
        fixInterval = setInterval(() => {
            performFix();
        }, 1000);
    }

    // 停止自动修复
    function stopAutoFix() {
        isAutoFixing = false;
        const button = document.getElementById('simple-fix-btn');
        button.textContent = '🔧 修复交互';
        button.style.background = '#ff4444';
        
        if (fixInterval) {
            clearInterval(fixInterval);
            fixInterval = null;
        }
        
        console.log('🔴 停止自动修复模式');
    }

    // 执行修复
    function performFix() {
        let fixedCount = 0;
        
        // 1. 修复aria-hidden问题
        const chatApp = document.querySelector('chat-app');
        if (chatApp && chatApp.getAttribute('aria-hidden') === 'true') {
            chatApp.removeAttribute('aria-hidden');
            console.log('🔧 修复了chat-app的aria-hidden属性');
            fixedCount++;
        }
        
        // 2. 修复chat-container的交互
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            const style = window.getComputedStyle(chatContainer);
            if (style.pointerEvents === 'none') {
                chatContainer.style.setProperty('pointer-events', 'auto', 'important');
                console.log('🔧 修复了chat-container的pointer-events');
                fixedCount++;
            }
            if (style.userSelect === 'none') {
                chatContainer.style.setProperty('user-select', 'text', 'important');
                console.log('🔧 修复了chat-container的user-select');
                fixedCount++;
            }
        }
        
        // 3. 修复chat-window-content的0x0问题
        const chatContent = document.querySelector('chat-window-content');
        if (chatContent) {
            const rect = chatContent.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) {
                chatContent.style.setProperty('display', 'flex', 'important');
                chatContent.style.setProperty('flex-direction', 'column', 'important');
                chatContent.style.setProperty('flex-grow', '1', 'important');
                chatContent.style.setProperty('height', 'auto', 'important');
                chatContent.style.setProperty('min-height', '400px', 'important');
                chatContent.style.setProperty('overflow-y', 'auto', 'important');
                console.log('🔧 修复了chat-window-content的0x0问题');
                fixedCount++;
            }
        }
        
        // 4. 确保左侧容器可滚动
        const leftContainers = document.querySelectorAll('.chat-container, [class*="chat"], [class*="conversation"]');
        leftContainers.forEach((container, index) => {
            const rect = container.getBoundingClientRect();
            if (rect.left < 400 && rect.width > 200 && rect.height > 300) {
                const style = window.getComputedStyle(container);
                if (style.overflowY !== 'auto' && container.scrollHeight > container.clientHeight + 10) {
                    container.style.setProperty('overflow-y', 'auto', 'important');
                    console.log(`🔧 修复了左侧容器${index}的滚动`);
                    fixedCount++;
                }
            }
        });
        
        // 5. 移除可能的遮罩层
        const overlays = document.querySelectorAll('div[style*="position: absolute"], div[style*="position: fixed"]');
        overlays.forEach(overlay => {
            const rect = overlay.getBoundingClientRect();
            const style = window.getComputedStyle(overlay);
            
            // 如果是覆盖左侧区域的透明遮罩
            if (rect.left < 400 && rect.width > 200 && rect.height > 300 &&
                (style.backgroundColor === 'transparent' || style.backgroundColor === 'rgba(0, 0, 0, 0)') &&
                style.pointerEvents === 'none') {
                
                overlay.style.setProperty('display', 'none', 'important');
                console.log('🔧 移除了可能的遮罩层');
                fixedCount++;
            }
        });
        
        if (fixedCount > 0 && isAutoFixing) {
            console.log(`✅ 本次修复了 ${fixedCount} 个问题`);
        }
        
        return fixedCount;
    }

    // 检测当前问题
    function detectIssues() {
        console.log('🔍 开始检测问题...');
        
        const chatApp = document.querySelector('chat-app');
        if (chatApp) {
            const ariaHidden = chatApp.getAttribute('aria-hidden');
            console.log(`chat-app aria-hidden: ${ariaHidden || 'null'}`);
            if (ariaHidden === 'true') {
                console.log('🚨 发现ARIA问题：chat-app被设置为aria-hidden="true"');
            }
        }
        
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            const rect = chatContainer.getBoundingClientRect();
            const style = window.getComputedStyle(chatContainer);
            console.log(`chat-container: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
            console.log(`pointer-events: ${style.pointerEvents}, user-select: ${style.userSelect}`);
            
            if (style.pointerEvents === 'none') {
                console.log('🚨 发现交互问题：pointer-events被禁用');
            }
            if (style.userSelect === 'none') {
                console.log('🚨 发现选择问题：user-select被禁用');
            }
        }
        
        const chatContent = document.querySelector('chat-window-content');
        if (chatContent) {
            const rect = chatContent.getBoundingClientRect();
            console.log(`chat-window-content: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
            if (rect.width === 0 && rect.height === 0) {
                console.log('🚨 发现尺寸问题：chat-window-content为0x0');
            }
        }
        
        const isDoubleColumn = document.querySelector('.chat-container') && 
                              document.querySelector('[class*="drive"], [class*="viewer"]');
        console.log(`布局类型: ${isDoubleColumn ? '双栏布局' : '单栏布局'}`);
        
        console.log('🔍 问题检测完成');
    }

    // 添加键盘快捷键
    function addKeyboardShortcut() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+Shift+F 触发修复
            if (event.ctrlKey && event.shiftKey && event.key === 'F') {
                event.preventDefault();
                console.log('⌨️ 键盘快捷键触发修复');
                performFix();
            }
        });
        console.log('⌨️ 键盘快捷键已设置：Ctrl+Shift+F');
    }

    // 初始化
    function init() {
        console.log('🔧 Gemini简单修复器已加载');
        
        // 等待页面加载完成
        setTimeout(() => {
            createSimpleFixButton();
            detectIssues();
            addKeyboardShortcut();
            
            // 提示用户
            console.log('💡 使用方法：');
            console.log('   - 点击右上角红色按钮开始/停止自动修复');
            console.log('   - 或按 Ctrl+Shift+F 手动修复一次');
            console.log('   - 查看控制台获取详细信息');
        }, 2000);
    }

    // 启动
    init();

})();

// ==UserScript==
// @name         Gemini属性保护器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  防止Gemini重新设置aria-hidden属性，彻底解决交互问题
// @author       You
// @match        https://gemini.google.com/*
// @match        https://aistudio.google.com/*
// @match        https://gemini.google.com/app/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let isProtecting = false;
    let protectorPanel = null;

    // 劫持setAttribute方法
    function hijackSetAttribute() {
        const originalSetAttribute = Element.prototype.setAttribute;
        
        Element.prototype.setAttribute = function(name, value) {
            // 如果是chat-app元素试图设置aria-hidden为true，阻止它
            if (isProtecting && 
                this.tagName === 'CHAT-APP' && 
                name === 'aria-hidden' && 
                value === 'true') {
                
                console.log('🛡️ 阻止了chat-app的aria-hidden设置');
                return; // 直接返回，不执行设置
            }
            
            // 其他情况正常执行
            return originalSetAttribute.call(this, name, value);
        };
        
        console.log('🛡️ setAttribute劫持已启动');
    }

    // 劫持removeAttribute和其他可能的方法
    function hijackOtherMethods() {
        // 保护removeAttribute（防止我们的修复被移除）
        const originalRemoveAttribute = Element.prototype.removeAttribute;
        
        Element.prototype.removeAttribute = function(name) {
            // 正常执行，我们不阻止移除aria-hidden
            return originalRemoveAttribute.call(this, name);
        };
    }

    // 创建保护器面板
    function createProtectorPanel() {
        if (protectorPanel) return;

        protectorPanel = document.createElement('div');
        protectorPanel.id = 'attribute-protector';
        protectorPanel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            width: 280px;
            background: rgba(0, 100, 0, 0.95);
            color: white;
            border: 2px solid #00ff00;
            border-radius: 8px;
            padding: 12px;
            font-family: monospace;
            font-size: 11px;
            z-index: 999999;
            box-shadow: 0 0 15px rgba(0, 255, 0, 0.5);
        `;

        // 标题
        const title = document.createElement('div');
        title.textContent = '🛡️ 属性保护器';
        title.style.cssText = 'font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #00ff00;';

        // 状态显示
        const status = document.createElement('div');
        status.id = 'protector-status';
        status.textContent = '待机中 - 点击启动保护';
        status.style.cssText = 'margin-bottom: 8px; padding: 4px; background: rgba(0, 0, 0, 0.3); border-radius: 3px;';

        // 按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; gap: 5px;';

        // 启动保护按钮
        const startBtn = document.createElement('button');
        startBtn.id = 'start-protection';
        startBtn.textContent = '🛡️ 启动保护';
        startBtn.style.cssText = 'background: #00aa00; color: white; border: none; padding: 6px 8px; border-radius: 3px; cursor: pointer; font-size: 10px; flex: 1;';

        // 手动修复按钮
        const fixBtn = document.createElement('button');
        fixBtn.id = 'manual-fix';
        fixBtn.textContent = '🔧 修复';
        fixBtn.style.cssText = 'background: #ff6600; color: white; border: none; padding: 6px 8px; border-radius: 3px; cursor: pointer; font-size: 10px; flex: 1;';

        // 关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.id = 'close-protector';
        closeBtn.textContent = '❌';
        closeBtn.style.cssText = 'background: #aa0000; color: white; border: none; padding: 6px 8px; border-radius: 3px; cursor: pointer; font-size: 10px; width: 25px;';

        buttonContainer.appendChild(startBtn);
        buttonContainer.appendChild(fixBtn);
        buttonContainer.appendChild(closeBtn);

        protectorPanel.appendChild(title);
        protectorPanel.appendChild(status);
        protectorPanel.appendChild(buttonContainer);

        document.body.appendChild(protectorPanel);

        // 绑定事件
        setupProtectorEvents();
    }

    // 设置事件处理
    function setupProtectorEvents() {
        document.getElementById('start-protection').onclick = () => {
            if (isProtecting) {
                stopProtection();
            } else {
                startProtection();
            }
        };

        document.getElementById('manual-fix').onclick = () => {
            manualFix();
        };

        document.getElementById('close-protector').onclick = () => {
            protectorPanel.style.display = 'none';
        };
    }

    // 启动保护
    function startProtection() {
        isProtecting = true;
        updateStatus('🛡️ 保护已启动 - 正在阻止aria-hidden设置');
        
        const startBtn = document.getElementById('start-protection');
        startBtn.textContent = '⏹️ 停止保护';
        startBtn.style.background = '#aa0000';
        
        // 立即执行一次修复
        manualFix();
        
        // 定期检查和修复
        const protectionInterval = setInterval(() => {
            if (!isProtecting) {
                clearInterval(protectionInterval);
                return;
            }
            
            const chatApp = document.querySelector('chat-app');
            if (chatApp && chatApp.getAttribute('aria-hidden') === 'true') {
                console.log('🛡️ 检测到aria-hidden被重新设置，立即修复');
                chatApp.removeAttribute('aria-hidden');
                updateStatus('🛡️ 已阻止aria-hidden重新设置');
            }
        }, 500);
        
        console.log('🛡️ 属性保护已启动');
    }

    // 停止保护
    function stopProtection() {
        isProtecting = false;
        updateStatus('⏹️ 保护已停止');
        
        const startBtn = document.getElementById('start-protection');
        startBtn.textContent = '🛡️ 启动保护';
        startBtn.style.background = '#00aa00';
        
        console.log('⏹️ 属性保护已停止');
    }

    // 手动修复
    function manualFix() {
        console.log('🔧 执行手动修复...');
        let fixedCount = 0;
        
        // 1. 修复chat-app的aria-hidden
        const chatApp = document.querySelector('chat-app');
        if (chatApp) {
            if (chatApp.getAttribute('aria-hidden') === 'true') {
                chatApp.removeAttribute('aria-hidden');
                console.log('🔧 修复了chat-app的aria-hidden');
                fixedCount++;
            }
        }
        
        // 2. 修复chat-window-content的0x0问题
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
        
        // 3. 确保chat-container可交互
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.setProperty('pointer-events', 'auto', 'important');
            chatContainer.style.setProperty('user-select', 'text', 'important');
            console.log('🔧 确保了chat-container的交互性');
            fixedCount++;
        }
        
        updateStatus(`🔧 手动修复完成，修复了 ${fixedCount} 个问题`);
        
        // 3秒后恢复状态显示
        setTimeout(() => {
            if (isProtecting) {
                updateStatus('🛡️ 保护运行中 - 正在阻止aria-hidden设置');
            } else {
                updateStatus('待机中 - 点击启动保护');
            }
        }, 3000);
    }

    // 更新状态显示
    function updateStatus(message) {
        const status = document.getElementById('protector-status');
        if (status) {
            status.textContent = message;
        }
    }

    // 添加键盘快捷键
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+Shift+P 启动/停止保护
            if (event.ctrlKey && event.shiftKey && event.key === 'P') {
                event.preventDefault();
                if (isProtecting) {
                    stopProtection();
                } else {
                    startProtection();
                }
            }
            
            // Ctrl+Shift+R 手动修复
            if (event.ctrlKey && event.shiftKey && event.key === 'R') {
                event.preventDefault();
                manualFix();
            }
        });
    }

    // 初始化
    function init() {
        console.log('🛡️ Gemini属性保护器已加载');
        
        // 立即劫持方法
        hijackSetAttribute();
        hijackOtherMethods();
        
        // 等待DOM加载
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    createProtectorPanel();
                    addKeyboardShortcuts();
                    console.log('🛡️ 保护器面板已创建');
                    console.log('💡 快捷键：Ctrl+Shift+P 启动保护，Ctrl+Shift+R 手动修复');
                }, 1000);
            });
        } else {
            setTimeout(() => {
                createProtectorPanel();
                addKeyboardShortcuts();
                console.log('🛡️ 保护器面板已创建');
                console.log('💡 快捷键：Ctrl+Shift+P 启动保护，Ctrl+Shift+R 手动修复');
            }, 1000);
        }
    }

    // 立即启动
    init();

})();

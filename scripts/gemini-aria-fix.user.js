// ==UserScript==
// @name         Gemini ARIA修复器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  修复Gemini双栏布局下的aria-hidden问题，恢复左侧对话区域的交互
// @author       You
// @match        https://gemini.google.com/*
// @match        https://aistudio.google.com/*
// @match        https://gemini.google.com/app/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    let isMonitoring = false;
    let fixPanel = null;

    // 创建修复面板
    function createFixPanel() {
        if (fixPanel) return;

        fixPanel = document.createElement('div');
        fixPanel.id = 'aria-fix-panel';
        fixPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            width: 300px;
            background: rgba(255, 0, 0, 0.9);
            color: white;
            border: 2px solid #ff0000;
            border-radius: 8px;
            padding: 15px;
            font-family: monospace;
            font-size: 12px;
            z-index: 999999;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
        `;

        // 创建标题
        const title = document.createElement('div');
        title.textContent = '🚨 ARIA修复器';
        title.style.cssText = 'font-size: 14px; font-weight: bold; margin-bottom: 10px; color: #ffff00;';

        // 创建描述
        const description = document.createElement('div');
        description.textContent = '检测到aria-hidden问题导致左侧对话区域无法交互';
        description.style.cssText = 'margin-bottom: 10px; line-height: 1.4;';

        // 创建按钮容器
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = 'display: flex; gap: 5px; margin-bottom: 10px;';

        // 创建开始监控按钮
        const startBtn = document.createElement('button');
        startBtn.id = 'start-monitoring';
        startBtn.textContent = '🟢 开始监控';
        startBtn.style.cssText = 'background: #4CAF50; color: white; border: none; padding: 5px 8px; border-radius: 3px; cursor: pointer; font-size: 11px; flex: 1;';

        // 创建立即修复按钮
        const manualBtn = document.createElement('button');
        manualBtn.id = 'manual-fix';
        manualBtn.textContent = '🔧 立即修复';
        manualBtn.style.cssText = 'background: #FF9800; color: white; border: none; padding: 5px 8px; border-radius: 3px; cursor: pointer; font-size: 11px; flex: 1;';

        // 创建关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.id = 'close-panel';
        closeBtn.textContent = '❌';
        closeBtn.style.cssText = 'background: #f44336; color: white; border: none; padding: 5px 8px; border-radius: 3px; cursor: pointer; font-size: 11px; width: 30px;';

        buttonContainer.appendChild(startBtn);
        buttonContainer.appendChild(manualBtn);
        buttonContainer.appendChild(closeBtn);

        // 创建状态显示区域
        const statusDisplay = document.createElement('div');
        statusDisplay.id = 'status-display';
        statusDisplay.textContent = '就绪状态 - 等待开始监控';
        statusDisplay.style.cssText = 'background: rgba(0, 0, 0, 0.3); padding: 5px; border-radius: 3px; font-size: 10px; max-height: 100px; overflow-y: auto;';

        fixPanel.appendChild(title);
        fixPanel.appendChild(description);
        fixPanel.appendChild(buttonContainer);
        fixPanel.appendChild(statusDisplay);

        document.body.appendChild(fixPanel);

        // 绑定事件
        document.getElementById('start-monitoring').onclick = () => {
            if (isMonitoring) {
                stopMonitoring();
            } else {
                startMonitoring();
            }
        };

        document.getElementById('manual-fix').onclick = () => {
            fixAriaHidden();
        };

        document.getElementById('close-panel').onclick = () => {
            fixPanel.style.display = 'none';
        };
    }

    // 开始监控
    function startMonitoring() {
        isMonitoring = true;
        updateStatus('🟢 开始监控aria-hidden属性...');
        
        document.getElementById('start-monitoring').textContent = '🔴 停止监控';
        document.getElementById('start-monitoring').style.background = '#f44336';
        
        // 立即检查一次
        checkAndFixAriaHidden();
        
        // 设置定期检查
        const monitorInterval = setInterval(() => {
            if (!isMonitoring) {
                clearInterval(monitorInterval);
                return;
            }
            checkAndFixAriaHidden();
        }, 1000);
        
        // 监听DOM变化
        const observer = new MutationObserver((mutations) => {
            if (!isMonitoring) return;
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && 
                    mutation.attributeName === 'aria-hidden' &&
                    mutation.target.tagName === 'CHAT-APP') {
                    
                    updateStatus(`🚨 检测到chat-app的aria-hidden被修改为: ${mutation.target.getAttribute('aria-hidden')}`);
                    
                    if (mutation.target.getAttribute('aria-hidden') === 'true') {
                        updateStatus('⚡ 立即修复aria-hidden问题...');
                        fixAriaHidden();
                    }
                }
            });
        });
        
        const chatApp = document.querySelector('chat-app');
        if (chatApp) {
            observer.observe(chatApp, {
                attributes: true,
                attributeFilter: ['aria-hidden']
            });
        }
    }

    // 停止监控
    function stopMonitoring() {
        isMonitoring = false;
        updateStatus('🔴 停止监控');
        
        document.getElementById('start-monitoring').textContent = '🟢 开始监控';
        document.getElementById('start-monitoring').style.background = '#4CAF50';
    }

    // 检查并修复aria-hidden
    function checkAndFixAriaHidden() {
        const chatApp = document.querySelector('chat-app');
        if (!chatApp) {
            updateStatus('❌ 未找到chat-app元素');
            return;
        }
        
        const ariaHidden = chatApp.getAttribute('aria-hidden');
        
        if (ariaHidden === 'true') {
            updateStatus('🚨 发现问题：chat-app被设置为aria-hidden="true"');
            fixAriaHidden();
        } else {
            updateStatus(`✅ 正常：aria-hidden="${ariaHidden || 'null'}"`);
        }
    }

    // 修复aria-hidden问题
    function fixAriaHidden() {
        const chatApp = document.querySelector('chat-app');
        if (!chatApp) {
            updateStatus('❌ 修复失败：未找到chat-app元素');
            return;
        }
        
        const beforeValue = chatApp.getAttribute('aria-hidden');
        
        // 移除或设置为false
        chatApp.removeAttribute('aria-hidden');
        // 或者显式设置为false
        // chatApp.setAttribute('aria-hidden', 'false');
        
        const afterValue = chatApp.getAttribute('aria-hidden');
        
        updateStatus(`🔧 修复完成：${beforeValue} → ${afterValue || 'null'}`);
        updateStatus('✅ 左侧对话区域应该可以交互了');
        
        // 额外检查：确保左侧容器也没有被阻止
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            chatContainer.style.setProperty('pointer-events', 'auto', 'important');
            chatContainer.style.setProperty('user-select', 'text', 'important');
            updateStatus('🔧 同时修复了chat-container的交互属性');
        }
        
        // 检查chat-window-content
        const chatContent = document.querySelector('chat-window-content');
        if (chatContent) {
            const rect = chatContent.getBoundingClientRect();
            if (rect.width === 0 && rect.height === 0) {
                updateStatus('⚠️ 发现chat-window-content尺寸为0x0，尝试修复...');
                chatContent.style.setProperty('display', 'flex', 'important');
                chatContent.style.setProperty('flex-direction', 'column', 'important');
                chatContent.style.setProperty('flex-grow', '1', 'important');
                chatContent.style.setProperty('height', 'auto', 'important');
                chatContent.style.setProperty('min-height', '400px', 'important');
                updateStatus('🔧 已修复chat-window-content的尺寸问题');
            }
        }
        
        console.log('🔧 Gemini ARIA修复完成');
    }

    // 更新状态显示
    function updateStatus(message) {
        const statusDisplay = document.getElementById('status-display');
        if (statusDisplay) {
            const timestamp = new Date().toLocaleTimeString();
            const statusLine = document.createElement('div');
            statusLine.textContent = `[${timestamp}] ${message}`;
            statusDisplay.appendChild(statusLine);
            statusDisplay.scrollTop = statusDisplay.scrollHeight;
        }
        console.log(`[ARIA修复器] ${message}`);
    }

    // 检测当前问题
    function detectCurrentIssues() {
        updateStatus('🔍 开始检测当前问题...');
        
        const chatApp = document.querySelector('chat-app');
        if (chatApp) {
            const ariaHidden = chatApp.getAttribute('aria-hidden');
            updateStatus(`chat-app aria-hidden: ${ariaHidden || 'null'}`);
            
            if (ariaHidden === 'true') {
                updateStatus('🚨 发现问题：这就是导致左侧无法交互的原因！');
            }
        }
        
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            const rect = chatContainer.getBoundingClientRect();
            const style = window.getComputedStyle(chatContainer);
            updateStatus(`chat-container: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
            updateStatus(`pointer-events: ${style.pointerEvents}, user-select: ${style.userSelect}`);
        }
        
        const chatContent = document.querySelector('chat-window-content');
        if (chatContent) {
            const rect = chatContent.getBoundingClientRect();
            updateStatus(`chat-window-content: ${Math.round(rect.width)}x${Math.round(rect.height)}`);
            
            if (rect.width === 0 && rect.height === 0) {
                updateStatus('🚨 发现0x0问题！');
            }
        }
        
        // 检查是否是双栏布局
        const isDoubleColumn = document.querySelector('.chat-container') && 
                              document.querySelector('[class*="drive"], [class*="viewer"]');
        updateStatus(`布局: ${isDoubleColumn ? '双栏布局' : '单栏布局'}`);
        
        if (isDoubleColumn) {
            updateStatus('🎯 双栏布局已激活，这是问题出现的条件');
        }
    }

    // 初始化
    function init() {
        console.log('🚨 Gemini ARIA修复器已加载');
        
        setTimeout(() => {
            createFixPanel();
            detectCurrentIssues();
        }, 2000);
    }

    // 启动
    init();

})();

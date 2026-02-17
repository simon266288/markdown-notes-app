from playwright.sync_api import sync_playwright
import os

SCREENSHOT_DIR = 'e:/learn/markdown-notes-app/screenshots'
os.makedirs(SCREENSHOT_DIR, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.set_viewport_size({'width': 1280, 'height': 800})
    
    print('1. Navigating to markdown-notes-app...')
    page.goto('http://localhost:5174/')
    page.wait_for_load_state('networkidle')
    
    print('2. Taking initial screenshot...')
    page.screenshot(path=f'{SCREENSHOT_DIR}/01_initial.png', full_page=True)
    
    print('3. Getting page content for debugging...')
    html = page.content()
    buttons = page.locator('button').all()
    print(f'Found {len(buttons)} buttons')
    for i, btn in enumerate(buttons):
        try:
            text = btn.inner_text(timeout=1000)
            print(f'  Button {i}: {text[:50]}...' if len(text) > 50 else f'  Button {i}: {text}')
        except:
            print(f'  Button {i}: (no text)')
    
    print('4. Testing theme toggle...')
    theme_btn = page.locator('button').filter(has=page.locator('svg.lucide')).first
    if theme_btn.count() > 0:
        theme_btn.click()
        page.wait_for_timeout(500)
        page.screenshot(path=f'{SCREENSHOT_DIR}/02_dark_theme.png', full_page=True)
        theme_btn.click()
        page.wait_for_timeout(500)
    
    print('5. Testing create new note...')
    new_btn = page.get_by_role('button', name='新建')
    if new_btn.count() == 0:
        new_btn = page.locator('button').filter(has_text='新建')
    if new_btn.count() == 0:
        for btn in buttons:
            try:
                if '新建' in btn.inner_text(timeout=500):
                    new_btn = btn
                    break
            except:
                pass
    
    if new_btn and new_btn.count() > 0:
        new_btn.click()
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(1000)
        page.screenshot(path=f'{SCREENSHOT_DIR}/03_editor_page.png', full_page=True)
        
        print('6. Testing markdown editor...')
        title_input = page.locator('input[type="text"]').first
        if title_input.count() > 0:
            title_input.fill('测试笔记标题')
            page.wait_for_timeout(300)
        
        content_area = page.locator('textarea').first
        if content_area.count() > 0:
            content_area.fill('# 测试标题\n\n这是一个**测试**笔记。\n\n- 列表项1\n- 列表项2')
            page.wait_for_timeout(500)
        
        page.screenshot(path=f'{SCREENSHOT_DIR}/04_editing.png', full_page=True)
        
        print('7. Testing preview...')
        preview_tab = page.get_by_role('button', name='预览')
        if preview_tab.count() > 0:
            preview_tab.click()
            page.wait_for_timeout(500)
            page.screenshot(path=f'{SCREENSHOT_DIR}/05_preview.png', full_page=True)
        
        print('8. Going back to notes list...')
        back_btn = page.get_by_role('button', name='返回')
        if back_btn.count() > 0:
            back_btn.click()
            page.wait_for_load_state('networkidle')
            page.screenshot(path=f'{SCREENSHOT_DIR}/06_notes_list.png', full_page=True)
        
        print('9. Testing search...')
        search_input = page.locator('input[type="search"]').first
        if search_input.count() > 0:
            search_input.fill('测试')
            page.wait_for_timeout(500)
            page.screenshot(path=f'{SCREENSHOT_DIR}/07_search.png', full_page=True)
    else:
        print('Could not find "新建" button, taking current state screenshot')
        page.screenshot(path=f'{SCREENSHOT_DIR}/03_no_new_button.png', full_page=True)
    
    print('\n=== Test Results ===')
    print(f'Screenshots saved to: {SCREENSHOT_DIR}')
    print(f'Current URL: {page.url}')
    
    browser.close()
    print('\nAll tests completed!')

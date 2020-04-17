const { app, BrowserWindow, Menu, globalShortcut, webContents } = require('electron');
let win; // (BrowserWindow) MainWindow insctance
const isMac = process.platform === 'darwin'; // MacOS인가?
let isAlwaysOnTop = true;

// 메뉴 설정
let template = [
    { 
        label: "File",
        submenu: [
            { 
                label: 'About       ',
                click: async () => {
                    const { shell } = require('electron');
                    await shell.openExternal('https://github.com/denlyou/electron-utube-player');
                }
            },
            { type: 'separator' },
            isMac ? { role: "close" } : { role: "quit" }
        ],
    },
    { 
        label: "Navigation",
        submenu: [
            { 
                label: 'Back',
                accelerator: 'Backspace',
                click: () => {
                    if(win.webContents.canGoBack()) win.webContents.goBack();
                },
            },
            { 
                label: 'Forward     ',
                accelerator: 'Shift+Backspace',
                click: () => {
                    if(win.webContents.canGoForward()) win.webContents.goForward();
                },
            },
        ],
    },
    {
        label: "Window",
        submenu: [
            {
                label: 'Alawys on top       ',
                accelerator: '`',
                type: 'checkbox',
                checked: isAlwaysOnTop,
                click: function() {
                    isAlwaysOnTop = !isAlwaysOnTop;
                    win.setAlwaysOnTop(isAlwaysOnTop);
                    // this.checked = isAlwaysOnTop;
                },
            },
            { type: 'separator' },
            { label: '490 x 640     ', accelerator: '1', click: async () => win.setSize(490, 640), },
            { label: '1024 x 768', accelerator: '2', click: async () => win.setSize(1024, 768), },
            { type: 'separator' },
            { label: '100%', accelerator: '0', click: () => win.setOpacity(1), },
            { label: '90%', accelerator: '9', click: () => win.setOpacity(0.9), },
            { label: '80%', accelerator: '8', click: () => win.setOpacity(0.8), },
            { label: '70%', accelerator: '7', click: () => win.setOpacity(0.7), },
            { label: '60%', accelerator: '6', click: () => win.setOpacity(0.6), },
        ],
    },
    { 
        label: "Bookmark",
        submenu: [
            { 
                label: 'Youtube         ', accelerator: 'Home',
                click: () => win.loadURL('https://www.youtube.com'),
            },
            { 
                label: 'Twitch',
                click: () => win.loadURL('https://www.twitch.tv'),
            },
            { 
                label: 'AfreecaTV',
                click: () => win.loadURL('http://afreecatv.com'),
            },
        ],
    },
];
Menu.setApplicationMenu(Menu.buildFromTemplate(template));

// 브라우저 창을 생성합니다.
app.whenReady().then(function(){
    win = new BrowserWindow({
        width: 1024,
        height: 768,
        // transparent: true,
        // titleBarStyle: 'customButtonsOnHover',
        // frame: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: false,
        },
    });
    // (혹시나) 개발자 도구를 열었음을 감지하면 바로 닫기
    win.webContents.on("devtools-opened", () => win.webContents.closeDevTools() );
    
    // 초기 페이지는 유튜브
    win.loadURL('https://www.youtube.com/');
    win.setAlwaysOnTop(true);
});

// 모든 윈도우가 닫히면 종료.
app.on('window-all-closed', () => app.quit() );
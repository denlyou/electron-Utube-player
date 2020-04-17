const isMac = process.platform === 'darwin'; // MacOS인가?

let template = [
    { // Menu 1
        label: "File",
        submenu: [
            isMac ? { role: "close" } : { role: "quit" }
        ],
    },
    { // Menu 2
        label: "Window",
        submenu: [
            { // 2-1
                label: 'Learn More',
                click: async () => {
                  const { shell } = require('electron');
                  await shell.openExternal('https://electronjs.org');
                }
            },
            { // 2-2 
                label: "Show Colors",  
                id: 'color-scale',
                click: () => {
                    getWebviewWebContents().send('switchToColors');
                } 
            },
            { // 2-3
                label: "no Colors",  
                click: () => {
                    myItem.enabled = false;
                    myItem.label = "disabled";
                } 
            },
        ],
    },
];

exports.template = template;
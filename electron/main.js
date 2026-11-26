const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');
const APP_URL = 'https://7oda90.github.io/asnaf_prices.html';
function createWindow(){
 const win = new BrowserWindow({width:1440,height:950,minWidth:980,minHeight:680,backgroundColor:'#f3f6fa',title:'فواتيري',autoHideMenuBar:true,webPreferences:{nodeIntegration:false,contextIsolation:true,sandbox:true}});
 win.loadURL(APP_URL);
 win.webContents.setWindowOpenHandler(({url})=>{if(url.startsWith('https://')||url.startsWith('http://'))shell.openExternal(url);return {action:'deny'};});
 win.webContents.on('will-navigate',(event,url)=>{if(!url.startsWith('https://7oda90.github.io/')){event.preventDefault();shell.openExternal(url);}});
 win.webContents.on('before-input-event',(event,input)=>{if((input.control||input.meta)&&input.key.toLowerCase()==='r'){event.preventDefault();win.reload();}});
}
app.whenReady().then(()=>{app.setAppUserModelId('com.7oda90.fawatiry');createWindow();app.on('activate',()=>{if(BrowserWindow.getAllWindows().length===0)createWindow();});});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});

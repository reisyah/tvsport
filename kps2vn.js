
const punya_lsbtv = 'https://s2129134.cdn.mytvnet.vn/pkg20/wrap/xlive.mpd?c=vstv373&offset=1';
async function init() { 
const video = document.getElementById('video'); 
const ui = video['ui']; 
const config = {
      'seekBarColors': {
        base: 'blue',
        buffered: 'red',
        played: 'yellow',
      }
    }
   ui.configure(config);
const controls = ui.getControls(); 
const player = controls.getPlayer(); 
player.configure({
  drm: {
    clearKeys: {
      // 'key-id-in-hex': 'key-in-hex',
      '1b77a68f515b49598d5eb5a40ce13288': '0afa5dded554a983865e7fd7247492bb'
    }
  }
});
//player.configure({drm:{servers:{'com.widevine.alpha':'https://license.dstv.com/widevine/getLicense?CrmId=afl&AccountId=afl&ContentId=SH2&SessionId=D3C00F885C24B9C6&Ticket=C839A8D71AB94299'}}}); 
player.configure('manifest.dash.ignoreMinBufferTime', true);
player.configure('streaming.rebufferingGoal', 1 /* second */);
window.player = player; 
window.ui = ui; 

player.addEventListener('error', onPlayerErrorEvent); 
controls.addEventListener('error', onUIErrorEvent); 
try{await player.load(punya_lsbtv); 
console.log('The video has now been loaded!');} catch (error) {onPlayerError(error);}} 
function onPlayerErrorEvent(errorEvent) {onPlayerError(event.detail);} 
function onPlayerError(error) {console.error('Error code', error.code, 'object', error);} 
function onUIErrorEvent(errorEvent) {onPlayerError(event.detail);} 
function initFailed(errorEvent) {console.error('Unable to load the UI library!');} 
document.addEventListener('shaka-ui-loaded', init); 
document.addEventListener('shaka-ui-load-failed', initFailed); 

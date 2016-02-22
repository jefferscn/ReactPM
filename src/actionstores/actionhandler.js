/**
 * 用于注册全局支持的服务端Action的处理方法
 */
var handlers = new Map();
export function regHandler(key,callback){
    if(!handlers.has(key)){
        handlers.set(key,new Set());
    }
    var handlerSet = handlers.get(key);
    handlerSet.add(callback);
}
export function getHandler(key){
    return handlers.get(key);
}
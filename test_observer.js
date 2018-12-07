var obz = (function(){
	var list = [], trigger, listener
	
	trigger = function (){
		var key = [].shift.call(arguments)
		var msg = list[key]
		if(!msg){
        	return false
		}
		for(let i=0; i< msg.length; i++){
			msg[i].apply(this,arguments)
		}
	}

	listener = function (key,fn){
		var msg = list[key]
		if(!msg){
			list[key] = []
		}
        list[key].push(fn)
	}
	return {trigger, listener}
})()

obz.listener("key",a=>console.log("listener接收的消息是："+a))

obz.trigger("key",["trigger发送消息1"])
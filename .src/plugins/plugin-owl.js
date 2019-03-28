/* 一只猫头鹰 */
(function(){

	pluginManager.register("plugin-owl", {
		default:{
		},
		call(dom, params, pluginPath){
			
			var owlBody = document.createElement("img")
			owlBody.src = pluginPath + "owl/owl_bottom.png"

			var leftEye = document.createElement("img")
			leftEye.src =  pluginPath + "owl/owl_eye.png"

			var rightEye = document.createElement("img")
			rightEye.src =  pluginPath + "owl/owl_eye.png"


			dom.appendChild(owlBody)
			dom.appendChild(leftEye)
			dom.appendChild(rightEye)

		}
	})

})()


/* 一只猫头鹰 */
(function(){

	pluginManager.register("plugin-owl", {
		default:{
		},
		call(dom, params, domId, pluginPath){
			
			var owlBody = document.createElement("img")
			owlBody.src = pluginPath + "owl/owl_bottom.png"

			var leftEye = document.createElement("img")
			leftEye.src =  pluginPath + "owl/owl_eye.png"
			leftEye.style.box-shadow = "none"

			var rightEye = document.createElement("img")
			rightEye.src =  pluginPath + "owl/owl_eye.png"
			rightEye.style.box-shadow = "none"

			dom.appendChild(owlBody)
			dom.appendChild(leftEye)
			dom.appendChild(rightEye)

			var r1 = 14; 	// 眼眶半径 / 2
			var r2 = 14;	// 眼睛半径

			var left_x0 = owlBody.offsetLeft + 96;
			var left_y0 = owlBody.offsetTop + 96;

			var right_x0 = owlBody.offsetLeft + 168;
			var right_y0 = owlBody.offsetTop + 96;

			var mouse = [0, 0]
			
			console.log(owlBody.offsetTop, owlBody.offsetLeft)

			document.addEventListener ('mousemove', function mouseMove(event){
				var x1 = event.clientX;
				var y1 = event.clientY;
				mouse = [x1, y1]
			}, false);

			// 50毫秒刷新一次眼睛的位置，解决卡顿
			setInterval(function(){
				changeEyePostion(mouse[0], mouse[1])
			}, 50)

			function changeEyePostion(x1, y1){
				var left = getPostion(x1, y1, left_x0, left_y0, r1);
				var right = getPostion(x1, y1, right_x0, right_y0, r1);

				leftEye.style.left = (left[0] - r2) + "px";
	    		leftEye.style.top = (left[1] - r2) + "px";

	    		rightEye.style.left = (right[0]- r2) + "px";
	    		rightEye.style.top = (right[1] - r2) + "px";
			}


			// 计算以x0,y0画一个半径为r的圆，将圆心和(x1,y1)连成一条线，计算线与圆的交点坐标
			function getPostion(x1, y1, x0, y0, r){

				// 转变坐标系，将坐标中心点变为眼睛的中心点
				var x2 = x1 - x0
				var y2 = y1 - y0

				// 以眼框为中心画一个圆，计算在圆上离(x2,y2)最近的点位置
				var distance = Math.sqrt(Math.pow(x2, 2) + Math.pow(y2, 2))
				var x3 = x2 * r / distance
				var y3 = y2 * r / distance

				// 将坐标系还原
				var x4 = x3 + x0
				var y4 = y3 + y0

				return [x4, y4]
			}

		}
	})

})()


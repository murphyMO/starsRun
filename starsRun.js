		
		// 初始化操作
		var canvasEl = document.getElementById('canvas');
		console.log(canvasEl)
		//创建Context对象
		var ctx = canvasEl.getContext('2d');
		console.log(ctx)
		var backgroundColor = '#021047';
		var nodeColor = '#fff';
		var edgeColor = '#062d91';

		// 存储星星、边、运动起始位置
		var nodes1 = [];
		var edges1 = [];
		var nodes2 = [];
		var edges2 = [];
		var nodes3 = [];
		var edges3 = [];
		var nodes4 = [];
		var edges4 = [];
		var nodes1Position = {x: 300,y: 500}
		var nodes2Position = {x: 1200,y: 100}
		var nodes3Position = {x: 1300,y: 600}
		var nodes4Position = {x: 1300,y: 600}


		  // 构建星星
		  function constructNodes(nodesPosition,nodes,edges,Len) {
		    for (var i = 0; i < Len; i++) {
		      var node = {
		        x: Math.random() * 10+nodesPosition.x,
		        y: Math.random() * 10+ nodesPosition.y,
		        vx: Math.random() * 1 - 0.5,
		        vy: Math.random() * 1 - 0.5,
		        radius: Math.random() > 0.9 ? 3 + Math.random() * 3 : 1 + Math.random() * 3,
		        isMax: Math.random() > 0.3? true: false,
		        time: 0,
		        life_time: (Math.random()*2 + 2) * 1000,
		        jianbain: 0,
		        star_pic : new Image(),
		        star2_pic : new Image()
		      };
		      node.star_pic.src = "./img/center.png";
    	  	  node.star2_pic.src = "./img/big.png";
		      nodes.push(node);
		    }

		    nodes.forEach(function (e) {
		      nodes.forEach(function (e2) {
		        if (e == e2) {
		          return;
		        }

		        var edge = {
		          from: e,
		          to: e2
		        }

		        addEdge(edge,edges);
		      });
		    });
		  }


			// 构建连线
		  function addEdge(edge,edges) {
		    var ignore = false;

		    edges.forEach(function (e) {
		      if (e.from == edge.from && e.to == edge.to) {
		        ignore = true;
		      }

		      if (e.to == edge.from && e.from == edge.to) {
		        ignore = true;
		      }
		    });

		    if (!ignore) {
		      edges.push(edge);
		    }
		  }

		  // 让星星动起来
		  function step() {
		    // arg3：运动范围
		  	stepPart(nodes1,nodes1Position,70);
		  	stepPart(nodes2,nodes2Position,70);
		  	stepPart(nodes3,nodes3Position,70);
		  	stepPart(nodes4,nodes4Position,70);
		    	    
		    render();
		  
		    window.requestAnimationFrame(step);

		  }

		  // 让星星以模块为单位动起来
		  function stepPart (nodes,nodesPosition,arrange) {
	  		    nodes.forEach(function (e) {
	  		      e.x += e.vx;
	  		      e.y += e.vy;

	  		      function clamp(min, max, value) {
	  		        if (value > max) {
	  		          return max;
	  		        } else if (value < min) {
	  		          return min;
	  		        } else {
	  		          return value;
	  		        }
	  		      }

	  		      // 如果超出定位70范围内则反向运动
	  		      if (e.x <=  nodesPosition.x-arrange || e.x >= nodesPosition.x+arrange) {
	  		        e.vx *= -1;
	  		        e.x = clamp(0, canvasEl.width, e.x)
	  		      }

	  		      if (e.y <= nodesPosition.y-arrange || e.y >= nodesPosition.y+arrange) {
	  		        e.vy *= -1;
	  		        e.y = clamp(0, canvasEl.height, e.y)
	  		      }
	  		      // 让星星发生闪动效果
	  	      	   if(e.isMax){
	  	      	       if(e.time >= e.life_time){
	  	      	           e.isMax = false
	  	      	       }
	  	      	       else if(e.time < e.life_time){
	  	      	       		if(e.time <= 2 * e.life_time / 5){
	  	      	       		    ctx.save();
	  	      	       		    ctx.globalAlpha = e.jianbain;
	  	      	       		    ctx.beginPath();
	  	      	       		    ctx.drawImage(e.star_pic, e.x-20, e.y-20, 40 , 40);
	  	      	       		    ctx.closePath();
	  	      	       		    ctx.restore();
	  	      	       		    e.jianbain +=  0.03;
	  	      	       		}else if(e.time <= 3 * e.life_time / 5){
	  	      	       		    ctx.save();
	  	      	       		    ctx.drawImage(e.star2_pic, e.x-20, e.y-20, 40 , 40);
	  	      	       		    ctx.restore();
	  	      	       		    e.jianbain = 1;
	  	      	       		}
	  	      	       		else if(e.time < e.life_time){
	  	      	       		    ctx.save();
	  	      	       		    ctx.globalAlpha = e.jianbain;
	  	      	       		    ctx.beginPath();
	  	      	       		    ctx.drawImage(e.star_pic, e.x-20, e.y-20, 40 , 40);
	  	      	       		    ctx.closePath();
	  	      	       		    ctx.restore();
	  	      	       		    e.jianbain -=  0.03;
	  	      	       		}
	  	      	       }
	  	      	       e.time += 20;
	  	      	   }
	  	      	   else{
	  	      	   		e.time = 0
	  	      	   		e.jianbain = 0
	  	      	   		e.isMax = true
	  	      	       ctx.save();
	  	      	       ctx.globalAlpha = 0.5;
	  	      	       ctx.beginPath();
	  	      	       ctx.drawImage(e.star_pic, e.x-10, e.y-10, 20 , 20);
	  	      	       ctx.closePath();
	  	      	       ctx.restore();
	  	      	       // e.isMax = true
	  	      	   }
	  		    });
			  }


			  // 绘制
			  function render() {
			  	// 背景设置
			    // ctx.fillStyle = backgroundColor;
			    var img = new Image()
			    img.src = "./img/bg.jpg";
			    ctx.drawImage(img, 0, 0,document.body.clientWidth,document.body.clientHeight);
			    // ctx.globalAlpha = 0;
			    // ctx.fillRect(0, 0, document.body.clientWidth, document.body.clientHeight);
			    
			    // 渲染星团
			    renderPart(edges1,nodes1)
			    renderPart(edges2,nodes2)
			    renderPart(edges3,nodes3)
			    renderPart(edges4,nodes4)
			  }


	  		  // 星星以模块为单位渲染
	  		  function renderPart(edges,nodes) {
	  		  	// 绘制线条
	  		  	edges.forEach(function (e,index) {
	  		  	  // 笔触颜色
	  		  	  ctx.strokeStyle = edgeColor;
	  		  	  ctx.lineWidth = 0.5;
	  		  	  // 设置或返回绘图的当前 alpha 或透明值
	  		  	  ctx.globalAlpha = 1;
	  		  	  // 起始一条路径，或重置当前路径
	  		  	  ctx.beginPath();
	  		  	  // 把路径移动到画布中的指定点，不创建线条
	  		  	  ctx.moveTo(e.from.x, e.from.y);
	  		  	  // 添加一个新点，然后在画布中创建从该点到最后指定点的线条
	  		  	  ctx.lineTo(e.to.x, e.to.y);
	  		  	  // 绘制已定义的路径
	  		  	  ctx.stroke();
	  		  	});

    		    // 绘制星星
    		    nodes.forEach(function (e,index) {
    			   if(e.isMax){
    	               ctx.save();
    	               ctx.globalAlpha = e.jianbain;
    	               ctx.beginPath();
    	               ctx.drawImage(e.star_pic, e.x-10, e.y-10, 20 , 20);
    	               ctx.closePath();
    	               ctx.restore();
    	               e.jianbain +=  0.3;
    			   }
    			   else{
    			       ctx.save();
    			       ctx.globalAlpha = 0.5;
    			       ctx.beginPath();
    			       ctx.drawImage(e.star2_pic, e.x-10, e.y-10, 20 , 20);
    			       ctx.closePath();
    			       ctx.restore();
    			   }
    		    });
	  		  }


	  		  // 画布大小变化时重绘
	  		  window.onresize = function () {
	  		  	var clientW = document.body.clientWidth
	  		  	var clientH = document.body.clientHeight;
	  		    canvasEl.width = clientW;
	  		    canvasEl.height = clientH;


	  		    if (nodes1.length == 0) {
	  		    	nodes1Position.x = clientW*0.2
	  		    	nodes1Position.y = clientH*0.75
	  		      	constructNodes(nodes1Position,nodes1,edges1,5);
	  		    }
	  		    if (nodes2.length == 0) {
	  		    	nodes2Position.x = clientW*0.9
	  		    	nodes2Position.y = clientH*0.1
	  		      	constructNodes(nodes2Position,nodes2,edges2, 5);
	  		    }
	  		    if (nodes3.length == 0) {
	  		    	nodes3Position.x = clientW*0.94
	  		    	nodes3Position.y = clientH*0.8
	  		      	constructNodes(nodes3Position,nodes3,edges3, 5);
	  		    }
	  		    if (nodes4.length == 0) {
	  		    	nodes4Position.x = clientW*0.1
	  		    	nodes4Position.y = clientH*0.2
	  		      	constructNodes(nodes4Position,nodes4,edges4, 5);
	  		    }

	  		    render();
	  		  };
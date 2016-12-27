
    window.AudioContext=window.AudioContext||window.webkitAudioContext||window.mozAudioContext;
	//创建audioContext对象
        var msc=['朋友-谭咏麟','红日-李克勤','解放-羽泉'];
		var mscsrc=['msc/friend.mp3','msc/红日.mp3','msc/解放.mp3'];
		var mscid=0;//记录当前是第几首音乐
	//点击播放
	function playa(id){
		mscid=id;
	    document.getElementById('audio').src=mscsrc[mscid];   //要播放的音乐
		run();
		cgcss();
	}
	//点击下一张播放
	function next(){
	    if(mscid>(msc.length-2))
		mscid=0;
		else
	    mscid++;
		document.getElementById('audio').src=mscsrc[mscid];
		run();
		cgcss();
	}
	//点击上一张播放
   function last(){
       if(mscid<1)
	   mscid=msc.length-1;
	   else
	    mscid--;
		document.getElementById('audio').src=mscsrc[mscid];
		run();
		cgcss();
	}
   //当前列表的背景颜色是白色
	function cgcss(){
		document.getElementById("1").style.backgroundColor="#000";
		
		document.getElementById("2").style.backgroundColor="#000";
		
		document.getElementById("0").style.backgroundColor="#000";
		document.getElementById(mscid).style.backgroundColor="#f00";
	}
	var cssn=2;
	var voicec1=["#0f0","#f00","#f0f"];
	function cgcolor(){
		  voicec1[0]=document.getElementById('startc').value;
		  voicec1[1]=document.getElementById('startc').value;
		  voicec1[2]=document.getElementById('startc').value;
	  }
      window.onload=function play(){
		  
      	var $=function(id){
      		return document.getElementById(id);
      	}
      	//获取标签
      	var canvas=$('canvas');
      	var audio=$('audio');
      	//生成歌单列表
		for(var a=0;a<msc.length;a++){
		  var msclist=$('msclist').innerHTML;
		  $('msclist').innerHTML=msclist+"<tr><td id='"+a+"' onclick='playa(this.id)' style='cursor:pointer;'>"+msc[a]+"</td></tr>";
		}
		cgcss();
		
		audio.src=mscsrc[mscid];
      	var ctr=$('ctr');
      	var ctx=canvas.getContext('2d');//canvas绘图环境
      	var actx=new AudioContext();//API接口
      
      	color=ctx.createLinearGradient(canvas.width*.5,0,canvas.width*.5,300);
      	color.addColorStop(0,voicec1[0]);
      	color.addColorStop(.5,voicec1[1]);
      	color.addColorStop(1,voicec1[2]);
      	colort=ctx.createLinearGradient(canvas.width*.5,300,canvas.width*.5,600);
      	colort.addColorStop(0,"rgba(125,225,133,0.7)");
      	colort.addColorStop(.5,"rgba(225,225,0,0.1)");
      	colort.addColorStop(1,"rgba(125,0,133,0)");
      	canvas.width=window.innerWidth;
      	canvas.height=window.innerHeight*.7;

      	var analyser=actx.createAnalyser();//能创建一个AnalyserNode  用来获取音频时间和频率帧数  能量值
      	var audioSrc=actx.createMediaElementSource(audio);//用于创建一个新的mediaelementaudiosourcenode对象，鉴于现有的HTML <音频>或<视频>元素，然后从音频可以发挥和操纵。从audio中提取数据 将其放到BufferSource属性当中
      	audioSrc.connect(analyser);//将两个数据关联起来
      	analyser.connect(actx.destination);//将该源与硬件相连   destination 代表一个实际的音频渲染设备 和扬声器相关联
      	
      	
      	var num=80;
      	// 
      	function draw(){
      	  //获取到AnalyserNode分析的数据
          var voicehigh=new Uint8Array(analyser.frequencyBinCount);   //八位无符号整数值的类型化数组
          analyser.getByteFrequencyData(voicehigh);
//        console.log(voicehigh);
          
          var step=Math.round(voicehigh.length/num);//采样步长
          
          
          ctx.clearRect(0,0,canvas.width,canvas.height);
          
				ctx.beginPath();
				
          for(var i=1;i<num;i++){
          	var value=voicehigh[step*i];//根据step来控制canvas中图形的形状
          	
			
			switch(cssn){
//			case 1:
//			ctx.fillStyle=color;
//			ctx.beginPath();
//          ctx.arc(i*50,canvas.height*.5,value*.3,0,Math.PI*2,true);
//          ctx.fill();
//			break;
			case 2:
				ctx.fillStyle=color;
				ctx.fillRect(i*10+canvas.width*.5,250,7,-value+1);
                ctx.fillRect(canvas.width*.5-(i-1)*10,250,7,-value+1);
                ctx.fill();
                ctx.fillStyle=colort;
                ctx.fillRect(i*10+canvas.width*.5,250,7,value+1);
                ctx.fillRect(canvas.width*.5-(i-1)*10,250,7,value+1);
			break;
//			case 3:
//              moveTo(0,canvas.height*.5);
//				ctx.lineTo(i*7+canvas.width*.5,-value+canvas.height*.5);
//				ctx.strokeStyle="#f00";
//		        ctx.stroke();
//			break;
            
			}
            ctx.stroke();
          }
          requestAnimationFrame(draw);
		  
        }
        draw();
      }
      //判断是哪种形式
	  function canvascg(n){
		 cssn=n;
	  }
	  //播放函数
	  function run(){
	    var audio=document.getElementById('audio');
		var imgcss=document.getElementById('img');
		if(audio.paused)
		audio.play(),
		imgcss.className='img';
		else
		audio.pause(),
		imgcss.className='';
	  }
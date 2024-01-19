
// #ifdef H5
export default function(url, Time = 1) {
	return new Promise((a, b) => {
			var video;
			var scale = 1;
			var initialize = function() {
				video = document.createElement('video');
				
				video.src = url
				video.addEventListener('loadeddata', function() {
					video.currentTime = Time;
					setTimeout(function() {
						captureImage()
					}, 1000)
				});
			};
			var captureImage = function() {
				var canvas = document.createElement("canvas");
			
				canvas.width = video.videoWidth * scale;
				canvas.height = video.videoHeight * scale;
				canvas.getContext('2d').drawImage(video, 0, 0,);
				let src = canvas.toDataURL("image/png");
				a(src)
			};
			initialize();
	
	})
}
// #endif
//#ifdef APP-PLUS

let _html = `<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>capture screen</title>
		<style>
			html{
				opacity: 0;
				width: 0px;
				height: 0px;
				overflow: hidden;
			}
		</style>
	</head>
	<body>
		<script type="text/javascript">
		     document.addEventListener('plusready',function () {   
		          (function() {
		          	var video;
		          	var scale = 1;
		          	var initialize = function() {
		          		output = document.getElementById("output");
		          		video = document.createElement('video');
		          		video.src=plus.webview.currentWebview().url
		          		video.addEventListener('loadeddata', function () {
		          			 video.currentTime = plus.webview.currentWebview().Time;
		          			setTimeout(function(){
		          				captureImage()
		          			}, 1000)
		          		});
		          	};
		          	var captureImage = function() {
		          		var canvas = document.createElement("canvas");
		          		canvas.width = video.videoWidth * scale;
		          		canvas.height = video.videoHeight * scale;
		          		canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
		          		let src = canvas.toDataURL("image/png");
		          		plus.storage.setItem("getviideoImg",src);
		          	};
		          	initialize();
		          })();
		       },false);
			
		</script>
	</body>
</html>
`
export default function(url, Time = 1) {
	let WEB, _cc
	return new Promise((a, b) => {
		plus.io.requestFileSystem(plus.io.PRIVATE_DOC, function(fs) {
			fs.root.getFile('getviideoImg.html', {
				create: true
			}, function(fileEntry) {
				fileEntry.file(function(file) {
					fileEntry.createWriter(function(writer) {
						writer.write(_html);
						WEB = plus.webview.create(
							'_doc/getviideoImg.html', 999, {
								'uni-app': 'none',
								"background": '#0000',
								"width": 0,
								"height": 0,
								"backButtonAutoControl": 'close',
								top: 9999999999
							}, {
								url: url,
								Time: Time
							});

						WEB.show();
						_cc = setInterval(() => {
							if (plus.storage.getItem(
									"getviideoImg")) {
								let img = plus.storage.getItem(
									"getviideoImg");
								plus.storage.removeItem(
									"getviideoImg");
								plus.webview.close(WEB)
								a(img)
							};
							if (!plus.webview.getWebviewById('999')) {
								plus.storage.removeItem(
									"getviideoImg");
								plus.webview.close(WEB)
								clearInterval(_cc)
							}
						}, 500)
					})
				})
			})
		})
	})
}
//#endif
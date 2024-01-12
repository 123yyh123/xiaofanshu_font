// 将文件网址下载到本地保存，返回本地保存的临时文件路径
function downloadFile(url) {
	return new Promise((resolve, reject) => {
		uni.downloadFile({
			url: url,
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res.tempFilePath)
				} else {
					reject(res)
				}
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

// 根据url保存永久保存到本地，返回本地保存的文件路径
export const saveFile = (url) => {
	return new Promise((resolve, reject) => {
		downloadFile(url).then((filePath) => {
			uni.saveFile({
				tempFilePath: filePath,
				success: (res) => {
					resolve(res.savedFilePath)
				},
				fail: (err) => {
					reject(err)
				}
			})
		}).catch((err) => {
			reject(err)
		})
	})
}

export const zoomOutImage=(src)=>{
return new Promise((resolve, reject) => {
    // 获取屏幕宽高
    const screenWidth = uni.getSystemInfoSync().screenWidth;
    const screenHeight = uni.getSystemInfoSync().screenHeight;

    // 获取本地图片信息
    uni.getImageInfo({
      src: src,
      success: (imageInfo) => {
        // 图片原始宽高
        const imgWidth = imageInfo.width;
        const imgHeight = imageInfo.height;

        // 计算缩放比例
        const scale = Math.min(screenWidth / (2 * imgWidth), screenHeight / (2 * imgHeight));

        // 计算缩小后的宽高
        const actualWidth = Math.floor(imgWidth * scale);
        const actualHeight = Math.floor(imgHeight * scale);

        // 执行成功，将结果传递给 Promise 的 resolve
        resolve({
          width: actualWidth,
          height: actualHeight,
          src: src
        });
      },
      fail: (error) => {
        // 执行失败，将错误信息传递给 Promise 的 reject
        reject(error);
      },
    });
  });
}
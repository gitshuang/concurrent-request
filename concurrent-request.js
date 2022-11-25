// 模拟请求
function get(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 错误测试
            // if(id === 22) {
            //     reject("error in 22")
            // }
            resolve(id);
        }, 3000);
    })
};

function request200Times() {
    return new Promise((resovle, reject) => {
        let resArr = [];
        let index = 1;
        function loop(index) {
            let idArr = [];
            for (let i = 0; i < 20; i++) {
                idArr.push(index)
                if (index % 20 === 0) {
                    // all 只要有一个异步任务被 rejected 后续的请求就不再进行。
                    // allSettled 无论成功失败都不停止执行。
                    Promise.all(idArr.map(j => get(j))).then(result => {
                        console.log('result', result);
                        resArr.push(result);
                        if (index < 200) {
                            loop(index)
                        } else {
                            resovle(resArr)
                        }
                    }).catch(err => {
                        console.log('err', err);
                        reject(err);
                    })
                }
                index++;
            }
        }
        loop(index);
    })

}

// 执行请求
request200Times().then(res => {
    console.log('res', res); // 结果
})

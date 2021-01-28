const add = (x, y) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x + y)
        }, 2000)
    })
}

// add(1, 5).then(sum => {
//     console.log(sum)

//     add(sum, 2).then(sum2 => {
//         console.log(sum2)
//     }).catch(e => {
//         console.log(e)
//     })
// }).catch(e => {
//     console.log(e)
// })

add(1,1).then(sum => {
    console.log(sum)
    return add(sum, 4)
}).then(sum2 => {
    console.log(sum2)
}).catch(e => {
    console.log(e)
})
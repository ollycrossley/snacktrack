exports.createRefSet = (arr, globalKey) => {
    const refObj = {}
    if (arr.length === 0 || !globalKey) return refObj
    arr.forEach(item => {
        refObj[item[globalKey]] = item["_id"]
    })
    return refObj;
}

exports.findIdByRef = (customerObj, businessObj, reviewItems) => {
    const newReviewItems = reviewItems.map(item => ({...item}))
    if (reviewItems.length === 0) return [];
    newReviewItems.forEach(review => {
        review.customer = customerObj[review.customer]
        review.business = businessObj[review.business]
    })
    return newReviewItems;
}
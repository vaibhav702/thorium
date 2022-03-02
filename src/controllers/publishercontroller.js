const publisherModel = require("../models/publisherModel")




const createNewPublisher= async function (req, res) {
    let author = req.body
    let publisherCreated = await publisherModel.create(author)
    res.send({data: publisherCreated})
}

// const getPublisherData = async function (req,res){
//     let PublisherData = await publisherModel.modelName(find)
//     res.send({data:PublisherData})
// }

module.exports.createNewPublisher= createNewPublisher
// module.exports.getPublisherData= getPublisherData

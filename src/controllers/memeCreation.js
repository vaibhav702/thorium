let axios = require("axios")
let memeCreated = async function(req,res){
    try {
        let options = {
            method:"post",
            url:"https://api.imgflip.com/get_memes?template_id=112126428&text0=nandu&text1=don&username=chewie12345&password=meme@123"
                
        }
         let result =await axios(options)
         res.send({data:result.data})
        
    } catch (error) {

        console.log(error)
        res.status(500).send({ msg: error.message })

    }
    


    
}
module.exports.memeCreated=memeCreated
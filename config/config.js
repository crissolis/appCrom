const Twitter=require('twit');

if (process.env.NODE_ENV!=='production') {
    require ('dotenv').config();    
    // console.log(process.env.Consumer_key)
}
const apliClient=new Twitter(
    {
        // consumer_key:'koYgCIvo44AklvtijutbwIJZn',
        // consumer_secret:'ou7pBDPHz3pPS04U6IFZ59gUQdTJHZH4JyILPGmhCXZ9qhv6jn',
        // access_token:'936274436646424576-dbQ6Lm7J6wxrtEEu00ujWlh2gqi6D0j',
        // access_token_secret:'ACS98WaOPxaumNBCpdjQCwaznSgHqqXNk0HuKbrGLVQ1c'
        consumer_key:process.env.consumer_key,
        consumer_secret:process.env.consumer_secret,
        access_token:process.env.access_token,
        access_token_secret:process.env.access_token_secret
    }
); 
// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

module.exports={
    apliClient
}


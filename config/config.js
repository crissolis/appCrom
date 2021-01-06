const Twitter=require('twit');

const apliClient=new Twitter(
    {
        consumer_key:'koYgCIvo44AklvtijutbwIJZn',
        consumer_secret:'ou7pBDPHz3pPS04U6IFZ59gUQdTJHZH4JyILPGmhCXZ9qhv6jn',
        access_token:'936274436646424576-dbQ6Lm7J6wxrtEEu00ujWlh2gqi6D0j',
        access_token_secret:'ACS98WaOPxaumNBCpdjQCwaznSgHqqXNk0HuKbrGLVQ1c'
    }
);
// ============================
//  Puerto
// ============================
process.env.PORT = process.env.PORT || 3000;

module.exports={
    apliClient
}


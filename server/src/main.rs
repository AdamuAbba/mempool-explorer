#[macro_use]
extern crate lazy_static;

#[macro_use]
extern crate rocket;
extern crate bitcoincore_rpc;

use bitcoincore_rpc::json::GetRawTransactionResult;
use bitcoincore_rpc::{ Auth, Client, RpcApi };
use dotenvy::dotenv;
use rocket::response::status::BadRequest;
use std::env;

lazy_static! {
    static ref RPC: Client = {
        dotenv().ok();
        let rpc_url = env::var("RPC_URL").expect("RPC_URL not set");
        let rpc_user = env::var("RPC_USER").expect("RPC_USER not set");
        let rpc_pass = env::var("RPC_PASS").expect("RPC_PASS not set");
        
        Client::new(&rpc_url, Auth::UserPass(rpc_user, rpc_pass))
            .expect("Failed to create RPC client")
    };
}

#[get("/search?<txid>")]
fn search(txid: &str) -> Result<String, BadRequest<String>> {
    match get_raw_transaction(txid) {
        Ok(raw_tx) => Ok(format!("{:?}", raw_tx)),
        Err(_e) => Err(BadRequest("Error getting transaction details".to_string())),
    }
}

fn get_raw_transaction(txid: &str) -> Result<GetRawTransactionResult, BadRequest<String>> {
    // Parse the transaction ID from string to bitcoincore_rpc::bitcoin::Txid
    let txid = match txid.parse::<bitcoincore_rpc::bitcoin::Txid>() {
        Ok(txid) => txid,
        Err(_) => return Err(BadRequest("Failed to parse transaction ID".to_string())),
    };
    
    let tx = match RPC.get_raw_transaction_info(&txid, None) {
        Ok(tx) => tx,
        Err(_) => return Err(BadRequest("Error getting transaction details".to_string())),
    };

    Ok(tx)
}


#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![search])
}

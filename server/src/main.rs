#[macro_use]
extern crate lazy_static;

#[macro_use]
extern crate rocket;
extern crate bitcoincore_rpc;
extern crate serde_json; 
extern crate rocket_cors;

use bitcoincore_rpc::json::GetRawTransactionResult;
use bitcoincore_rpc::{Auth, Client, RpcApi};
use dotenvy::dotenv;
use rocket::response::status::BadRequest;
use serde::Serialize;
use serde_json::to_string;
use std::env;
use rocket::http::Method;
use rocket_cors::{
    AllowedHeaders, AllowedOrigins,
    Cors, CorsOptions
};

#[derive(Serialize)]
pub struct TransactionWithMempool {
    pub raw_transaction: GetRawTransactionResult,
    pub in_mempool: bool,
}

fn make_cors() -> Cors {
    let allowed_origins = AllowedOrigins::some_exact(&[
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ]);

    CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::some(&[
            "Authorization",
            "Accept",
            "Access-Control-Allow-Origin",
        ]),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .expect("error while building CORS")
}

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
        Ok(raw_tx) => {
            // Serialize GetRawTransactionResult into a JSON string
            let json_response = to_string(&raw_tx)
                .map_err(|_| BadRequest("Error serializing transaction details".to_string()))?;
            Ok(json_response)
        },
        Err(_) => Err(BadRequest("Error getting transaction details".to_string())),
    }
}

#[get("/recent-transactions?<count>")]
fn get_recent_transactions(count: Option<usize>) -> Result<String, BadRequest<String>> {
    let count = count.unwrap_or(6); // Default to 6 transactions if count is not provided

    let mempool_txids = match RPC.get_raw_mempool() {
        Ok(txids) => txids,
        Err(_) => return Err(BadRequest("Error getting mempool transactions".to_string())),
    };

    // Limit the number of transactions to the specified count
    let mempool_txids = if count < mempool_txids.len() {
        &mempool_txids[..count]
    } else {
        &mempool_txids
    };

    // Convert Txid to String
    let mempool_txids: Vec<String> = mempool_txids.into_iter().map(|txid| txid.to_string()).collect();

    // Serialize the list of transaction IDs into a JSON string
    let json_response = to_string(&mempool_txids)
        .map_err(|_| BadRequest("Error serializing mempool transactions".to_string()))?;
    Ok(json_response)
}

fn get_raw_transaction(txid: &str) -> Result<TransactionWithMempool, BadRequest<String>> {
    // Parse the transaction ID from string to bitcoincore_rpc::bitcoin::Txid
    let txid = match txid.parse::<bitcoincore_rpc::bitcoin::Txid>() {
        Ok(txid) => txid,
        Err(_) => return Err(BadRequest("Failed to parse transaction ID".to_string())),
    };

    // get transaction details using get_raw_transaction_info
    let tx = match RPC.get_raw_transaction_info(&txid, None) {
        Ok(tx) => tx,
        Err(_) => return Err(BadRequest("Error getting transaction details".to_string())),
    };

    // check if the result has a timestamp (time != null)
    if let Some(_time) = tx.time {
        return Ok(TransactionWithMempool {
            in_mempool: false,
            raw_transaction: tx  
        });
    } else {
        // use get_mempool_entry to get the transaction time from the mempool
        if let Ok(mempool_entry) = RPC.get_mempool_entry(&txid) {
            // replace the null time with the time obtained from mempool
            let mut new_tx = tx.clone(); // clone the original transaction
            new_tx.time = Some(mempool_entry.time as usize); // set time from mempool entry
            return Ok(TransactionWithMempool {
                in_mempool: true,
                raw_transaction: new_tx, // use the modified transaction
            });
        } else {
            return Err(BadRequest("Error getting mempool entry".to_string()));
        }
    }
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![search, get_recent_transactions]).attach(make_cors())
}

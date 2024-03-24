#[macro_use]
extern crate lazy_static;

#[macro_use]
extern crate rocket;
extern crate bitcoincore_rpc;

use bitcoincore_rpc::{Auth, Client, RpcApi};
use dotenvy::dotenv;
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
fn search(txid: &str) -> String {
    format!("{}", txid)
}

#[launch]
fn rocket() -> _ {
    let best_block_hash = RPC.get_best_block_hash().unwrap();
    println!("best block hash: {}", best_block_hash);

    rocket::build().mount("/", routes![search])
}

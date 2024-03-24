#[macro_use]
extern crate lazy_static;

#[macro_use] 
extern crate rocket;
extern crate bitcoincore_rpc;

use bitcoincore_rpc::{ Auth, Client, RpcApi };


lazy_static! {
    // TODO: use environment variables instead of hardcoding
    static ref RPC: Client = Client::new("http://localhost:18443",
        Auth::UserPass("SulaimanAminuBarkindo".to_string(), "MWCSZAsVdoSUE2q7BuzV6uuEECH8__MQ21-Yru764DI".to_string()),
    )
    .unwrap();
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


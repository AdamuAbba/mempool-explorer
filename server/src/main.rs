#[macro_use] extern crate rocket;

#[get("/search?<txid>")]
fn search(txid: &str) -> String {
    format!("{}", txid)
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![search])
}
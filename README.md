# Mempool Explorer

This project is a tool designed to explore the mempool, a temporary waiting area for unconfirmed transactions on the Bitcoin blockchain network. It allows users to enter a transaction ID and search for it in the mempool or the blockchain itself. If found, the tool decodes the transaction data and displays details such as the transferred amount and confirmation status.

## Description

The Mempool Explorer provides functionality to:

- Accept transaction ID through a user-friendly form.
- Process ID efficiently using Rocket a Rust-based web framework.
- Decode and interpret transaction data.
- Display details like transferred amount, confirmation status, and network type (mainnet, testnet, regtest).
- Identify the transaction type (e.g., p2pkh, p2tr).

## Scope

The project focuses on analyzing decoded transaction data retrieved from the mempool or the Bitcoin blockchain.

## Features

- User Input: Accepts transaction ID for exploration.
- Transaction Analysis: Decodes and interprets transaction data.
- Information Display: Provides details on transferred amount, network type, and transaction type.
- Confirmation Status: Indicates whether a transaction is pending confirmation (in mempool) or likely confirmed (not in mempool).
- Network Type Detection: Identifies the network (mainnet, testnet, regtest) from the transaction data.

## Considerations and Limitations

- **Bandwidth Constraints:** Due to the potentially high volume of transactions on the mainnet mempool, it's recommended to use a testnet or better yet signet for development and testing purposes.
- **Project Scope:** Time constraints and knowledge gaps are acknowledged, and the project's scope may be adjusted accordingly.

## Technologies Used

- Frontend: React 
- Backend: Rocket

## Getting Started

### Prerequisites

Before running the Mempool Explorer project, ensure you have the following prerequisites installed and configured:

1. Rust and Cargo:

- Install Rust and Cargo by following the official installation guide: [Rust Installation Guide](https://www.rust-lang.org/tools/install).

2. Node.js and npm:

- Install Node.js and npm from the official website: [Node.js Download](https://nodejs.org/en).

3. Bitcoin Core:
- Download and install Bitcoin Core to interact with the Bitcoin blockchain: [Bitcoin Core Download](https://github.com/bitcoin/bitcoin).

### Installation Steps

1. Clone this repository:
   ```bash
   git clone https://github.com/AdamuAbba/mempool-explorer.git
   ```
2. Navigate into the project directory:
   ```bash
   cd mempool-explorer
   ```
3. Navigate into the client directory:
   ```bash
   cd client
   ```
4. Install dependencies for the frontend:
   ```bash
   npm install
   ```
5. Start the frontend server:
   ```bash
   npm start
   ```
6. Open a new tab on your terminal and start bitcoind
7. Open a new tab on your terminal and navigate into the server directory:
   ```bash
   cd ../server
   ```
8. Run the backend server
   ```bash
   cargo run
   ```

## Contribution

We welcome contributions to this project! Feel free to fork the repository and submit pull requests with your improvements.

## License

This project is open-source and licensed under the MIT License

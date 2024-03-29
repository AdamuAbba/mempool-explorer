type RAW_TRANSACTION = {
  in_active_chain: null | any;
  hex: string;
  txid: string;
  hash: string;
  size: number;
  vsize: number;
  version: number;
  locktime: number;
  vin: VIN[];
  vout: VOUT[];
  blockhash: null | any;
  confirmations: null | any;
  time: null | any;
  blocktime: null | any;
};

export type IResponse = {
  raw_transaction: RAW_TRANSACTION;
  in_mempool: boolean;
};

type VIN = {
  sequence: number;
  coinbase: null | any;
  txid: string;
  vout: number;
  scriptSig: {
    asm: string;
    hex: string;
  };
  txinwitness: [][number];
};

type VOUT = {
  value: number;
  n: number;
  scriptPubKey: {
    asm: string;
    hex: string;
    reqSigs: null | any;
    type: string;
    addresses: any[];
    address: string;
  };
};

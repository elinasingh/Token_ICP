import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
    var owner : Principal = Principal.fromText("oma46-l56xk-o4b66-lppr7-anzsg-af53z-qsers-gc4bm-eiqyv-cngdl-rqe");
    var totalSupply : Nat = 1000000000;
    var symbol : Text = "DELI"; 

    var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    
    balances.put(owner, totalSupply);

    public query func balanceOf(who: Principal) : async Nat {

        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };

        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared(msg) func payOut() : async Text {
        // Debug.print(debug_show(msg.caller));
        if (balances.get(msg.caller) == null) {
            let amount = 10000;
            // balances.put(msg.caller, amount);
            let result = await transfer(msg.caller, amount);
            return result;
        } else {
            return "Already Claimed";
        }  
    };

    public shared(msg) func transfer(to : Principal, amount : Nat) : async Text {
        // let result = await payOut();
        let fromBalance = await balanceOf(msg.caller);
        if(fromBalance > amount) {
            let newFromBalance : Nat = fromBalance - amount;
            balances.put(msg.caller, newFromBalance);

            let toBalance = await balanceOf(to);
            let newToBalance = toBalance + amount;
            balances.put(to, newToBalance);

            return "Success";
        } else {
            return "Insufficient Funds";
        }
    }   

};
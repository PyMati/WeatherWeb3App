//SPDX-Licence-Idientifier: MIT
pragma solidity ^0.8.7;

contract Weather{

    // Constant variables // Owner of smart contract and list of users.
    address owner;
    address[] users;

    constructor() {
        owner = msg.sender;
        users.push(owner);
    }

    // Simple modifier that allows owner to have more control over the smart contract
    modifier OnlyOwner {
        require(msg.sender == owner);
        _;
    }

    function addToList(address _user) private {
        /*
        Function that adds user to list. 
        */
        users.push(_user);
    }

    function showList() OnlyOwner public view returns(address[] memory){
        /*
        Function that allows to show how current user list looks like.
        */
        return users;
    }

    function signUp(address _user) payable public returns(string memory){
    /*
    Function that checks if the user is arleady signed up for weather app.
    Firstly it loop through the whole array that contains adresses of arleady signed users.
    Then It breakes for loop if the user adress is found and return false - Already in list
    Or it returns true (user not in list) when the user was not found in an array.
    */
        for(uint i = 0; i < users.length - 1; i++){
            if(_user == users[i]){
                return "You are already signed up.";
            }
        }
        addToList(_user);
        return "Signing up ended successfully.";
    }


}

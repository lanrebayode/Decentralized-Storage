//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract Migrations {
    address public owner = 0x088E887b1ce65B56aa57B067a8E2a1C8143DB378;
    uint256 public last_completed_migration;

    modifier restricted() {
        require(
            msg.sender == owner,
            "This function is restricted to contracr owner"
        );
        _;
    }

    function setCompleted(uint256 completed) public restricted {
        last_completed_migration = completed;
    }

    function upgrade(address new_address) public restricted {
        Migrations upgraded = Migrations(new_address);
        upgraded.setCompleted(last_completed_migration);
    }
}

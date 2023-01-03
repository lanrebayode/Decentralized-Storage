//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

contract SolidityDrive {
    struct File {
        string hash;
        string fileName;
        string fileType;
        uint256 time;
    }

    mapping(address => File[]) public files;

    function addFile(
        string memory _hash,
        string memory _fileName,
        string memory _fileType,
        uint256 _time
    ) public {
        files[msg.sender].push(
            File({
                hash: _hash,
                fileName: _fileName,
                fileType: _fileType,
                time: _time
            })
        );
    }

    function getlength() public view returns (uint256) {
        return files[msg.sender].length;
    }

    function get(uint256 _fileIndex)
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256
        )
    {
        File memory file = files[msg.sender][_fileIndex];
        return (file.hash, file.fileName, file.fileType, file.time);
    }
}
